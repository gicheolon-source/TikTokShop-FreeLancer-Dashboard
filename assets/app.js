/* Dr.Reju-All TikTok Shop Operations dashboard for freelancers.
   Data lives in data/*.js. This file = auth gate, storage, router, views. */

/* ------------------------------------------------------------------
   ACCESS CONTROL
   Freelancers log in with a shared ID / password (they do not have a
   company Google account). Team members can still use Google sign-in.
   NOTE: this is a convenience gate only -- the credentials below ship
   to the browser. Real enforcement must be done with Firestore rules.
   To rotate: change `pw` here and tell the freelancers the new one.
------------------------------------------------------------------- */
const ACCOUNTS = [
  { id: 'rejuall-fulltime', pw: 'rejuall2026', name: 'Full-time', role: 'Full-time operator' },
  { id: 'rejuall-parttime', pw: 'rejuall2026', name: 'Part-time', role: 'Part-time operator' }
];
const ALLOWED_DOMAINS = ['neosimplix.com'];
const ALLOWED_EMAILS  = [
  // 'someone@gmail.com',
];

/* ------------------------------------------------------------------ */
const SOPS = { us: window.SOP_US, uk: window.SOP_UK };
const PAGES = [
  { id: 'today',     icon: '\u2600\uFE0F', label: 'Today',       title: 'Today' },
  { id: 'checklist', icon: '\u2705',       label: 'Checklist',   title: 'Task checklist' },
  { id: 'shift',     icon: '\u{1F4DD}',    label: 'Shift notes', title: 'Shift notes' },
  { id: 'sop',       icon: '\u{1F4D8}',    label: 'SOP',         title: 'Operation SOP' },
  { id: 'templates', icon: '\u{1F4AC}',    label: 'Templates',   title: 'Message templates' },
  { id: 'links',     icon: '\u{1F517}',    label: 'Quick Links', title: 'Quick links' },
  { id: 'handover',  icon: '\u{1F501}',    label: 'Handover',    title: 'Handover checklist' },
  { id: 'reference', icon: '\u{1F4D6}',    label: 'Reference',   title: 'Reference' }
];

const S = {
  shop: localStorage.getItem('fl_shop') === 'uk' ? 'uk' : 'us',
  page: 'today',
  params: {},
  user: null,
  date: todayISO(),
  week: mondayISO(new Date()),
  freq: 'daily',
  sopQuery: '',
  openSop: {},
  shiftDate: todayISO(),
  tplQuery: '',
  tplCat: 'all',
  tplShop: 'all'
};

/* ---------------- helpers ---------------- */
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, c =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
function todayISO() {
  const d = new Date(), p = n => String(n).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}
function mondayISO(d) {
  const x = new Date(d);
  x.setDate(x.getDate() - ((x.getDay() + 6) % 7));
  const p = n => String(n).padStart(2, '0');
  return x.getFullYear() + '-' + p(x.getMonth() + 1) + '-' + p(x.getDate());
}
function prettyDate(iso) {
  const d = new Date(iso + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
}
function shiftDays(iso, n) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + n);
  const p = x => String(x).padStart(2, '0');
  return d.getFullYear() + '-' + p(d.getMonth() + 1) + '-' + p(d.getDate());
}
function isWeekend(iso) {
  const g = new Date(iso + 'T00:00:00').getDay();
  return g === 0 || g === 6;
}
const $ = sel => document.querySelector(sel);

/* ---------------- storage ---------------- */
const Store = {
  slug() {
    if (!S.user) return 'local';
    const raw = S.user.id || String(S.user.email || '').split('@')[0];
    return raw.replace(/[^a-z0-9._-]/gi, '_').toLowerCase();
  },
  local(key) {
    try { return JSON.parse(localStorage.getItem(key)); } catch { return null; }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    if (S.user && window.FB) window.FB.set(key, value).catch(e => console.warn('sync failed', e));
  },
  /* read local first, then reconcile with the server copy */
  async load(key) {
    const local = this.local(key);
    if (!S.user || !window.FB) return local || {};
    try {
      const remote = await window.FB.get(key);
      if (!remote) return local || {};
      const merged = Object.assign({}, remote, local || {});
      localStorage.setItem(key, JSON.stringify(merged));
      return merged;
    } catch (e) {
      console.warn('load failed', e);
      return local || {};
    }
  }
};

const keyDaily    = () => `fl_${Store.slug()}_daily_${S.shop}_${S.date}`;
const keyWeekly   = () => `fl_${Store.slug()}_weekly_${S.shop}_${S.week}`;
const keyHandover = () => `fl_handover_${S.shop}`;
/* Shift notes and template counters are shared by the whole team, so they are NOT
   namespaced per account -- the point is that the next shift reads what you wrote. */
const keyShift    = date => `fl_shift_${S.shop}_${date}`;
const keyTplUse   = () => 'fl_tpl_use';

/* ---------------- auth gate ---------------- */
function emailAllowed(email) {
  if (!email) return false;
  const lower = email.toLowerCase();
  if (ALLOWED_EMAILS.map(e => e.toLowerCase()).includes(lower)) return true;
  return ALLOWED_DOMAINS.some(d => lower.endsWith('@' + d));
}

function findAccount(id, pw) {
  const key = String(id || '').trim().toLowerCase();
  return ACCOUNTS.find(a => a.id === key && a.pw === pw) || null;
}

