/* Critical issues escalated to HQ.
   Use this when an inquiry arrives outside HQ working hours (weekend, public
   holiday) and CS cannot resolve it: tell the customer it is being checked with
   the relevant team, log the case here in as much detail as possible, and HQ
   fills in "Reply to customer" once they are back in the office.

   The list starts empty on purpose -- the history that used to sit in the
   "Issues" tab of the Shopee working sheet was cleared, so everything on the
   page is a case the team logged here. Live cases are stored in Firestore
   (`fl_issues`) and merged on top of this seed. */

window.ISSUE_SEED = [];
