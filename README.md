# Dr.Reju-All — TikTok Shop Operations Dashboard

An onboarding + daily operations dashboard for TikTok Shop freelancers and part-timers
working the **US** and **UK** shops.

It turns three internal Google Docs into a single working surface:

| Source doc | Where it lives in the app |
| --- | --- |
| [TikTok Shop Operations Handover Checklist (US/UK)](https://docs.google.com/document/d/1nsGuACpe_Kxn_TrNHy1gw0Rsrey2uZRZOQfvP2Usoy8/edit) | **Handover** |
| [\[US\] TikTok Shop Operation SOP](https://docs.google.com/document/d/15xuHILHgcCBdvsMVMSqBkhHc3F-LNKAnDDkTmAdnE5Y/edit) | **SOP** · **Checklist** · **Quick Links** |
| [\[UK\] TikTok Shop Operation SOP](https://docs.google.com/document/d/1UnarBU7HmyvMofokNjIUAmpeomtM1buBXxq66dev97s/edit) | **SOP** · **Checklist** · **Quick Links** |

## Sections

- **Today** — today's daily routine with a completion ring, plus who to escalate to.
- **Checklist** — Daily / Weekly / As-needed tasks with date and week navigation. Progress is saved per person, per shop, per day.
- **SOP** — the full US/UK SOP as a searchable, expandable browser. Message templates have a one-click Copy button.
- **Quick Links** — every seller centre, affiliate centre, MCF, FBT and Google Sheet in one place.
- **Handover** — the A–E handover checklist as a fillable, shared form.
- **Reference** — account list, glossary (FBT / MCF / Spark / GMV / Sample Score / EUKA…) and compliance + PII guardrails.

## Security

**No passwords are stored in this repository or in the dashboard.**

The original SOP Google Docs contain plaintext credentials. Those were deliberately
left out. The dashboard only lists the account name, the login ID and the console URL,
and marks each account as `password manager` or `invite only`.

Action items for the team:

1. Move every credential in the source docs into 1Password / Bitwarden and remove them from the docs.
2. Rotate the passwords that were exposed in plaintext.
3. Grant freelancers access per-account, and revoke on offboarding (see Handover section A).

## Access control

Freelancers do **not** have a company Google account, so the primary login is a shared
ID / password. Team members can still use Google sign-in. Both live at the top of
[`assets/app.js`](assets/app.js):

```js
const ACCOUNTS = [
  { id: 'rejuall-fulltime', pw: '...', name: 'Full-time', role: 'Full-time operator' },
  { id: 'rejuall-parttime', pw: '...', name: 'Part-time', role: 'Part-time operator' }
];
const ALLOWED_DOMAINS = ['neosimplix.com'];   // Google sign-in
const ALLOWED_EMAILS  = [];
```

- Each account has its own progress namespace, so full-time and part-time checklists do
  not collide. People sharing one account share one checklist.
- The login is remembered on the device (`localStorage.fl_account`) until **Sign out**.
- To rotate: change `pw` in `ACCOUNTS`, commit, and tell the freelancers the new password.
- **Offline mode** stores progress in `localStorage` only, with no cloud sync.

> ⚠️ These credentials ship to the browser, so anyone who can load the page can read
> them. Treat this as a "keep it tidy" gate, not real security:
> 1. Keep this repository **private**, or host it behind Vercel password protection.
> 2. Add Firestore security rules before onboarding external freelancers — the `tts_kv`
>    collection currently accepts unauthenticated writes.
> 3. Never put shop credentials in `data/*.js`; the dashboard only links to consoles.

## Storage

Progress syncs to Firestore (`tts_kv` collection) when signed in, and always falls back
to `localStorage`.

| Data | Document key |
| --- | --- |
| Daily checklist | `fl_<user>_daily_<shop>_<YYYY-MM-DD>` |
| Weekly checklist | `fl_<user>_weekly_<shop>_<monday>` |
| Handover record | `fl_handover_<shop>` (shared across the team) |

## Running locally

No build step. Serve the folder with any static server:

```bash
npx serve .
# or
python -m http.server 8080
```

## Editing content

All operational content is data, not markup — edit these and the UI updates:

```
data/sop-us.js      US SOP sections, accounts, escalation
data/sop-uk.js      UK SOP sections, accounts, escalation, KPIs
data/tasks.js       recurring task definitions (daily / weekly / as-needed)
data/handover.js    handover checklist A–E
data/reference.js   quick links, glossary, compliance rules
```

When a source Google Doc changes, update the matching `data/*.js` file so the dashboard
stays the single source of truth for the freelancer.
