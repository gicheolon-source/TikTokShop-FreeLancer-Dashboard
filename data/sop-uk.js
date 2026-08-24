/* [UK] TikTok Shop Operation SOP
   Source: https://docs.google.com/document/d/1UnarBU7HmyvMofokNjIUAmpeomtM1buBXxq66dev97s/edit
   NOTE: Passwords are intentionally NOT stored here. They are distributed
   individually through the password manager. See `accounts[].secret`. */

window.SOP_UK = {
  id: 'uk',
  flag: '\u{1F1EC}\u{1F1E7}',
  label: 'UK Shop',
  escalation: [
    { name: '\uc655\uc9c0\uc724 (June)', role: 'UK shop owner', contact: 'jiyoon.wang@neosimplix.com' },
    { name: '\uc628\uae30\ucca0 (Josh)', role: 'Manager', contact: 'gicheol.on@neosimplix.com' }
  ],
  escalationNote:
    'When escalating any issue or question related to your tasks, please make sure to provide all relevant context and screenshots so we can fully understand the situation and assist you more effectively.',

  kpis: [
    { label: '24hr response rate', target: '100%' },
    { label: 'Chat satisfaction rate', target: '100%' }
  ],

  accounts: [
    {
      name: 'TTS UK Seller Centre',
      id: 'tiktok.uk@neosimplix.com',
      url: 'https://seller-uk.tiktok.com/homepage?shop_region=GB',
      secret: 'password-manager'
    },
    {
      name: 'Gmail (OTP for Seller Centre)',
      id: 'tiktok.uk@neosimplix.com',
      url: 'https://mail.google.com/',
      secret: 'password-manager',
      note: 'Receives the OTP code when logging into Seller Centre.'
    },
    {
      name: 'Amazon Seller Central UK (MCF)',
      id: 'Personal account \u2014 invite only',
      url: 'https://sellercentral.amazon.co.uk/mcf/orders/create-order/ref=xx_cyo_favb_xx',
      secret: 'invite',
      note: 'Used for creating MCF orders for reshipments. Access is granted to your personal email.'
    },
    {
      name: 'FBT Seller Centre (pipak)',
      id: 'tiktok.uk@neosimplix.com',
      url: 'https://uk.pipak.com/home',
      secret: 'password-manager',
      note: 'Used for creating FBT tickets for reimbursement.'
    }
  ],

  groups: [
    {
      id: 'uk-cs',
      icon: '\u{1F4AC}',
      title: 'Customer Service',
      items: [
        {
          id: 'uk-cs-messages',
          title: 'Customer Messages',
          cadence: 'Daily',
          goal:
            '24hr response rate and customer satisfaction have a huge impact on our shop health. Respond to inquiries with both KPI goals in mind.',
          links: [
            { label: 'TTS UK Seller Centre', url: 'https://seller-uk.tiktok.com/homepage?shop_region=GB' },
            { label: 'TTS UK_CS templates', url: 'https://docs.google.com/spreadsheets/d/1_ptIbdwbET34bBxP0ih2vcF_Am00xZxMkosPInq8FwA/edit?usp=sharing' }
          ],
          blocks: [
            {
              t: 'criteria',
              title: 'KPI targets',
              items: [
                { label: '24hr response rate', value: '100%' },
                { label: 'Chat satisfaction rate', value: '100%' }
              ]
            },
            {
              t: 'list',
              title: 'Template tabs to use',
              items: ['Customer Service_Template', 'Products FAQ']
            },
            {
              t: 'list',
              title: 'How to work the inbox',
              items: [
                'You can check the daily 24hr response rate and chat satisfaction rate in the top bar.',
                "Always check the customer's order details before responding. Order details appear on the right side of the page.",
                'Click the Order ID to open the order details page, where you can check order history and logistics information.'
              ]
            }
          ]
        },
        {
          id: 'uk-cs-mcf',
          title: 'Create MCF Orders for Reshipment',
          cadence: 'As needed',
          links: [
            { label: 'Create MCF order (Amazon UK)', url: 'https://sellercentral.amazon.co.uk/mcf/orders/create-order/ref=xx_cyo_favb_xx' },
            { label: 'UK_MCF Reshipment Sheet', url: 'https://docs.google.com/spreadsheets/d/1_ptIbdwbET34bBxP0ih2vcF_Am00xZxMkosPInq8FwA/edit?usp=sharing' }
          ],
          blocks: [
            {
              t: 'steps',
              items: [
                {
                  text: 'For customers who want a replacement rather than a refund, create an MCF order on Amazon.',
                  sub: [
                    'Ask the customer for their shipping details first \u2014 we cannot see their address on our end because all orders are shipped by TikTok.'
                  ]
                },
                {
                  text: 'Fill out the MCF order.',
                  sub: [
                    'Fill out all shipping details and choose the correct items.',
                    'Order ID format: TTS CS Sample_##',
                    'Shipping speed: Standard.',
                    'Click Create Order.'
                  ]
                },
                {
                  text: 'Track and share.',
                  sub: [
                    'Find the order on the Manage Orders page and click the order ID to check the tracking number or status.',
                    'Once the tracking number becomes available, share it with the customer.'
                  ]
                },
                {
                  text: 'Log the case in the UK_MCF Reshipment Sheet and tick the checkbox.',
                  sub: [
                    'Username, Address, Product, TTS Order ID, MCF Order ID, Tracking number, reason for reshipment, etc.'
                  ]
                }
              ]
            }
          ]
        },
        {
          id: 'uk-cs-ratings',
          title: 'Managing Product Ratings',
          cadence: 'Daily',
          goal:
            'Maintaining a high product rating is essential for overall Shop Health and successful participation in the Affiliate Program.',
          links: [
            { label: 'Negative Reviews_Template', url: 'https://docs.google.com/spreadsheets/d/1_ptIbdwbET34bBxP0ih2vcF_Am00xZxMkosPInq8FwA/edit?gid=1730261795#gid=1730261795' },
            { label: 'Positive Reviews_Template', url: 'https://docs.google.com/spreadsheets/d/1_ptIbdwbET34bBxP0ih2vcF_Am00xZxMkosPInq8FwA/edit?gid=1730261795#gid=1730261795' }
          ],
          blocks: [
            {
              t: 'warn',
              title: 'Priority',
              items: [
                'Top priority: check for any new negative reviews and respond to them promptly.',
                'Neutral / positive reviews: respond whenever you have spare time throughout the day or between other tasks.'
              ]
            },
            {
              t: 'p',
              text: 'Go to Seller Centre \u2192 Products \u2192 Product ratings, then comment based on the templates.'
            },
            {
              t: 'list',
              title: '1\u20132 star (negative)',
              items: [
                'Reply to the review first.',
                'Then contact the customer via Customer Messages and send the First Message from the template table below.'
              ]
            },
            {
              t: 'templates',
              title: 'CS message templates after replying to reviews',
              items: [
                {
                  label: 'First Message',
                  text:
                    "Hi there! Thank you so much for taking the time to share your honest experience. We're truly sorry to hear that our product didn't meet your expectations. We take your feedback seriously and will do our best to improve our products. Could you please share more details about your experience with the product? We'd love to better understand what happened. Please let us know if there's anything we can do to help."
                },
                {
                  label: 'Second Message',
                  text:
                    "Thank you so much for sharing your feedback with us. We're so sorry to hear that you were disappointed with [the product / the product's performance / what customers said]. We'll make sure to pass your feedback along to our internal team as we continue working to improve our products. In the meantime, if you'd prefer a refund, we'd be more than happy to arrange it for you."
                },
                {
                  label: 'After Refund',
                  text:
                    'Thank you so much for getting back to us. As promised, we have just issued your full refund. We sincerely hope to have the opportunity to serve you again with improved products. Your honest feedback is truly appreciated and helps us continue to improve. If your overall experience with our brand has changed, we would kindly appreciate it if you would consider updating your review. Of course, there is absolutely no obligation to do so, and we fully respect your decision either way. Thank you again for giving us the opportunity to make things right.'
                },
                {
                  label: 'Follow-up if No Response',
                  text:
                    "Hi [Customer Name], we just wanted to gently follow up on our previous message. We completely understand that you may be busy, and there's absolutely no pressure to respond. We simply want to make sure we've done everything we can to help. If you'd like a refund or would like to discuss any other resolution, we're still here and happy to help whenever you're ready. Thank you again for your time and for giving us the opportunity to make things right."
                }
              ]
            },
            {
              t: 'list',
              title: '3 star (neutral)',
              items: [
                'Express appropriate appreciation and a light apology for any inconvenience or areas where the customer may have been dissatisfied.'
              ]
            },
            {
              t: 'list',
              title: '4\u20135 star (positive)',
              items: ['Use the Positive Reviews_Template sheet.']
            }
          ]
        },
        {
          id: 'uk-cs-refunds',
          title: 'Review Refund & Return Requests',
          cadence: 'Daily',
          goal:
            'Prevent negative CS outcomes and maintain a healthy Negative Review Rate and overall Shop Health by reviewing refund and return requests every day.',
          blocks: [
            {
              t: 'p',
              text:
                'The Refund & Return Requests page is divided into two sections: (1) Awaiting TikTok Shop / Customer Action and (2) Awaiting Your Action.'
            },
            {
              t: 'list',
              title: '1. Awaiting TikTok Shop / Customer Action',
              items: [
                'Orders where the customer has not yet returned the item, or a Refund Only request still under TikTok review, appear here.',
                'You can check the return/refund reason and any supporting evidence such as photos.',
                'Clear evidence (allergic reaction, severely damaged product, etc.) \u2192 process the refund immediately or send a replacement, depending on the situation.',
                'Change of mind or dissatisfaction with effectiveness ("Changed my mind", "Product didn\'t work", "No effect") with no confirmed defect \u2192 wait for the customer to return the product before refunding.'
              ]
            },
            {
              t: 'list',
              title: '2. Awaiting Your Action',
              items: [
                'Orders where the customer has returned the product, or TikTok completed approval for a Refund Only request, appear here.',
                'Refund Only: often submitted for reasons such as Missing Package \u2192 review the order and click Respond to proceed with the refund.'
              ]
            },
            {
              t: 'steps',
              title: 'Return & Refund \u2014 once status is Pending Return Inspection',
              items: [
                { text: 'Click Inspect Parcel.' },
                { text: 'Check that the returned item has been received and is in acceptable condition.' },
                { text: 'Click Confirm Receipt of Package.' },
                { text: 'Proceed with the refund.' }
              ]
            }
          ]
        },
        {
          id: 'uk-cs-fbt',
          title: 'Submit FBT Tickets',
          cadence: 'As needed',
          goal:
            'If the order is marked "Fulfilled by TikTok (FBT)", we can request reimbursement for damaged or missing packages when the issue is FBT\u2019s fault.',
          links: [{ label: 'FBT Center (pipak)', url: 'https://uk.pipak.com/home' }],
          blocks: [
            {
              t: 'steps',
              items: [
                {
                  text:
                    'After issuing the refund for a missing package, or after receiving a returned package, log the data in the sheet.'
                },
                { text: 'Check whether the reimbursement has been processed automatically.' },
                {
                  text:
                    'If not reimbursed automatically, go to the FBT Center \u2192 Create a ticket \u2192 issue type: FBT Issues / Buyer Order Management \u2192 Return/Refund Requests.'
                }
              ]
            },
            {
              t: 'warn',
              title: 'Important',
              items: [
                'You do NOT need to create a ticket for every order \u2014 some are reimbursed automatically. Only create tickets for orders where reimbursement has not been processed.'
              ]
            }
          ]
        }
      ]
    },

    {
      id: 'uk-affiliate',
      icon: '\u{1F91D}',
      title: 'Affiliate Marketing',
      items: [
        {
          id: 'uk-aff-messages',
          title: 'Affiliate Messages',
          cadence: 'Daily',
          goal: 'Go to Affiliate Centre \u2192 Chats. Refer to the message templates when replying to creators.',
          links: [
            { label: 'Affiliate CS_Templates', url: 'https://docs.google.com/spreadsheets/d/1_ptIbdwbET34bBxP0ih2vcF_Am00xZxMkosPInq8FwA/edit?gid=194864669#gid=194864669' }
          ],
          blocks: [
            {
              t: 'list',
              title: 'Most common inquiry types',
              items: ['Sample Request', 'Target Invite', 'Spark Ads Code', 'Delivery issue', 'Retainer / Paid Collab']
            }
          ]
        },
        {
          id: 'uk-aff-sample-req',
          title: 'Sample Request Inquiries',
          cadence: 'As needed',
          blocks: [
            {
              t: 'list',
              items: [
                'Creators with a post rate above 50% are generally approved, as long as they have NOT previously received the requested product.',
                'Exception: for creators who rank highly in our shop GMV, approve even if they previously received a sample of the same product.',
                'Check performance at Affiliate Centre \u2192 Analytics \u2192 Creators \u2192 search the username.'
              ]
            },
            {
              t: 'templates',
              title: 'Reply when the creator already received the product',
              items: [
                {
                  label: 'Duplicate sample request',
                  text:
                    "Hi there, due to the limited stock, we can offer only one product per creator. Since you have already received this product, we can't approve your request this time. Could you please submit a sample request for other products that you haven't tried yet?"
                }
              ]
            }
          ]
        },
        {
          id: 'uk-aff-target',
          title: 'Target Invites',
          cadence: 'As needed',
          links: [
            { label: 'UK Affiliate Strategy _Message Templates', url: 'https://docs.google.com/spreadsheets/d/1NYLk4lhbqtSBP4QTbyX-4IUTJXSx4skOInlVIH4qzG4/edit?usp=sharing' }
          ],
          blocks: [
            {
              t: 'list',
              title: 'Who qualifies',
              items: [
                'Post rate higher than 50%',
                'Overall content is beauty-related',
                'Not AI-generated content'
              ]
            },
            {
              t: 'steps',
              title: 'How to send a Target Invite',
              items: [
                { text: 'Click Target Collaboration \u2192 Create a new invitation (or go to the Target Collab page on the Affiliate Centre).' },
                {
                  text: 'Enter the Invitation Name, Valid Date and Invitation Text.',
                  sub: [
                    'Invitation Name = product name + commission rate, e.g. PDRN Cream (20%)',
                    'Valid Date: 2027.12.31',
                    'Invitation Text: use the UK Affiliate Strategy _Message Templates sheet. Check previous invite messages on the Target Collab page and refer to them as needed.'
                  ]
                },
                { text: 'Choose products and add them to the invitation.' },
                { text: 'Set the standard commission rate and set up free samples (manually review).' },
                { text: "Enter the creator's username to receive the Target Invite." }
              ]
            },
            {
              t: 'criteria',
              title: 'Standard commission rates',
              items: [
                { label: 'PDRN Lip Serum / Copper Peptide Serum / PDRN Cream', value: '20%' },
                { label: 'LC-Ceramide Cream / Retino-Mela Serum / Others (e.g. bundles)', value: '15%' }
              ]
            },
            {
              t: 'warn',
              items: ['If you have any questions about invitation text or targeting, ask June (jiyoon.wang@neosimplix.com).']
            }
          ]
        },
        {
          id: 'uk-aff-spark',
          title: 'Spark Ads Code',
          cadence: 'Daily',
          links: [
            { label: 'UK Affiliates_Spark Ads Code Sheet', url: 'https://pjph503ni774.jp.larksuite.com/wiki/Lv6sw2ohtiGdU9kg25qjS6VdpEt?from=from_parent_docx' }
          ],
          blocks: [
            {
              t: 'list',
              items: ['Thank the creator for sharing their Spark Ads Code.', 'Log the code and videos to the Spark Ads Code sheet.']
            }
          ]
        },
        {
          id: 'uk-aff-delivery',
          title: 'Sample Delivery Issues',
          cadence: 'As needed',
          blocks: [
            {
              t: 'list',
              items: [
                'Apologize for the delivery issue and explain the sample was shipped through TikTok FBT.',
                'Kindly ask creators to submit a Refund Only request through TikTok if they have not received helpful feedback from the FBT Center.',
                'Before considering a replacement sample, check whether the creator is eligible based on content quality and GMV performance.',
                "Share the creator's username and performance with June (jiyoon.wang@neosimplix.com) and discuss whether a replacement sample should be sent."
              ]
            }
          ]
        },
        {
          id: 'uk-aff-retainer',
          title: 'Retainer / Paid Collab',
          cadence: 'As needed',
          links: [{ label: 'EUKA Retainer Program', url: 'https://creators.euka.ai/retainers/3461' }],
          blocks: [
            {
              t: 'list',
              title: 'If content quality is good (shows their face, explains the product well, high GMV)',
              items: [
                'Ask them to submit an application through the EUKA Retainer Program.',
                'Inform them we will reach out after reviewing their submission.'
              ]
            },
            {
              t: 'templates',
              title: 'If they do not qualify',
              items: [
                {
                  label: 'Commission-only reply',
                  text:
                    "Hi [Creator Name]! Unfortunately, we're currently only doing commission-based collaborations, so we're unable to offer a flat fee or retainer at this time. If we ever expand to flat fee or retainer opportunities in the future, we will keep you in mind. We hope you understand, and we truly appreciate your time!"
                }
              ]
            }
          ]
        },
        {
          id: 'uk-aff-samples',
          title: 'Review Sample Requests',
          cadence: 'Daily',
          goal: 'Go to Sample Requests \u2192 Free Samples \u2192 To Review.',
          blocks: [
            {
              t: 'p',
              text:
                "You can check the creator's detailed performance (GMV by product category) and account by clicking the creator's username on the sample request page. If the creator meets the criteria, approve the sample request. If not, let the request expire."
            },
            {
              t: 'criteria',
              title: 'UK approval criteria',
              items: [
                { label: 'Post rate', value: 'higher than 50%' },
                { label: 'GMV', value: 'more than \u00A3300 (from the beauty category)' },
                { label: 'Content', value: 'beauty-related, no AI-generated content' },
                { label: 'History', value: 'no history of receiving the same product' }
              ]
            },
            {
              t: 'warn',
              title: 'Exceptions',
              items: [
                'For high-GMV creators who have posted a significant amount of content featuring our products, a repeated sample may be exceptionally approved.',
                'Based on GMV, content quality and other factors, exceptions may be made. If you are unsure, escalate to June (jiyoon.wang@neosimplix.com).',
                'Example: post rate is 40% but GMV is \u00A310K and overall content is beauty-related.'
              ]
            }
          ]
        }
      ]
    },

    {
      id: 'uk-others',
      icon: '\u{1F4CB}',
      title: 'Others',
      items: [
        {
          id: 'uk-dm',
          title: 'Managing Official TikTok Handle DM',
          cadence: 'Daily',
          links: [
            { label: 'Handle DM sheet', url: 'https://docs.google.com/spreadsheets/d/1_ptIbdwbET34bBxP0ih2vcF_Am00xZxMkosPInq8FwA/edit?usp=sharing' },
            { label: '@rejuall_uk_official', url: 'https://www.tiktok.com/@rejuall_uk_official' }
          ],
          blocks: [
            {
              t: 'list',
              items: [
                'Check the TikTok Handle DM for @rejuall_uk_official.',
                'Reply to the messages based on the templates in the Handle DM sheet.'
              ]
            }
          ]
        }
      ]
    }
  ]
};
