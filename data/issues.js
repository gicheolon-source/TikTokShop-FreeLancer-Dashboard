/* Critical issues escalated to HQ.
   Source: "PICKDI X Neosimplix Shopee Working Sheet" > "Issues" tab.
   Use this when an inquiry arrives outside HQ working hours (weekend, public
   holiday) and CS cannot resolve it: tell the customer it is being checked with
   the relevant team, log the case here in as much detail as possible, and HQ
   fills in "Reply to customer" once they are back in the office.
   These rows are the history carried over from the sheet. Cases logged in the
   dashboard are stored in Firestore (`fl_issues`) and merged on top of them. */

window.ISSUE_SEED = [
  {
    id: "s20260702-cholemong",
    date: "2026-07-02",
    country: "SG",
    buyer: "cholemong",
    order: "260702MD80BWA4",
    issue: "The customer has made multiple purchases before, but this time they were unable to apply a promotional code. They initially requested a cancellation but then changed their mind and accepted the delivery as usual. I have offered them a voucher for their next order.",
    reply: "First of all, regarding the special discount voucher mentioned previously, we have confirmed internally that we are unfortunately unable to provide this voucher. We sincerely apologize for the confusion caused by the previous information.\nAs mentioned earlier, the livestream giveaway prizes are prepared and managed separately, so we are unable to change the giveaway prize to a specific product such as PD3 or EP2. We kindly ask for your understanding.\nWe are currently verifying the list of Maybeline livestream giveaway winners. Once the verification is complete, the giveaway redemption vouchers will be sent out sequentially next week. You will be able to redeem your giveaway prize free of charge using the voucher.\nWe sincerely apologize for the inconvenience, and we kindly ask for your patience. We will update you again once the verification has been completed. Thank you for your understanding and support. 💙",
    status: "answered"
  },
  {
    id: "s20260703-urboieuan",
    date: "2026-07-03",
    country: "SG",
    buyer: "urboieuan",
    order: "260702KMHAD913",
    issue: "Cancelled Order Shipped Out\n# 260702KMHAD913: Customer cancelled their order, but the package was unfortunately still shipped out. Awaiting confirmation from Team.",
    handler: "Response completed",
    reply: "You may respond to the customer as follows:\nOnce the order has been shipped, it is no longer possible to cancel it. In this case, the customer will most likely need to request a refund/return instead.\nSince the overall shipping and return process is handled by Shopee, please first contact Shopee to confirm whether the order is eligible for a refund/return under Shopee’s policy.\nIf Shopee confirms that the order is eligible for a refund/return, please follow the instructions and process provided by Shopee. Thank you!",
    status: "answered"
  },
  {
    id: "s20260705-clarissach",
    date: "2026-07-05",
    country: "SG",
    buyer: "clarissachiam73",
    order: "260701HUA21G9P",
    issue: "Missing gift",
    reply: "I've already asked for the photo of the package when they received it. But have no response. The customer has sent photo of the items they received and it's shown that free gift included in their order was missed.\n\nPlease sincerely apologize to the customer for the missing free gift and let them know that we would like to provide a 10% voucher as compensation.",
    status: "answered"
  },
  {
    id: "s20260706-chunhu1996",
    date: "2026-07-06",
    country: "TW",
    buyer: "chunhu1996",
    issue: "請問防曬上市了嗎 (When will the sunscreen be launched on TW market?",
    status: "open"
  },
  {
    id: "s20260707-kellygo292",
    date: "2026-07-07",
    country: "TW",
    buyer: "kellygo292",
    order: "260618DMP944QA",
    issue: "我已經購買退貨退款都不用和客戶詢問嗎",
    reply: "I've informed the customer to waiting until we reconfirm this case with our team.",
    status: "answered"
  },
  {
    id: "s20260707-pinkoko24",
    date: "2026-07-07",
    country: "SG",
    buyer: "pinkoko24",
    order: "260702M9TFK810",
    issue: "The order number is 260702M9TFK810. There is no mention of what gift that I will receive. I only know that it’s a full size item",
    handler: "대답 완료 - lynn",
    reply: "The voucher for redeeming the prize has not yet been distributed to the winners of the Maybeline livestream. It is scheduled to be sent out sometime this week.\nPlease note that for our livestream giveaways, we do not ship the prize products directly. Instead, winners receive a voucher or voucher code that can be used to redeem the prize.\nOnce all giveaway vouchers have been distributed, I will post a separate notification in the PICDI channel.\nIn the meantime, please inform the customer that the livestream prize will be provided in the form of a voucher, and that the winners are currently being verified. The vouchers will be distributed to the selected winners sequentially within this week.",
    status: "answered"
  },
  {
    id: "s20260707-o0haoi50e1",
    date: "2026-07-07",
    country: "TW",
    buyer: "o0haoi50e1",
    order: "2607073TTUX7SA",
    issue: "是我看到$1179價格下單後，結帳頁面卻直接跳為現在已結帳的$1380價格！\n甚至現在你們沒有促銷時價格為$1329！",
    handler: "대답 완료 - lynn",
    status: "checking"
  },
  {
    id: "s20260708-marilynchi",
    date: "2026-07-08",
    country: "SG",
    buyer: "marilynchia93",
    order: "2607073WW1D0EC",
    issue: "Issue: The customer applied for a cancellation, and it was approved. However, they did not receive their refund, and the package was still shipped out to them anyway. Because the system marks the order as canceled, she cannot press the \"Return\" button on her end.\nCurrent status: The customer has received the item but is stuck on how to return it and get their money back.",
    handler: "Completed checking.",
    status: "checking"
  },
  {
    id: "s20260716-chelestc",
    date: "2026-07-16",
    country: "MY",
    buyer: "chelestc",
    order: "260715QS121TX3",
    issue: "Issue: Wrong item (Customer has already request for return & refund). I checked the photo that customer sent to us, it's appeared that the worng product was strange somehow. Please help me to verify this case and I will get back to customer asap! Thank you",
    handler: "Yumi",
    status: "checking"
  },
  {
    id: "s20260716-cathy6745",
    date: "2026-07-16",
    country: "TW",
    buyer: "cathy6745",
    order: "260705SKKN527C",
    issue: "Issue: Cancel by shopee with no reason",
    handler: "Yumi",
    status: "checking"
  },
  {
    id: "s20260722-king610168",
    date: "2026-07-22",
    country: "TW",
    buyer: "king610168",
    issue: "Payment Request: The customer requested to have the Cash on Delivery (COD) payment option available.\nQR Code Verification Issue: Upon scanning the QR code on the product, the customer was directed to a webpage that asked them to provide/verify personal identity details (e.g., Passport, National ID/CCCD).",
    status: "open"
  },
  {
    id: "s20260727-yancichen7",
    date: "2026-07-27",
    country: "TW",
    buyer: "yancichen759",
    order: "260722C42P7J1C",
    issue: "Missing product: The customer purchased the order but one of the PD2 serum was missing. The customer sent photo of the items they have received.",
    handler: "Yumi / Done - Lynn",
    reply: "Please apologize for the inconvenience and let the customer know that we will provide a voucher equivalent to the value of the missing Copper Peptide Serum. Kindly ask them to place a new order using the voucher.\n\nDRREDKCJD\nvaild: ~ 8/7\n\nThank you so much! -Yumi",
    status: "answered"
  },
  {
    id: "s20260816-jillchen30",
    date: "2026-08-16",
    country: "MY",
    buyer: "jillchen3023",
    order: "260815CJG8S6T1",
    issue: "Wrong product sent (From FBS order)",
    handler: "Yumi",
    status: "checking"
  },
  {
    id: "s20260823-lilylyly20",
    date: "2026-08-23",
    country: "SG",
    buyer: "lilylyly2021",
    order: "2607315M94FX2W",
    issue: "The tube packaging is breaking apart. The customer required a new one send to them since the tip can not be used anymore. Please help me to review this case as soon as your convenience. \n\nI've checked this order, it's shown that the order was delivered by 08.08.2026 (please consider this case since the delivery time was confirmed quite far from now)",
    handler: "Yumi",
    status: "checking"
  }
];
