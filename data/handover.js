/* TikTok Shop Operations Handover Checklist (US/UK)
   Source: https://docs.google.com/document/d/1nsGuACpe_Kxn_TrNHy1gw0Rsrey2uZRZOQfvP2Usoy8/edit */

window.HANDOVER = {
  version: 'v1.0',
  escalation: {
    us: '\uae40\uc138\uc6d0 (Sienna) \u00B7 \uc628\uae30\ucca0 (Josh)',
    uk: '\uc655\uc9c0\uc724 (June) \u00B7 \uc628\uae30\ucca0 (Josh)'
  },
  meta: [
    { id: 'hv-incoming', label: 'Incoming', type: 'text' },
    { id: 'hv-outgoing', label: 'Outgoing', type: 'text' },
    { id: 'hv-shop', label: 'Shop', type: 'select', options: ['US', 'UK'] },
    { id: 'hv-date', label: 'Handover date', type: 'date' },
    { id: 'hv-owner', label: 'Doc owner', type: 'text' }
  ],
  sections: [
    {
      id: 'hv-a',
      letter: 'A',
      title: 'Accounts & Access',
      warn:
        'Do NOT write passwords in this document or anywhere in this dashboard. Share them individually only through a password manager (1Password / Bitwarden, etc.).',
      items: [
        { id: 'a1', text: 'TTS Seller Centre \u2014 issue/transfer \u00B7 confirm access \u00B7 revoke outgoing owner\u2019s access' },
        { id: 'a2', text: 'OTP Gmail \u2014 issue/transfer \u00B7 move 2FA ownership' },
        { id: 'a3', text: 'Amazon Seller (MCF) \u2014 invite personal account \u00B7 confirm access' },
        { id: 'a4', text: 'FBT Center (UK: pipak) \u2014 issue/transfer \u00B7 confirm access' },
        { id: 'a5', text: 'Discord (US) \u2014 transfer roles & permissions' },
        { id: 'a6', text: 'Lark / report channels \u2014 invite \u00B7 confirm who to tag' },
        { id: 'a7', text: 'EUKA / affiliate back office \u2014 access' },
        { id: 'a8', text: 'All shared spreadsheets \u2014 edit access (CS templates / Reshipment / Spark / Retainer / Review)' },
        { id: 'a9', text: 'Full password rotation completed' },
        { id: 'a10', text: 'Outgoing owner\u2019s access to all accounts revoked' }
      ]
    },
    {
      id: 'hv-b',
      letter: 'B',
      title: 'Open & Pending Cases',
      subtitle: 'Snapshot at handover',
      items: [
        { id: 'b1', text: 'Outstanding reshipment cases + tracking status' },
        { id: 'b2', text: 'Unresolved refund / return requests' },
        { id: 'b3', text: 'FBT reimbursement tickets not yet received' },
        { id: 'b4', text: 'CS / creator messages awaiting reply' },
        { id: 'b5', text: 'Sample requests \u00B7 target invites \u00B7 retainer proposals awaiting review' },
        { id: 'b6', text: 'Negative reviews (1\u20132 star) currently being handled' },
        { id: 'b7', text: 'Spark Codes awaiting registration' }
      ]
    },
    {
      id: 'hv-c',
      letter: 'C',
      title: 'Recurring Tasks & Deadlines',
      subtitle: 'Add to calendar',
      items: [
        { id: 'c1', text: 'Daily: CS messages / creator messages / sample review / Spark registration / review management' },
        { id: 'c2', text: 'Weekly: FBT reimbursement report (Lark, tag Sienna) / organize retainer inquiries' },
        { id: 'c3', text: 'KPI targets agreed: 24h response rate \u00B7 chat satisfaction \u00B7 sample approvals per day' }
      ]
    },
    {
      id: 'hv-d',
      letter: 'D',
      title: 'Knowledge & Context',
      items: [
        { id: 'd1', text: 'Hand over the glossary (FBT / MCF / TAP / Spark / GMV / Sample Score / EUKA)' },
        { id: 'd2', text: 'Product lineup & size cautions (e.g. PDRN Cream 0.7 / Max 2; exclude \u201cList Price\u201d items)' },
        { id: 'd3', text: 'Beauty compliance guardrails (no medical claims, etc.)' },
        { id: 'd4', text: 'Escalation matrix (immediate / same-day / normal \u00D7 Lark / email / Slack \u00D7 owner & backup)' },
        { id: 'd5', text: 'PII (customer address) handling, storage & disposal rules' }
      ]
    },
    {
      id: 'hv-e',
      letter: 'E',
      title: 'Sign-off',
      items: [
        { id: 'e1', text: 'Outgoing owner signature' },
        { id: 'e2', text: 'Incoming owner signature' },
        { id: 'e3', text: 'Manager approval' }
      ]
    }
  ]
};