function startAuth() {
  const gate = $('#gate'), err = $('#gate-err');

  const fail = msg => { err.hidden = false; err.textContent = msg; };

  $('#gate-form').onsubmit = e => {
    e.preventDefault();
    err.hidden = true;
    const acc = findAccount($('#gate-id').value, $('#gate-pw').value);
    if (!acc) { $('#gate-pw').value = ''; return fail('Wrong ID or password.'); }
    signInAccount(acc);
  };

  function signInAccount(acc) {
    localStorage.setItem('fl_account', acc.id);
    S.user = { id: acc.id, name: acc.name, role: acc.role, kind: 'account' };
    openApp();
  }

  $('#gate-google').onclick = async () => {
    err.hidden = true;
    if (!window.FB) { err.hidden = false; err.textContent = 'Sign-in is still loading. Try again in a moment.'; return; }
    try {
      await window.FB.signIn();
    } catch (e) {
      err.hidden = false;
      err.textContent = e && e.code === 'auth/popup-closed-by-user'
        ? 'Sign-in window was closed.'
        : 'Sign-in failed: ' + (e && e.message ? e.message : e);
    }
  };

  $('#gate-local').onclick = () => { S.user = null; openApp(); };

  if (window.FB) {
    window.FB.onUser(u => {
      if (!u) return;
      if (!emailAllowed(u.email)) {
        window.FB.signOut();
        err.hidden = false;
        err.textContent = `${u.email} does not have access yet. Ask the team to add your account, or continue offline.`;
        return;
      }
      S.user = { email: u.email, name: u.displayName || u.email };
      openApp();
    });
  }

  function openApp() {
    gate.hidden = true;
    $('#app').hidden = false;
    boot();
  }

  /* stay signed in on this device */
  const saved = localStorage.getItem('fl_account');
  const savedAcc = saved && ACCOUNTS.find(a => a.id === saved);
  if (savedAcc) signInAccount(savedAcc);
}

/* ---------------- boot ---------------- */
let booted = false;
function boot() {
  if (booted) { render(); return; }
  booted = true;
  renderShopSwitch();
  renderNav();
  renderUserBox();
  window.addEventListener('hashchange', readHash);
  readHash();
}

