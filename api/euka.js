/* Vercel serverless function — narrow EUKA read proxy for the freelancer dashboard.
 *
 * The dashboard is a public static site, so the EUKA token can never reach the
 * browser. This function is the only server-side piece: it accepts ONE request
 * shape (`type=myperf`) and returns a small, pre-aggregated summary. It does not
 * expose arbitrary MCP tool calls.
 *
 * Env (Vercel project settings):
 *   EUKA_TOKEN      — token for the US store
 *   EUKA_TOKEN_UK   — token for the UK store
 * The "Bearer " prefix is added automatically if it is missing.
 */

export const config = { maxDuration: 30 };

const MCP_URL = 'https://app.euka.ai/api/mcp';

/* Used only if list_accessible_stores fails; the token itself decides the store. */
const FALLBACK_STORE = {
  us: 'c25bdcf5-ae35-4b0c-a348-9b14e0bdc4f5',
  uk: 'c870ba69-4612-425b-a810-d85b5d13d70a'
};

function bearer(raw) {
  const t = String(raw || '').trim();
  if (!t) return '';
  return /^bearer\s/i.test(t) ? t : 'Bearer ' + t;
}

function dateStr(daysAgo = 0) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString().slice(0, 10);
}

async function initSession(token) {
  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: token },
    body: JSON.stringify({
      jsonrpc: '2.0', id: 0, method: 'initialize',
      params: {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: { name: 'freelancer-dashboard', version: '1.0.0' }
      }
    })
  });
  return res.headers.get('Mcp-Session-Id') || null;
}

function extractResult(result) {
  if (result && Array.isArray(result.content)) {
    const text = result.content[0] && result.content[0].text;
    if (text) { try { return JSON.parse(text); } catch { return text; } }
  }
  return result;
}

async function mcpTool(name, args, sessionId, token) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: token,
    Accept: 'application/json, text/event-stream'
  };
  if (sessionId) headers['Mcp-Session-Id'] = sessionId;

  const res = await fetch(MCP_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      jsonrpc: '2.0', id: Date.now(), method: 'tools/call',
      params: { name, arguments: args }
    })
  });
  const text = await res.text();

  if (text.includes('data:')) {                     // SSE transport
    for (const line of text.split('\n')) {
      if (!line.startsWith('data:')) continue;
      try {
        const json = JSON.parse(line.slice(5).trim());
        if (json.result) return extractResult(json.result);
        if (json.error) throw new Error(json.error.message);
      } catch { /* keep scanning the remaining lines */ }
    }
  }
  try {
    const json = JSON.parse(text);
    if (json.result) return extractResult(json.result);
    if (json.error) throw new Error(json.error.message);
    return json;
  } catch { /* fall through */ }
  return {};
}

async function resolveStoreId(sessionId, token, fallback) {
  try {
    const stores = await mcpTool('list_accessible_stores', {}, sessionId, token);
    const list = Array.isArray(stores) ? stores : stores && stores.result;
    if (Array.isArray(list) && list[0] && list[0].storeId) return list[0].storeId;
  } catch { /* fall back to the known store id */ }
  return fallback;
}

const num = v => (typeof v === 'number' && isFinite(v) ? v : 0);

/* creator_level_breakdown returns one row per creator tier (L1..L7). */
function sumTiers(levels) {
  const tiers = (levels && (levels.tiers || levels.levels)) || [];
  const out = { requests: 0, approved: 0, shipped: 0, posted: 0, invites: 0, gmv: 0 };
  for (const t of tiers) {
    out.requests += num(t.sampleRequests);
    out.approved += num(t.samplesApproved);
    out.shipped  += num(t.samplesDelivered) || num(t.samplesShipped);
    out.posted   += num(t.samplesPosted);
    out.invites  += num(t.invitesSent);
    out.gmv      += num(t.totalGmv);
  }
  return out;
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') return res.status(200).end();
  /* No CORS header on purpose: only our own pages may call this proxy. */

  const region = req.query.region === 'uk' ? 'uk' : 'us';
  const token  = bearer(region === 'uk' ? process.env.EUKA_TOKEN_UK : process.env.EUKA_TOKEN);
  if (!token) {
    return res.status(503).json({
      ok: false,
      error: `EUKA token for "${region}" is not configured yet (set ${region === 'uk' ? 'EUKA_TOKEN_UK' : 'EUKA_TOKEN'} in the Vercel project).`
    });
  }
  if (req.query.type && req.query.type !== 'myperf') {
    return res.status(400).json({ ok: false, error: 'Unsupported type' });
  }

  const days  = Math.min(Math.max(parseInt(req.query.days, 10) || 7, 1), 90);
  const end   = dateStr(0);
  const start = dateStr(days);

  try {
    const sessionId = await initSession(token);
    const storeId   = await resolveStoreId(sessionId, token, FALLBACK_STORE[region]);
    const call = (name, args) => mcpTool(name, args, sessionId, token);

    const [perf, levels, approval] = await Promise.all([
      call('get_dashboard_performance_overview', { storeId, startDate: start, endDate: end }),
      call('get_dashboard_creator_level_breakdown', { storeId, postedDateRange: { start, end } }),
      call('get_dashboard_sample_approval_rate', { storeId, postedDateRange: { start, end } })
        .catch(() => null)
    ]);

    const s = sumTiers(levels);
    /* approvalRate arrives either as a 0-1 fraction or as a percentage. */
    const rawRate = approval && (approval.rate != null ? approval.rate : approval.approvalRate);
    const rate = rawRate == null
      ? (s.requests ? (s.approved / s.requests) * 100 : null)
      : (rawRate <= 1 ? rawRate * 100 : rawRate);

    res.setHeader('Cache-Control', 's-maxage=900, stale-while-revalidate=300');
    return res.json({
      ok: true,
      region,
      period: { start, end, days },
      currency: region === 'uk' ? 'GBP' : 'USD',
      samples: {
        requests: s.requests,
        approved: s.approved,
        shipped: s.shipped,
        posted: s.posted,
        invites: s.invites,
        approvalRate: rate
      },
      affiliate: {
        shopGmv:        num(perf && perf.totalShopGMV),
        affiliateGmv:   num(perf && perf.totalAffiliateGMV) || s.gmv,
        orders:         num(perf && perf.totalOrders),
        activeCreators: num(perf && perf.activeCreators),
        messagesSent:   num(perf && perf.messagesSent)
      }
    });
  } catch (err) {
    console.error('[euka proxy]', err);
    return res.status(502).json({ ok: false, error: err.message || 'EUKA request failed' });
  }
}
