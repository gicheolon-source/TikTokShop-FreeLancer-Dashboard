/* Recurring task definitions, derived from the US/UK Operation SOPs.
   `sop` links each task back to the matching SOP section id so the
   checklist and the SOP browser stay connected. */

window.TASKS = {
  us: [
    // --- Daily ---
    { id: 'us-t-cs', freq: 'daily', group: 'Customer Service', title: 'Answer customer messages', sop: 'us-cs-messages', weekend: true,
      url: 'https://seller-us.tiktok.com/chat/inbox/current?oec_seller_id=7494631332270867806&shop_region=US&lang=en&from=seller_center_navigation_im' },
    { id: 'us-t-creator', freq: 'daily', group: 'Affiliate', title: 'Answer creator messages', sop: 'us-aff-messages', weekend: true,
      url: 'https://affiliate-us.tiktok.com/seller/im?enter_from=nav_im_entry&shop_region=US&shop_id=7494631332270867806' },
    { id: 'us-t-samples', freq: 'daily', group: 'Affiliate', title: 'Review sample requests', sop: 'us-aff-samples', weekend: true,
      url: 'https://affiliate-us.tiktok.com/affiliate/sample/sample-request?shop_region=US&shop_id=7494631332270867806&route_migration=1' },
    { id: 'us-t-spark', freq: 'daily', group: 'Affiliate', title: 'Register new Spark Codes', sop: 'us-aff-spark',
      url: 'https://docs.google.com/spreadsheets/d/1a-lZDgcMeXXRLgM-N85rQqm2KM2_Z6xnPAjEzrY2ZIw/edit?gid=0#gid=0' },
    { id: 'us-t-retainer', freq: 'daily', group: 'Affiliate', title: 'Check & list retainer inquiries from email', sop: 'us-aff-retainer',
      url: 'https://docs.google.com/spreadsheets/d/1LSGozbBhiQ4iNyvf7ZP4du0jV9J7KAyn/edit?gid=2107454662#gid=2107454662' },
    { id: 'us-t-discord', freq: 'daily', group: 'Community', title: 'Discord verification & community replies', sop: 'us-discord', weekend: true,
      url: 'https://docs.google.com/spreadsheets/d/1AXWOkgn-txvpxnUA8Ff0behsS5aNalHUIHg486geUek/edit?resourcekey=&gid=157956208#gid=157956208' },
    { id: 'us-t-reviews', freq: 'daily', group: 'Others', title: 'Negative review management (1\u20132 star)', sop: 'us-reviews', weekend: true,
      url: 'https://seller-us.tiktok.com/product/rating?shop_region=US' },
    { id: 'us-t-fbt', freq: 'daily', group: 'Others', title: 'Log FBT issue cases', sop: 'us-fbt-report',
      url: 'https://docs.google.com/spreadsheets/d/1x0FhPCYWCfnTnPNTXJlFCbh78ioykJ_FIYF9e2SYgKE/edit?gid=1897823692#gid=1897823692' },

    // --- Weekly ---
    { id: 'us-t-fbt-report', freq: 'weekly', group: 'Others', title: 'FBT reimbursement report in Lark (tag Sienna)', sop: 'us-fbt-report',
      url: 'https://applink.larksuite.com/client/message/link/open?token=AmpeqrgZQA21aocheF0ADbQ%3D' },
    { id: 'us-t-retainer-org', freq: 'weekly', group: 'Affiliate', title: 'Organize & summarize retainer inquiries', sop: 'us-aff-retainer' },

    // --- As needed ---
    { id: 'us-t-mcf', freq: 'as-needed', group: 'Customer Service', title: 'Create MCF order for reshipment', sop: 'us-cs-delivery',
      url: 'https://sellercentral.amazon.com/mcf/orders/create-order/ref=xx_cyo_favb_xx' },
    { id: 'us-t-product-issue', freq: 'as-needed', group: 'Customer Service', title: 'Handle damaged / defective product case', sop: 'us-cs-product' },
    { id: 'us-t-target', freq: 'as-needed', group: 'Affiliate', title: 'Review & send target invitations', sop: 'us-aff-target' },
    { id: 'us-t-sample-delivery', freq: 'as-needed', group: 'Affiliate', title: 'Handle sample delivery issue', sop: 'us-aff-sample-delivery' }
  ],

  uk: [
    // --- Daily ---
    { id: 'uk-t-cs', freq: 'daily', group: 'Customer Service', title: 'Answer customer messages (24hr response = 100%)', sop: 'uk-cs-messages',
      url: 'https://seller-uk.tiktok.com/homepage?shop_region=GB' },
    { id: 'uk-t-ratings', freq: 'daily', group: 'Customer Service', title: 'Manage product ratings \u2014 negatives first', sop: 'uk-cs-ratings',
      url: 'https://seller-uk.tiktok.com/homepage?shop_region=GB' },
    { id: 'uk-t-refunds', freq: 'daily', group: 'Customer Service', title: 'Review refund & return requests', sop: 'uk-cs-refunds',
      url: 'https://seller-uk.tiktok.com/homepage?shop_region=GB' },
    { id: 'uk-t-affmsg', freq: 'daily', group: 'Affiliate', title: 'Answer affiliate / creator messages', sop: 'uk-aff-messages' },
    { id: 'uk-t-samples', freq: 'daily', group: 'Affiliate', title: 'Review sample requests', sop: 'uk-aff-samples' },
    { id: 'uk-t-dm', freq: 'daily', group: 'Others', title: 'Reply to @rejuall_uk_official DMs', sop: 'uk-dm',
      url: 'https://www.tiktok.com/@rejuall_uk_official' },

    // --- Weekly ---
    { id: 'uk-t-fbt-check', freq: 'weekly', group: 'Customer Service', title: 'Check FBT reimbursement status & submit missing tickets', sop: 'uk-cs-fbt',
      url: 'https://uk.pipak.com/home' },

    // --- As needed ---
    { id: 'uk-t-mcf', freq: 'as-needed', group: 'Customer Service', title: 'Create MCF order for reshipment', sop: 'uk-cs-mcf',
      url: 'https://sellercentral.amazon.co.uk/mcf/orders/create-order/ref=xx_cyo_favb_xx' },
    { id: 'uk-t-fbt-ticket', freq: 'as-needed', group: 'Customer Service', title: 'Submit FBT ticket', sop: 'uk-cs-fbt',
      url: 'https://uk.pipak.com/home' },
    { id: 'uk-t-target', freq: 'as-needed', group: 'Affiliate', title: 'Send target invites', sop: 'uk-aff-target' },
    { id: 'uk-t-spark', freq: 'as-needed', group: 'Affiliate', title: 'Log Spark Ads Codes', sop: 'uk-aff-spark',
      url: 'https://pjph503ni774.jp.larksuite.com/wiki/Lv6sw2ohtiGdU9kg25qjS6VdpEt?from=from_parent_docx' },
    { id: 'uk-t-retainer', freq: 'as-needed', group: 'Affiliate', title: 'Route retainer / paid collab inquiries', sop: 'uk-aff-retainer',
      url: 'https://creators.euka.ai/retainers/3461' },
    { id: 'uk-t-sample-delivery', freq: 'as-needed', group: 'Affiliate', title: 'Handle sample delivery issue', sop: 'uk-aff-delivery' }
  ]
};

window.FREQ_META = {
  daily: { label: 'Daily', icon: '\u2600\uFE0F', color: '#2563EB' },
  weekly: { label: 'Weekly', icon: '\u{1F4C5}', color: '#7C3AED' },
  'as-needed': { label: 'As needed', icon: '\u26A1', color: '#F59E0B' }
};