function readHash() {
  const raw = location.hash.replace(/^#\/?/, '');
  const [name, qs] = raw.split('?');
  S.page = PAGES.some(p => p.id === name) ? name : 'today';
  S.params = {};
  if (qs) qs.split('&').forEach(kv => {
    const [k, v] = kv.split('=');
    S.params[k] = decodeURIComponent(v || '');
  });
  render();
}

function go(page, params) {
  const qs = params ? '?' + Object.entries(params).map(([k, v]) => k + '=' + encodeURIComponent(v)).join('&') : '';
  location.hash = '#/' + page + qs;
}
window.go = go;

/* ---------------- chrome ---------------- */
function renderShopSwitch() {
  $('#shop-switch').innerHTML = ['us', 'uk'].map(id =>
    `<button class="shop-btn${S.shop === id ? ' on' : ''}" data-shop="${id}">${SOPS[id].flag} ${SOPS[id].label}</button>`
  ).join('');
  $('#shop-switch').querySelectorAll('[data-shop]').forEach(b => {
    b.onclick = () => {
      S.shop = b.dataset.shop;
      localStorage.setItem('fl_shop', S.shop);
      S.openSop = {};
      renderShopSwitch();
      renderNav();
      render();
    };
  });
}

function renderNav() {
  $('#nav').innerHTML = PAGES.map(p =>
    `<button class="nav-item${S.page === p.id ? ' on' : ''}" data-page="${p.id}">
       <span class="nav-ico">${p.icon}</span>${esc(p.label)}
       ${p.id === 'checklist' ? '<span class="nav-badge" id="nav-cl"></span>' : ''}
     </button>`).join('');
  $('#nav').querySelectorAll('[data-page]').forEach(b => { b.onclick = () => go(b.dataset.page); });
}

function renderUserBox() {
  const box = $('#user-box'), badge = $('#sync-badge');
  if (S.user) {
    const sub = S.user.role || S.user.email || '';
    box.innerHTML = `<b>${esc(S.user.name)}</b>${esc(sub)}<br><button id="signout">Sign out</button>`;
    box.querySelector('#signout').onclick = () => {
      localStorage.removeItem('fl_account');
      const done = () => location.reload();
      if (S.user.kind === 'account' || !window.FB) done();
      else window.FB.signOut().then(done, done);
    };
    badge.textContent = 'synced';
    badge.classList.add('on');
  } else {
    box.innerHTML = `<b>Offline mode</b>Saved on this device only<br><button id="signin">Sign in to sync</button>`;
    box.querySelector('#signin').onclick = () => location.reload();
    badge.textContent = 'local only';
    badge.classList.remove('on');
  }
}

/* ---------------- router ---------------- */
/* Views load their state asynchronously. `renderToken` lets a view detect that the
   user navigated away while it was awaiting, so a slow render cannot overwrite the
   page that is now on screen. */
let renderToken = 0;
const stale = token => token !== renderToken;

function render() {
  const page = PAGES.find(p => p.id === S.page);
  $('#page-title').textContent = page.title;
  $('#page-sub').textContent = `${SOPS[S.shop].flag} ${SOPS[S.shop].label}`;
  renderNav();
  const view = $('#view');
  view.scrollTop = 0;
  const token = ++renderToken;
  ({
    today: viewToday,
    checklist: viewChecklist,
    shift: viewShift,
    sop: viewSop,
    templates: viewTemplates,
    links: viewLinks,
    handover: viewHandover,
    reference: viewReference
  })[S.page](view, token);
}

/* ---------------- view: today ---------------- */
async function viewToday(el, token) {
  S.date = todayISO();
  const tasks = window.TASKS[S.shop].filter(t => t.freq === 'daily');
  const state = await Store.load(keyDaily());
  const done = tasks.filter(t => state[t.id]).length;
  const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0;
  const sop = SOPS[S.shop];
  const weekTasks = window.TASKS[S.shop].filter(t => t.freq === 'weekly');
  const weekState = await Store.load(keyWeekly());
  if (stale(token)) return;

  el.innerHTML = `
    <div class="grid g2">
      <div class="card"><div class="card-body" style="display:flex;gap:20px;align-items:center">
        ${ring(pct)}
        <div style="flex:1;min-width:0">
          <h3 style="font-size:16px">${done} of ${tasks.length} daily tasks done</h3>
          <div class="muted" style="font-size:12.5px;margin-top:2px">${prettyDate(S.date)}${isWeekend(S.date) ? ' &middot; weekend' : ''}</div>
          <div class="pbar" style="margin-top:14px"><i style="width:${pct}%"></i></div>
          <button class="btn btn-sm" style="margin-top:14px" onclick="go('checklist')">Open full checklist &rarr;</button>
        </div>
      </div></div>

      <div class="card">
        <div class="card-head"><h3>Escalate to</h3></div>
        <div class="card-body tight">
          ${sop.escalation.map(p => `<div class="acc"><div class="acc-n"><b>${esc(p.name)}</b><span>${esc(p.role)}${p.contact ? ' &middot; ' + esc(p.contact) : ''}</span></div></div>`).join('')}
          <div class="sop-goal" style="margin-bottom:0">${esc(sop.escalationNote)}</div>
        </div>
      </div>
    </div>

    <div class="card" id="perf-card">
      <div class="card-head">
        <div><h3>Your shop, last 7 days</h3><div class="sub">Live from EUKA &middot; ${sop.flag} ${esc(sop.label)}</div></div>
        <span class="chip" id="perf-state">loading&hellip;</span>
      </div>
      <div class="card-body" id="perf-body"><div class="perf-skel"></div></div>
    </div>

    <div class="card">
      <div class="card-head">
        <div><h3>Today's tasks</h3><div class="sub">Daily routine for the ${esc(sop.label)}</div></div>
        <span class="chip">${done}/${tasks.length}</span>
      </div>
      <div class="card-body tight" id="today-list">${taskListHtml(tasks, state)}</div>
    </div>

    ${weekTasks.length ? `<div class="card">
      <div class="card-head"><div><h3>This week</h3><div class="sub">Week of ${prettyDate(S.week)}</div></div></div>
      <div class="card-body tight" id="today-week">${taskListHtml(weekTasks, weekState, 'weekly')}</div>
    </div>` : ''}
  `;
  wireTasks(el.querySelector('#today-list'), 'daily');
  if (el.querySelector('#today-week')) wireTasks(el.querySelector('#today-week'), 'weekly');
  updateNavBadge(done, tasks.length);
  loadPerf(S.shop, token);
}

/* ---------------- today: live shop performance ----------------
   Served by api/euka.js so the EUKA token stays on the server. The card is
   decorative: if the proxy is missing (local file server) or not configured yet,
   it explains itself and the rest of the page keeps working. */
const perfCache = {};

function money(n, cur) {
  const sym = cur === 'GBP' ? '\u00A3' : '$';
  const v = Math.round(n || 0);
  return sym + v.toLocaleString('en-US');
}
function compact(n) {
  const v = n || 0;
  if (v >= 1e6) return (v / 1e6).toFixed(v >= 1e7 ? 0 : 1) + 'M';
  if (v >= 1e3) return (v / 1e3).toFixed(v >= 1e4 ? 0 : 1) + 'K';
  return String(Math.round(v));
}

async function loadPerf(shop, token) {
  const setState = txt => { const c = $('#perf-state'); if (c) c.textContent = txt; };
  let data = perfCache[shop];
  if (!data) {
    try {
      const r = await fetch(`api/euka?region=${shop}&days=7`);
      data = await r.json();
      if (data && data.ok) perfCache[shop] = data;
    } catch (e) {
      data = { ok: false, error: 'Could not reach the data service.' };
    }
  }
  if (stale(token) || S.page !== 'today' || S.shop !== shop) return;
  const body = $('#perf-body');
  if (!body) return;

  if (!data || !data.ok) {
    setState('unavailable');
    body.innerHTML = `<div class="perf-off">
      <b>Live numbers are not connected yet.</b>
      <span>${esc((data && data.error) || 'Unknown error')}</span>
      <span class="muted">Everything else on this dashboard works without it.</span>
    </div>`;
    return;
  }

  const s = data.samples, a = data.affiliate, cur = data.currency;
  const rate = s.approvalRate == null ? '\u2014' : s.approvalRate.toFixed(1) + '%';
  const cells = [
    { lab: 'Samples shipped', val: compact(s.shipped),  hint: `${compact(s.requests)} requested`, c: 'var(--blue)' },
    { lab: 'Approval rate',   val: rate,                hint: `${compact(s.approved)} approved`,  c: 'var(--green)' },
    { lab: 'Content posted',  val: compact(s.posted),   hint: 'videos from samples',              c: 'var(--purple)' },
    { lab: 'Affiliate GMV',   val: money(a.affiliateGmv, cur), hint: `shop total ${money(a.shopGmv, cur)}`, c: 'var(--accent)' },
    { lab: 'Active creators', val: compact(a.activeCreators),  hint: `${compact(a.messagesSent)} messages sent`, c: 'var(--amber)' }
  ];
  setState(`${data.period.start} \u2192 ${data.period.end}`);
  body.innerHTML = `<div class="grid g3">${cells.map(k =>
    `<div class="kpi" style="--c:${k.c}">
       <div class="lab">${esc(k.lab)}</div>
       <div class="val">${esc(k.val)}</div>
       <div class="hint">${esc(k.hint)}</div>
     </div>`).join('')}</div>`;
}

function ring(pct) {
  const r = 46, c = 2 * Math.PI * r;
  return `<div class="ring-wrap">
    <svg class="ring" width="112" height="112" viewBox="0 0 112 112">
      <circle class="bg" cx="56" cy="56" r="${r}"></circle>
      <circle class="fg" cx="56" cy="56" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c * (1 - pct / 100)}"></circle>
    </svg>
    <div class="ring-num"><b>${pct}%</b><span>complete</span></div>
  </div>`;
}

function updateNavBadge(done, total) {
  const b = document.getElementById('nav-cl');
  if (b) b.textContent = total ? `${done}/${total}` : '';
}

/* ---------------- view: checklist ---------------- */
async function viewChecklist(el, token) {
  const all = window.TASKS[S.shop];
  const freq = S.freq;
  const tasks = all.filter(t => t.freq === freq);
  const isPersisted = freq !== 'as-needed';
  const key = freq === 'daily' ? keyDaily() : keyWeekly();
  const state = isPersisted ? await Store.load(key) : {};
  if (stale(token)) return;
  const done = tasks.filter(t => state[t.id]).length;

  el.innerHTML = `
    <div class="card">
      <div class="card-head" style="flex-wrap:wrap">
        <div class="seg">
          ${Object.entries(window.FREQ_META).map(([f, m]) =>
            `<button data-freq="${f}" class="${freq === f ? 'on' : ''}">${m.icon} ${m.label}</button>`).join('')}
        </div>
        <div class="datebar">
          ${freq === 'daily' ? `
            <button class="btn btn-sm" data-nav="-1">&lsaquo;</button>
            <input type="date" id="cl-date" value="${S.date}">
            <button class="btn btn-sm" data-nav="1">&rsaquo;</button>
            <button class="btn btn-sm" data-nav="0">Today</button>` : ''}
          ${freq === 'weekly' ? `
            <button class="btn btn-sm" data-wnav="-7">&lsaquo;</button>
            <span class="chip">Week of ${prettyDate(S.week)}</span>
            <button class="btn btn-sm" data-wnav="7">&rsaquo;</button>
            <button class="btn btn-sm" data-wnav="0">This week</button>` : ''}
          ${isPersisted ? `<span class="chip">${done}/${tasks.length}</span>` : ''}
        </div>
      </div>
      <div class="card-body tight">
        ${isPersisted && freq === 'daily' && isWeekend(S.date)
          ? `<div class="sop-goal">Weekend day. Tasks tagged <b>weekend</b> still need to be covered.</div>` : ''}
        ${freq === 'as-needed'
          ? `<div class="sop-goal">These are not scheduled. Run them whenever the situation comes up \u2014 open the SOP for the exact steps.</div>` : ''}
        ${tasks.length ? taskListHtml(tasks, state, freq) : '<div class="empty">Nothing here.</div>'}
      </div>
    </div>`;

  el.querySelectorAll('[data-freq]').forEach(b => {
    b.onclick = () => { S.freq = b.dataset.freq; render(); };
  });
  el.querySelectorAll('[data-nav]').forEach(b => {
    b.onclick = () => {
      const n = +b.dataset.nav;
      S.date = n === 0 ? todayISO() : shiftDays(S.date, n);
      render();
    };
  });
  el.querySelectorAll('[data-wnav]').forEach(b => {
    b.onclick = () => {
      const n = +b.dataset.wnav;
      S.week = n === 0 ? mondayISO(new Date()) : mondayISO(shiftDays(S.week, n));
      render();
    };
  });
  const di = el.querySelector('#cl-date');
  if (di) di.onchange = () => { S.date = di.value || todayISO(); render(); };

  wireTasks(el, freq);
  if (freq === 'daily') updateNavBadge(done, tasks.length);
}

function taskListHtml(tasks, state, freq) {
  const readOnly = freq === 'as-needed';
  const groups = [];
  tasks.forEach(t => {
    let g = groups.find(x => x.name === t.group);
    if (!g) groups.push(g = { name: t.group, items: [] });
    g.items.push(t);
  });
  return groups.map(g => `
    <div class="task-group">
      <div class="task-group-h">${esc(g.name)}</div>
      ${g.items.map(t => {
        const done = !!state[t.id];
        return `<div class="task${done ? ' done' : ''}" data-task="${t.id}">
          ${readOnly ? '<span class="nav-ico" style="margin-top:2px">\u26A1</span>'
                     : `<input class="cb" type="checkbox" ${done ? 'checked' : ''} data-cb="${t.id}">`}
          <div class="task-main">
            <div class="task-title" ${readOnly ? '' : `data-toggle="${t.id}"`}>${esc(t.title)}</div>
            <div class="task-meta">
              ${t.weekend ? '<span class="chip wknd">incl. weekend</span>' : ''}
              ${t.sop ? `<button class="chip sop" data-sop="${t.sop}">SOP</button>` : ''}
              ${t.url ? `<a class="chip link" href="${esc(t.url)}" target="_blank" rel="noopener">Open \u2197</a>` : ''}
            </div>
          </div>
        </div>`;
      }).join('')}
    </div>`).join('');
}

function wireTasks(el, freq) {
  const key = freq === 'weekly' ? keyWeekly() : keyDaily();
  const toggle = id => {
    const state = Store.local(key) || {};
    state[id] = !state[id];
    Store.set(key, state);
    render();
  };
  el.querySelectorAll('[data-cb]').forEach(cb => { cb.onchange = () => toggle(cb.dataset.cb); });
  el.querySelectorAll('[data-toggle]').forEach(t => { t.onclick = () => toggle(t.dataset.toggle); });
  el.querySelectorAll('[data-sop]').forEach(b => {
    b.onclick = () => go('sop', { item: b.dataset.sop });
  });
}

/* ---------------- view: shift notes ----------------
   Daily handover between the part-time and full-time shift. One shared document
   per shop per day, so whoever comes in next reads what is still open.
   Notes are stored as a map keyed by note id, and deleting writes a tombstone
   (`deleted: true`) instead of removing the key -- otherwise another device with a
   stale local copy would resurrect the note on the next merge. */
/* The two logins are shared, so ask for a real name instead of repeating the
   account label -- otherwise every note is signed "Part-time". */
function accountLabel() {
  return (S.user && S.user.name) || 'Offline';
}
function authorName() {
  return localStorage.getItem('fl_name') || '';
}
function noteList(state) {
  return Object.values(state || {})
    .filter(n => n && !n.deleted && n.text)
    .sort((a, b) => (b.ts || 0) - (a.ts || 0));
}
function noteTime(ts) {
  const d = new Date(ts || 0);
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
}

async function viewShift(el, token) {
  const date = S.shiftDate;
  const key = keyShift(date);
  const state = await Store.load(key);
  if (stale(token)) return;

  const notes = noteList(state);
  const open = notes.filter(n => n.follow && !n.resolved);

  /* pull unresolved notes from the previous 7 days so nothing quietly dies */
  const prevDays = Array.from({ length: 7 }, (_, i) => shiftDays(date, -(i + 1)));
  const prev = await Promise.all(prevDays.map(async d => ({
    date: d, notes: noteList(await Store.load(keyShift(d))).filter(n => n.follow && !n.resolved)
  })));
  if (stale(token)) return;
  const carry = prev.filter(p => p.notes.length);

  el.innerHTML = `
    <div class="card">
      <div class="card-head" style="flex-wrap:wrap">
        <div><h3>Shift log &middot; ${prettyDate(date)}</h3>
          <div class="sub">Shared with the whole team. Write what the next shift needs to know.</div></div>
        <div class="datebar">
          <button class="btn btn-sm" data-snav="-1">&lsaquo;</button>
          <input type="date" id="sh-date" value="${date}">
          <button class="btn btn-sm" data-snav="1">&rsaquo;</button>
          <button class="btn btn-sm" data-snav="0">Today</button>
          <span class="chip${open.length ? ' wknd' : ''}">${open.length} open</span>
        </div>
      </div>
      <div class="card-body">
        <div class="sh-form">
          <div class="sh-form-row">
            <input id="sh-name" placeholder="Your name" value="${esc(authorName())}">
            <label class="sh-check"><input type="checkbox" id="sh-follow" checked> Needs follow-up</label>
          </div>
          <textarea id="sh-text" rows="3"
            placeholder="e.g. Order 5773xxxx \u2014 customer waiting on a reshipment, MCF order not created yet."></textarea>
          <div class="sh-form-row end">
            <span class="muted" style="font-size:12px">Signed in as <b>${esc(accountLabel())}</b></span>
            <button class="btn btn-primary btn-sm" id="sh-add">Add note</button>
          </div>
        </div>
      </div>
    </div>

    ${carry.length ? `<div class="card">
      <div class="card-head"><div><h3>Still open from earlier</h3>
        <div class="sub">Unresolved follow-ups from the past week</div></div>
        <span class="chip wknd">${carry.reduce((n, p) => n + p.notes.length, 0)}</span></div>
      <div class="card-body tight" style="padding-top:12px">
        ${carry.map(p => p.notes.map(n => noteHtml(n, p.date, true)).join('')).join('')}
      </div>
    </div>` : ''}

    <div class="card">
      <div class="card-head"><h3>Notes for this day</h3><span class="chip">${notes.length}</span></div>
      <div class="card-body tight" style="padding-top:12px" id="sh-list">
        ${notes.length ? notes.map(n => noteHtml(n, date, false)).join('')
                       : '<div class="empty">No notes yet for this day.</div>'}
      </div>
    </div>`;

  el.querySelectorAll('[data-snav]').forEach(b => {
    b.onclick = () => {
      const n = +b.dataset.snav;
      S.shiftDate = n === 0 ? todayISO() : shiftDays(S.shiftDate, n);
      render();
    };
  });
  const di = el.querySelector('#sh-date');
  di.onchange = () => { S.shiftDate = di.value || todayISO(); render(); };

  el.querySelector('#sh-add').onclick = () => {
    const ta = el.querySelector('#sh-text');
    const text = ta.value.trim();
    const name = el.querySelector('#sh-name').value.trim();
    if (!name) { el.querySelector('#sh-name').focus(); return; }
    if (!text) { ta.focus(); return; }
    localStorage.setItem('fl_name', name);
    const st = Store.local(key) || {};
    const id = 'n' + Date.now() + Math.random().toString(36).slice(2, 6);
    st[id] = {
      id, ts: Date.now(), author: name, shift: accountLabel(),
      follow: el.querySelector('#sh-follow').checked,
      resolved: false, text
    };
    Store.set(key, st);
    render();
  };

  const mutate = (noteDate, id, patch) => {
    const k = keyShift(noteDate);
    const st = Store.local(k) || {};
    if (!st[id]) return;
    st[id] = Object.assign({}, st[id], patch);
    Store.set(k, st);
    render();
  };
  el.querySelectorAll('[data-note-act]').forEach(b => {
    b.onclick = () => {
      const { noteAct: act, noteId: id, noteDate: d } = b.dataset;
      if (act === 'resolve')  mutate(d, id, { resolved: true });
      if (act === 'reopen')   mutate(d, id, { resolved: false });
      if (act === 'delete' && confirm('Delete this note?')) mutate(d, id, { deleted: true });
    };
  });
}

function noteHtml(n, date, showDate) {
  const resolved = !!n.resolved;
  return `<div class="sh-note${resolved ? ' done' : ''}">
    <div class="sh-note-h">
      <b>${esc(n.author || 'Unknown')}</b>
      <span class="chip">${esc(n.shift || 'Shift')}</span>
      ${n.follow ? `<span class="chip ${resolved ? 'ok' : 'wknd'}">${resolved ? 'resolved' : 'needs follow-up'}</span>` : ''}
      <span class="sh-note-t">${showDate ? esc(prettyDate(date)) + ' &middot; ' : ''}${noteTime(n.ts)}</span>
    </div>
    <div class="sh-note-b">${esc(n.text)}</div>
    <div class="sh-note-a">
      ${n.follow ? `<button class="btn btn-sm" data-note-act="${resolved ? 'reopen' : 'resolve'}"
        data-note-id="${esc(n.id)}" data-note-date="${esc(date)}">${resolved ? 'Reopen' : 'Mark resolved'}</button>` : ''}
      <button class="btn btn-sm" data-note-act="delete" data-note-id="${esc(n.id)}" data-note-date="${esc(date)}">Delete</button>
    </div>
  </div>`;
}

/* ---------------- view: message templates ----------------
   The copy-ready replies live inside the SOP data (blocks with `t: 'templates'`).
   This view harvests them so there is exactly one source of truth, and ranks by
   how often the team actually copies each one. */
function collectTemplates() {
  const out = [];
  ['us', 'uk'].forEach(shop => {
    const sop = SOPS[shop];
    if (!sop) return;
    sop.groups.forEach(g => g.items.forEach(item => {
      (item.blocks || []).forEach(b => {
        if (b.t !== 'templates') return;
        b.items.forEach(t => out.push({
          id: `${shop}|${item.id}|${t.label}`,
          shop, cat: g.title, catIcon: g.icon,
          sopId: item.id, sopTitle: item.title,
          context: b.title || '', label: t.label, text: t.text
        }));
      });
    }));
  });
  return out;
}

function viewTemplates(el) {
  const all = collectTemplates();
  const use = Store.local(keyTplUse()) || {};
  const cats = [...new Set(all.map(t => t.cat))];
  const q = S.tplQuery.trim().toLowerCase();

  const rows = all
    .filter(t => S.tplShop === 'all' || t.shop === S.tplShop)
    .filter(t => S.tplCat === 'all' || t.cat === S.tplCat)
    .filter(t => !q || (t.label + ' ' + t.text + ' ' + t.sopTitle + ' ' + t.context).toLowerCase().includes(q))
    .sort((a, b) => (use[b.id] || 0) - (use[a.id] || 0));

  el.innerHTML = `
    <div class="card">
      <div class="card-body">
        <input class="sop-search" id="tpl-q" placeholder="Search templates \u2014 e.g. refund, sample, retainer" value="${esc(S.tplQuery)}">
        <div class="tpl-filters">
          <div class="seg">
            <button data-tshop="all" class="${S.tplShop === 'all' ? 'on' : ''}">All shops</button>
            ${['us', 'uk'].map(s => `<button data-tshop="${s}" class="${S.tplShop === s ? 'on' : ''}">${SOPS[s].flag} ${s.toUpperCase()}</button>`).join('')}
          </div>
          <div class="seg">
            <button data-tcat="all" class="${S.tplCat === 'all' ? 'on' : ''}">All topics</button>
            ${cats.map(c => `<button data-tcat="${esc(c)}" class="${S.tplCat === c ? 'on' : ''}">${esc(c)}</button>`).join('')}
          </div>
        </div>
      </div>
    </div>

    ${rows.length ? rows.map(t => {
      const n = use[t.id] || 0;
      return `<div class="card tpl-card">
        <div class="tpl-card-h">
          <div class="tpl-card-t">
            <b>${esc(t.label)}</b>
            <span>${SOPS[t.shop].flag} ${esc(t.cat)} &middot; ${esc(t.sopTitle)}${t.context ? ' &middot; ' + esc(t.context) : ''}</span>
          </div>
          ${n ? `<span class="chip">used ${n}\u00D7</span>` : ''}
          <button class="chip sop" data-sop="${esc(t.sopId)}">SOP</button>
          <button class="btn btn-sm btn-primary" data-copy="${esc(t.text)}" data-tplid="${esc(t.id)}">Copy</button>
        </div>
        <div class="tpl-b">${esc(t.text)}</div>
      </div>`;
    }).join('') : '<div class="empty">No template matches that filter.</div>'}

    <div class="blk warn"><div class="blk-h">\u26A0\uFE0F Before you send</div>
      <ul><li>Replace every bracketed placeholder (e.g. [Customer Name]) before sending.</li>
      <li>Templates are a starting point \u2014 match the customer's actual issue, and never promise a refund you have not been cleared to give.</li></ul></div>`;

  const qi = el.querySelector('#tpl-q');
  qi.oninput = () => {
    S.tplQuery = qi.value;
    const pos = qi.selectionStart;
    render();
    const n = $('#tpl-q'); n.focus(); n.setSelectionRange(pos, pos);
  };
  el.querySelectorAll('[data-tshop]').forEach(b => {
    b.onclick = () => { S.tplShop = b.dataset.tshop; render(); };
  });
  el.querySelectorAll('[data-tcat]').forEach(b => {
    b.onclick = () => { S.tplCat = b.dataset.tcat; render(); };
  });
  el.querySelectorAll('[data-sop]').forEach(b => {
    b.onclick = () => go('sop', { item: b.dataset.sop });
  });
}

/* ---------------- view: SOP ---------------- */
function viewSop(el) {
  const sop = SOPS[S.shop];
  if (S.params.item) {
    S.openSop[S.params.item] = true;
    const owner = sop.groups.find(g => g.items.some(i => i.id === S.params.item));
    if (!owner) {
      const other = S.shop === 'us' ? 'uk' : 'us';
      if (SOPS[other].groups.some(g => g.items.some(i => i.id === S.params.item))) {
        S.shop = other;
        localStorage.setItem('fl_shop', S.shop);
        renderShopSwitch();
      }
    }
  }
  const q = S.sopQuery.trim().toLowerCase();
  const match = item => {
    if (!q) return true;
    return JSON.stringify(item).toLowerCase().includes(q);
  };

  const groups = SOPS[S.shop].groups
    .map(g => ({ g, items: g.items.filter(match) }))
    .filter(x => x.items.length);

  el.innerHTML = `
    <div style="margin-bottom:6px">
      <input class="sop-search" id="sop-q" placeholder="Search the ${esc(SOPS[S.shop].label)} SOP \u2014 e.g. reshipment, spark, refund" value="${esc(S.sopQuery)}">
    </div>
    ${groups.length ? groups.map(({ g, items }) => `
      <div class="sop-grp-h"><span>${g.icon}</span>${esc(g.title)}</div>
      ${items.map(sopItemHtml).join('')}
    `).join('') : '<div class="empty">No SOP section matches that search.</div>'}
  `;

  const qi = el.querySelector('#sop-q');
  qi.oninput = () => {
    S.sopQuery = qi.value;
    const pos = qi.selectionStart;
    render();
    const n = $('#sop-q'); n.focus(); n.setSelectionRange(pos, pos);
  };
  el.querySelectorAll('[data-sopitem]').forEach(b => {
    b.onclick = () => { const id = b.dataset.sopitem; S.openSop[id] = !S.openSop[id]; render(); };
  });

  if (S.params.item) {
    const node = el.querySelector(`[data-sopbody="${S.params.item}"]`);
    if (node) node.scrollIntoView({ block: 'center' });
    S.params = {};
  }
}

function sopItemHtml(item) {
  const open = !!S.openSop[item.id];
  return `<div class="sop-item${open ? ' open' : ''}" data-sopbody="${item.id}">
    <button class="sop-item-h" data-sopitem="${item.id}">
      <span class="caret">\u25B6</span>
      <span class="t">${esc(item.title)}</span>
      <span class="chip">${esc(item.cadence)}</span>
    </button>
    ${open ? `<div class="sop-body">
      ${item.goal ? `<div class="sop-goal">${esc(item.goal)}</div>` : ''}
      ${(item.blocks || []).map(blockHtml).join('')}
      ${item.links && item.links.length ? `<div class="linkrow">${item.links.map(l =>
        `<a class="chip link" href="${esc(l.url)}" target="_blank" rel="noopener">${esc(l.label)} \u2197</a>`).join('')}</div>` : ''}
    </div>` : ''}
  </div>`;
}

function blockHtml(b) {
  const head = b.title ? `<div class="blk-h">${esc(b.title)}</div>` : '';
  switch (b.t) {
    case 'p':
      return `<div class="blk">${head}<div style="font-size:13px">${esc(b.text)}</div></div>`;
    case 'list':
      return `<div class="blk">${head}<ul>${b.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>`;
    case 'warn':
      return `<div class="blk warn">${b.title ? `<div class="blk-h">\u26A0\uFE0F ${esc(b.title)}</div>` : '<div class="blk-h">\u26A0\uFE0F Important</div>'}
        <ul>${b.items.map(i => `<li>${esc(i)}</li>`).join('')}</ul></div>`;
    case 'steps':
      return `<div class="blk">${head}<ol>${b.items.map(s =>
        `<li>${esc(s.text)}${s.sub ? `<ul>${s.sub.map(u => `<li>${esc(u)}</li>`).join('')}</ul>` : ''}</li>`).join('')}</ol></div>`;
    case 'criteria':
      return `<div class="blk">${head}<div class="crit">${b.items.map(i =>
        `<div class="crit-i"><div class="l">${esc(i.label)}</div><div class="v">${esc(i.value)}</div></div>`).join('')}</div></div>`;
    case 'templates':
      return `<div class="blk">${head}${b.items.map((i, n) =>
        `<div class="tpl"><div class="tpl-h"><span>${esc(i.label)}</span>
           <button class="btn btn-sm" data-copy="${esc(i.text).replace(/"/g, '&quot;')}">Copy</button></div>
         <div class="tpl-b">${esc(i.text)}</div></div>`).join('')}</div>`;
    default:
      return '';
  }
}

