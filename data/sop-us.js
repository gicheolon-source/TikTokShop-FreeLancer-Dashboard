/* [US] TikTok Shop Operation SOP
   Source: https://docs.google.com/document/d/15xuHILHgcCBdvsMVMSqBkhHc3F-LNKAnDDkTmAdnE5Y/edit
   NOTE: Passwords are intentionally NOT stored here. They are distributed
   individually through the password manager. See `accounts[].secret`. */

window.SOP_US = {
  id: 'us',
  flag: '\u{1F1FA}\u{1F1F8}',
  label: 'US Shop',
  escalation: [
    { name: '\uae40\uc138\uc6d0 (Sienna)', role: 'US shop owner', contact: '' },
    { name: '\uc628\uae30\ucca0 (Josh)', role: 'Manager', contact: 'gicheol.on@neosimplix.com' }
  ],
  escalationNote:
    'When escalating any issue or question, always include full context and screenshots so the team can understand the situation and help you faster.',

  accounts: [
    {
      name: 'TTS US Seller Centre',
      id: 'tiktok.us@neosimplix.com',
      url: 'https://seller-us.tiktok.com/homepage?shop_region=US',
      secret: 'password-manager'
    },
    {
      name: 'TTS US Gmail (OTP)',
      id: 'tiktok.us.shop@neosimplix.com',
      url: 'https://mail.google.com/',
      secret: 'password-manager',
      note: 'Receives the OTP code when logging into Seller Centre.'
    },
    {
      name: 'Discord (US community)',
      id: 'tiktok.us@neosimplix.com',
      url: 'https://discord.gg/SY3Zr3hrvz',
      secret: 'password-manager'
    },
    {
      name: 'Amazon Seller Central (MCF)',
      id: 'Personal account \u2014 invite only',
      url: 'https://sellercentral.amazon.com/mcf/orders/create-order/ref=xx_cyo_favb_xx',
      secret: 'invite',
      note: 'A personal account will be created and access granted to you.'
    },
    {
      name: 'Lark',
      id: 'Personal account \u2014 invite only',
      url: '',
      secret: 'invite',
      note: 'Used for the FBT reimbursement report thread.'
    }
  ],

  groups: [
    {
      id: 'us-cs',
      icon: '\u{1F4AC}',
      title: 'Customer Service',
      items: [
        {
          id: 'us-cs-messages',
          title: 'Customer Messages',
          cadence: 'Daily + weekends',
          goal:
            'Help customers with their questions and problems in a kind, clear and helpful way. If you are not sure what to do, check with the Dr.Reju-All team before replying.',
          links: [
            { label: 'Customer message inbox', url: 'https://seller-us.tiktok.com/chat/inbox/current?oec_seller_id=7494631332270867806&shop_region=US&lang=en&from=seller_center_navigation_im' },
            { label: 'TTS US_CS templates', url: 'https://docs.google.com/spreadsheets/d/1x0FhPCYWCfnTnPNTXJlFCbh78ioykJ_FIYF9e2SYgKE/edit?usp=sharing' }
          ],
          blocks: [
            {
              t: 'list',
              title: 'Customer messages usually cover',
              items: ['Delivery problems', 'Product questions', 'Damaged or missing products']
            }
          ]
        },
        {
          id: 'us-cs-delivery',
          title: 'Delivery Issues',
          cadence: 'As needed',
          links: [
            { label: 'Order list', url: 'https://seller-us.tiktok.com/order?shop_region=US' },
            { label: 'Reshipment List tab', url: 'https://docs.google.com/spreadsheets/d/1x0FhPCYWCfnTnPNTXJlFCbh78ioykJ_FIYF9e2SYgKE/edit?gid=1845447772#gid=1845447772' },
            { label: 'Create MCF order (Amazon)', url: 'https://sellercentral.amazon.com/mcf/orders/create-order/ref=xx_cyo_favb_xx' }
          ],
          blocks: [
            {
              t: 'steps',
              items: [
                { text: 'Check the Order ID and current shipping status.' },
                {
                  text: 'If the order was shipped recently:',
                  sub: [
                    'Tell the customer the current shipping status.',
                    'Explain that delivery may be delayed depending on the shipping carrier.',
                    'Ask them to contact us again if it still does not arrive.'
                  ]
                },
                {
                  text:
                    'If there is a delivery issue (tracking error / lost package / taking too long / customer is very unhappy):',
                  sub: [
                    'Apologize to the customer.',
                    'Ask the customer to request a refund first.',
                    'Ask the customer to share or confirm their shipping address.',
                    'Process the reshipment.'
                  ]
                },
                {
                  text: 'Record the reshipment in the Reshipment List tab.',
                  sub: [
                    'Add: Name / Address / Product / Order ID.',
                    'Add a note if there is anything unusual.',
                    'Mark O when the reshipment is delivered.'
                  ]
                },
                {
                  text: 'Create an MCF order for the reshipment.',
                  sub: [
                    'Open Amazon Seller Central \u2192 Create MCF Order tab.',
                    'Enter the shipping info: Full Name / Street Address / City / State / ZIP.',
                    'Go to Add Items and select the correct product.',
                    'Enter the same Order ID you listed in the Reshipment List tab.',
                    'Click Create Order to complete the reshipment.'
                  ]
                },
                { text: 'To check status, go to Manage Orders and search using the Order ID.' }
              ]
            },
            {
              t: 'warn',
              title: 'Product selection cautions',
              items: [
                'Do NOT select products with \u201cList Price\u201d in the product name.',
                'For PDRN Cream, always check the size/version carefully \u2014 PDRN Cream 0.7 vs PDRN Cream Max 2.'
              ]
            }
          ]
        },
        {
          id: 'us-cs-product',
          title: 'Product Issues',
          cadence: 'As needed',
          links: [
            { label: 'Product FAQ tab', url: 'https://docs.google.com/spreadsheets/d/1x0FhPCYWCfnTnPNTXJlFCbh78ioykJ_FIYF9e2SYgKE/edit?gid=479277789#gid=479277789' }
          ],
          blocks: [
            {
              t: 'steps',
              items: [
                { text: 'Reply based on the information in the Product FAQ tab.' },
                {
                  text: 'If the product is damaged or defective:',
                  sub: [
                    'Apologize and ask the customer to submit a refund request.',
                    'Ask the customer to share or confirm their shipping address.',
                    'Process the reshipment.'
                  ]
                },
                {
                  text:
                    'If the customer reports a serious product issue (damaged product / skin irritation or rash / other serious problems caused by the product):',
                  sub: [
                    'Apologize to the customer.',
                    'Process a refund.',
                    'Ask if they are comfortable sharing a photo or video of the issue, and collect it if they agree.',
                    'If they decline, summarize the issue based on the information provided.',
                    'Share the case and all collected information with the Dr.Reju-All team.'
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'us-cs-others',
          title: 'Other Inquiries',
          cadence: 'As needed',
          blocks: [
            {
              t: 'list',
              title: 'Paid collaborations, Spark Codes or affiliate topics arriving in Customer Messages',
              items: ['Ask the creator to contact us through Creator Messages in TikTok Shop instead.']
            }
          ]
        }
      ]
    },

    {
      id: 'us-affiliate',
      icon: '\u{1F91D}',
      title: 'Affiliate Marketing',
      items: [
        {
          id: 'us-aff-messages',
          title: 'Creator Messages',
          cadence: 'Daily + weekends',
          goal:
            'Help creators with their questions and problems in a kind, clear and helpful way. If you are not sure what to do, check with the Dr.Reju-All team before replying.',
          links: [
            { label: 'Creator message inbox', url: 'https://affiliate-us.tiktok.com/seller/im?enter_from=nav_im_entry&shop_region=US&shop_id=7494631332270867806' },
            { label: 'Affiliate CS templates', url: 'https://docs.google.com/spreadsheets/d/1x0FhPCYWCfnTnPNTXJlFCbh78ioykJ_FIYF9e2SYgKE/edit?gid=194864669#gid=194864669' }
          ],
          blocks: [
            {
              t: 'list',
              title: 'Creator messages usually cover',
              items: [
                'Questions about Target Invitation',
                'Spark Code submission and inquiries',
                'Retainer / Paid Collaboration inquiries',
                'Sample delivery issues',
                'Replies to automated messages or broadcast messages sent by the brand'
              ]
            }
          ]
        },
        {
          id: 'us-aff-target',
          title: 'Target Invitation Requests',
          cadence: 'As needed',
          blocks: [
            {
              t: 'steps',
              items: [
                { text: "Check the creator's account." },
                { text: "Review the creator's content, views and total performance." },
                {
                  text: 'Decide whether the creator is worth considering for collaboration.',
                  sub: [
                    'If suitable, summarize the key points and share them with the Dr.Reju-All team.',
                    'If clearly not suitable (regardless of content style, views, etc.), you do not need to share the case.'
                  ]
                },
                { text: 'If the Dr.Reju-All team approves, send the Target Invitation created by the team.' }
              ]
            }
          ]
        },
        {
          id: 'us-aff-spark',
          title: 'Spark Code Submission',
          cadence: 'Daily',
          links: [
            { label: 'Spark Ads Code_chat sheet', url: 'https://docs.google.com/spreadsheets/d/1x0FhPCYWCfnTnPNTXJlFCbh78ioykJ_FIYF9e2SYgKE/edit?gid=1530922245#gid=1530922245' },
            { label: 'Dr.Reju-All US_Spark Ads Code', url: 'https://docs.google.com/spreadsheets/d/1a-lZDgcMeXXRLgM-N85rQqm2KM2_Z6xnPAjEzrY2ZIw/edit?gid=0#gid=0' }
          ],
          blocks: [
            {
              t: 'steps',
              items: [
                { text: 'When a creator shares their Spark Code, add the information to the Spark Ads Code_chat sheet in order.' },
                { text: 'Register the Spark Code following the Spark Code Registration Guide.' },
                { text: 'After registration is completed, mark O in the sheet.' }
              ]
            }
          ]
        },
        {
          id: 'us-aff-retainer',
          title: 'Retainer / Paid Collaboration Inquiries',
          cadence: 'Daily',
          links: [
            { label: 'TTS US_Affiliate management', url: 'https://docs.google.com/spreadsheets/d/1LSGozbBhiQ4iNyvf7ZP4du0jV9J7KAyn/edit?gid=2107454662#gid=2107454662' }
          ],
          blocks: [
            {
              t: 'steps',
              items: [
                { text: "Review the creator's content, views and sales performance." },
                {
                  text: 'If there is potential for collaboration, add the proposal to the Retainer Inquiries sheet.',
                  sub: [
                    'If any required information is missing, ask the creator for the details.',
                    'After collecting the information, let the creator know the proposal will be shared with the relevant team.'
                  ]
                }
              ]
            },
            {
              t: 'p',
              title: 'Also check email daily',
              text:
                'Check emails for retainer inquiries, review them and add the details to the same Retainer Inquiries sheet. The goal is to organize incoming inquiries clearly so they can be easily reviewed and evaluated.'
            }
          ]
        },
        {
          id: 'us-aff-sample-delivery',
          title: 'Sample Delivery Issues',
          cadence: 'As needed',
          links: [
            { label: 'Sample requests page', url: 'https://affiliate-us.tiktok.com/affiliate/sample/sample-request?shop_region=US&shop_id=7494631332270867806&route_migration=1' },
            { label: 'FBT Issue tab', url: 'https://docs.google.com/spreadsheets/d/1x0FhPCYWCfnTnPNTXJlFCbh78ioykJ_FIYF9e2SYgKE/edit?gid=1897823692#gid=1897823692' }
          ],
          blocks: [
            {
              t: 'steps',
              items: [
                { text: "Check the creator's sample request status first (missing, incorrect or damaged samples)." },
                {
                  text: 'Check whether the sample request was canceled.',
                  sub: [
                    'Already canceled \u2192 proceed with the reshipment.',
                    'Not canceled \u2192 ask the creator to cancel the sample request, or to request a refund due to the delivery issue.'
                  ]
                },
                {
                  text: 'Record FBT issue cases.',
                  sub: [
                    'Add sample cancellations caused by delivery issues to the FBT Issue tab.',
                    'If the cancellation cannot be confirmed, take a screenshot and save it for the Lark report.'
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'us-aff-broadcast',
          title: 'Replies to Automated / Broadcast Messages',
          cadence: 'Daily',
          blocks: [
            {
              t: 'list',
              items: [
                'Read the full message and understand what the creator is responding to.',
                'Reply based on the situation and the original message sent by the brand.'
              ]
            }
          ]
        },
        {
          id: 'us-aff-samples',
          title: 'Review Sample Requests',
          cadence: 'Daily + weekends',
          goal:
            'Review and approve as many good creators who are a good fit for our brand as possible.',
          links: [
            { label: 'Sample requests page', url: 'https://affiliate-us.tiktok.com/affiliate/sample/sample-request?shop_region=US&shop_id=7494631332270867806&route_migration=1' }
          ],
          blocks: [
            {
              t: 'steps',
              items: [
                {
                  text: 'Apply filters and review creators in this order:',
                  sub: [
                    'First: Beauty & Personal Care category + Follower Gender: Women 50%+',
                    'Second: No category filter + Follower Gender: Women 50%+',
                    'Third: No category filter + Sort by GMV',
                    'If you find a more efficient way to review the requests, feel free to use it.'
                  ]
                },
                {
                  text: 'Approve based on the criteria below, then select Approve or Discard.',
                  sub: [
                    'If you select Discard, choose \u201cOthers\u201d as the reason.',
                    'These are general guidelines \u2014 you can also open the creator profile and approve if you think they are a good fit.'
                  ]
                },
                {
                  text: 'If you see \u201cNot Authorized\u201d:',
                  sub: [
                    'Click Not Authorized to check the details.',
                    "Review the creator's information and decide whether to approve the sample request."
                  ]
                }
              ]
            },
            {
              t: 'criteria',
              title: 'US approval criteria',
              items: [
                { label: 'Sample Score', value: '50+' },
                { label: '30-Day GMV', value: '$120+' },
                { label: 'Items Sold', value: '10+' }
              ]
            }
          ]
        }
      ]
    },

    {
      id: 'us-community',
      icon: '\u{1F465}',
      title: 'Community Management',
      items: [
        {
          id: 'us-discord',
          title: 'Discord Verification & Community Replies',
          cadence: 'Daily + weekends',
          goal:
            'Verify member information and assign the correct roles to maintain a safe and healthy community.',
          links: [
            { label: 'Discord Verification Form (responses)', url: 'https://docs.google.com/spreadsheets/d/1AXWOkgn-txvpxnUA8Ff0behsS5aNalHUIHg486geUek/edit?resourcekey=&gid=157956208#gid=157956208' },
            { label: 'Username / User ID guide', url: 'https://broadleaf-wolverine-de2.notion.site/Dr-Reju-All-Discord-Guide-Username-User-ID-35f2f51e3c0180dab86ac6940de1abb5' },
            { label: 'Discord server', url: 'https://discord.gg/SY3Zr3hrvz' }
          ],
          blocks: [
            {
              t: 'steps',
              items: [
                { text: 'Check new applications in the Discord Verification Sheet.' },
                { text: 'Review the information submitted by each applicant.' },
                {
                  text: 'Check the country and assign the correct roles.',
                  sub: ['Assign the country role: US / UK / Other Countries.', 'Also assign the Dr.Reju-All Member role.']
                },
                {
                  text: 'Check the TikTok handle.',
                  sub: [
                    'Approve if the TikTok handle matches either the Discord Username or Display Name.',
                    'Double-check that the handle also matches the TikTok profile link.'
                  ]
                },
                {
                  text: 'Check the User ID.',
                  sub: ['If the User ID is missing, find it and add it to the sheet.', 'Refer to the Username / User ID guide.']
                },
                {
                  text: 'Mark applicants by status.',
                  sub: [
                    'Highlight unapproved applicants in red and mark them as checked.',
                    'Highlight applicants that need further review in yellow.'
                  ]
                },
                { text: 'Check new posts and messages in the community and respond as needed, similar to handling CS inquiries.' }
              ]
            }
          ]
        }
      ]
    },

    {
      id: 'us-others',
      icon: '\u{1F4CB}',
      title: 'Others',
      items: [
        {
          id: 'us-fbt-report',
          title: 'FBT Reimbursement Report',
          cadence: 'Daily',
          goal:
            'Receive reimbursement for orders that were refunded and reshipped due to FBT issues.',
          links: [
            { label: 'FBT Issue tab', url: 'https://docs.google.com/spreadsheets/d/1x0FhPCYWCfnTnPNTXJlFCbh78ioykJ_FIYF9e2SYgKE/edit?gid=1897823692#gid=1897823692' },
            { label: 'Lark report instructions', url: 'https://applink.larksuite.com/client/message/link/open?token=AmpeqrgZQA21aocheF0ADbQ%3D' }
          ],
          blocks: [
            {
              t: 'steps',
              items: [
                {
                  text: 'List FBT issue cases in the FBT Issue tab.',
                  sub: [
                    'List all cases where the customer requested a refund and we sent a replacement.',
                    'Add: Order ID / Issue / Date / Status / Final Result.',
                    'Keep the status updated until the case is completed.'
                  ]
                },
                {
                  text: 'Report the cases in Lark.',
                  sub: [
                    'Follow the instructions shared in the Lark chat room.',
                    'Always tag Sienna in the report thread.'
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'us-reviews',
          title: 'Negative Review Management',
          cadence: 'Daily + weekends',
          links: [
            { label: 'Product ratings', url: 'https://seller-us.tiktok.com/product/rating?shop_region=US' },
            { label: 'Negative review tracking sheet', url: 'https://docs.google.com/spreadsheets/d/1x0FhPCYWCfnTnPNTXJlFCbh78ioykJ_FIYF9e2SYgKE/edit?gid=415510572#gid=415510572' },
            { label: 'Follow-up message templates', url: 'https://docs.google.com/spreadsheets/d/1x0FhPCYWCfnTnPNTXJlFCbh78ioykJ_FIYF9e2SYgKE/edit?gid=1730261795#gid=1730261795' }
          ],
          blocks: [
            {
              t: 'steps',
              items: [
                { text: 'List all 1\u20132 star negative reviews in the tracking sheet.' },
                {
                  text: 'Send follow-up messages through Customer Message to encourage the customer to update their review.',
                  sub: [
                    '1st message: offer a refund.',
                    '2nd message: ask if they would consider updating their review.',
                    '3rd message: send a reminder.'
                  ]
                },
                {
                  text: 'Close the loop.',
                  sub: [
                    'If the customer responds negatively, proceed with the refund only.',
                    'If there is no response, move on to the next case.'
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};