document.addEventListener('click', e => {
  const b = e.target.closest('[data-copy]');
  if (!b) return;
  navigator.clipboard.writeText(b.dataset.copy).then(() => {
    const old = b.textContent;
    b.textContent = 'Copied';
    setTimeout(() => { b.textContent = old; }, 1400);
  });
  /* templates carry an id so the library can rank by real usage */
  if (b.dataset.tplid) {
    const use = Store.local(keyTplUse()) || {};
    use[b.dataset.tplid] = (use[b.dataset.tplid] || 0) + 1;
    Store.set(keyTplUse(), use);
  }
});

/* ---------------- view: links ---------------- */
function viewLinks(el) {
  const groups = window.LINKS.filter(g => g.shop === S.shop || g.shop === 'both');
  el.innerHTML = `<div class="grid g2">${groups.map(g => `
    <div class="card">
      <div class="card-head"><h3>${esc(g.group)}</h3></div>
      <div class="card-body tight" style="padding-top:14px">
        ${g.items.map(i => `<a class="lk" href="${esc(i.url)}" target="_blank" rel="noopener">
          <div class="lk-t"><b>${esc(i.label)}</b><span>${esc(i.desc || '')}</span></div>
          <span class="lk-arrow">\u2197</span></a>`).join('')}
      </div>
    </div>`).join('')}</div>`;
}

/* ---------------- view: handover ---------------- */
async function viewHandover(el, token) {
  const hv = window.HANDOVER;
  const key = keyHandover();
  const state = await Store.load(key);
  if (stale(token)) return;

  el.innerHTML = `
    <div class="card">
      <div class="card-head">
        <div><h3>Handover record</h3><div class="sub">${SOPS[S.shop].flag} ${esc(SOPS[S.shop].label)} &middot; escalation: ${esc(hv.escalation[S.shop])}</div></div>
        <span class="chip">${esc(hv.version)}</span>
      </div>
      <div class="card-body">
        <div class="hv-meta">
          ${hv.meta.map(m => `<div><label>${esc(m.label)}</label>
            ${m.type === 'select'
              ? `<select data-meta="${m.id}">${m.options.map(o => `<option${state[m.id] === o ? ' selected' : ''}>${esc(o)}</option>`).join('')}</select>`
              : `<input type="${m.type}" data-meta="${m.id}" value="${esc(state[m.id] || '')}">`}
          </div>`).join('')}
        </div>
      </div>
    </div>

    ${hv.sections.map(sec => {
      const done = sec.items.filter(i => state[sec.id + '_' + i.id]).length;
      return `<div class="card">
        <div class="card-head">
          <div style="display:flex;align-items:center;gap:11px">
            <span class="hv-letter">${sec.letter}</span>
            <div><h3>${esc(sec.title)}</h3>${sec.subtitle ? `<div class="sub">${esc(sec.subtitle)}</div>` : ''}</div>
          </div>
          <span class="chip">${done}/${sec.items.length}</span>
        </div>
        <div class="card-body tight" style="padding-top:12px">
          ${sec.warn ? `<div class="blk warn" style="margin-top:4px"><div class="blk-h">\u26A0\uFE0F Security</div><ul><li>${esc(sec.warn)}</li></ul></div>` : ''}
          ${sec.items.map(i => {
            const k = sec.id + '_' + i.id, on = !!state[k];
            return `<div class="task${on ? ' done' : ''}">
              <input class="cb" type="checkbox" ${on ? 'checked' : ''} data-hv="${k}">
              <div class="task-main"><div class="task-title" data-hvt="${k}">${esc(i.text)}</div></div>
            </div>`;
          }).join('')}
        </div>
      </div>`;
    }).join('')}
  `;

  const save = (k, v) => {
    const st = Store.local(key) || {};
    st[k] = v;
    Store.set(key, st);
  };
  el.querySelectorAll('[data-hv]').forEach(cb => {
    cb.onchange = () => { save(cb.dataset.hv, cb.checked); render(); };
  });
  el.querySelectorAll('[data-hvt]').forEach(t => {
    t.onclick = () => { const k = t.dataset.hvt; save(k, !(Store.local(key) || {})[k]); render(); };
  });
  el.querySelectorAll('[data-meta]').forEach(inp => {
    inp.onchange = () => save(inp.dataset.meta, inp.value);
  });
}

/* ---------------- view: reference ---------------- */
function viewReference(el) {
  const sop = SOPS[S.shop];
  el.innerHTML = `
    <div class="card">
      <div class="card-head"><div><h3>Accounts</h3><div class="sub">${sop.flag} ${esc(sop.label)}</div></div></div>
      <div class="card-body tight" style="padding-top:6px">
        <div class="blk warn" style="margin-top:14px"><div class="blk-h">\u26A0\uFE0F Passwords</div>
          <ul><li>Passwords are never stored in this dashboard or in the SOP docs. You receive them individually through the password manager (1Password / Bitwarden).</li>
          <li>Never paste a password into chat, email or a spreadsheet.</li></ul></div>
        ${sop.accounts.map(a => `<div class="acc">
          <div class="acc-n"><b>${esc(a.name)}</b><span>${esc(a.id)}${a.note ? ' &middot; ' + esc(a.note) : ''}</span></div>
          ${a.url ? `<a class="chip link" href="${esc(a.url)}" target="_blank" rel="noopener">Open \u2197</a>` : ''}
          <span class="pill ${a.secret === 'invite' ? 'inv' : 'pw'}">${a.secret === 'invite' ? 'invite only' : 'password manager'}</span>
        </div>`).join('')}
      </div>
    </div>

    <div class="grid g2">
      <div class="card">
        <div class="card-head"><h3>Glossary</h3></div>
        <div class="card-body tight" style="padding-top:4px">
          ${window.GLOSSARY.map(g => `<div class="gl"><b>${esc(g.term)}</b><em>${esc(g.full)}</em><p>${esc(g.desc)}</p></div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-head"><div><h3>Compliance & PII guardrails</h3><div class="sub">Applies to every reply you send</div></div></div>
        <div class="card-body">
          <div class="blk warn" style="margin:0"><div class="blk-h">\u26A0\uFE0F Never do this</div>
          <ul>${window.COMPLIANCE.map(c => `<li>${esc(c)}</li>`).join('')}</ul></div>
        </div>
      </div>
    </div>`;
}

/* ---------------- start ---------------- */
if (window.FB) startAuth();
else document.addEventListener('fb-ready', startAuth, { once: true });
setTimeout(() => { if (!window.FB) startAuth(); }, 4000);
