/* Legal page content.
 *
 * ⚠ THESE ARE DRAFTS, NOT LEGAL ADVICE.
 * They follow the section outlines in Z_Call_Agent_Landing_Page_Legal_Policies.md
 * and are written for an AI voice-agent SaaS, but they must be reviewed by a
 * qualified lawyer for every jurisdiction you and your customers operate in
 * before launch. Automated calling, call recording, transcripts, consent and
 * AI disclosure carry requirements that vary widely by country and state.
 *
 * Anything in [square brackets] is a placeholder you must fill in.
 * Company-wide facts live in COMPANY below — edit them once, here. */

export const COMPANY = {
  product: 'ZVoice',
  legalName: '[Registered company name]',
  parent: 'zvoiceai',
  site: 'voice.zvoiceai.io',
  address: '[Registered business address]',
  jurisdiction: '[Governing jurisdiction]',
  privacyEmail: 'privacy@zvoiceai.io',
  supportEmail: 'support@zvoiceai.io',
  securityEmail: 'security@zvoiceai.io',
  legalEmail: 'legal@zvoiceai.io',
  updated: '4 September 2026',
}

const C = COMPANY

/* Each policy: { slug, title, tagline, sections: [{ h, p?: [], ul?: [] }] } */
export const POLICIES = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    tagline: `How ${C.product} collects, uses, stores, shares and deletes information.`,
    sections: [
      {
        h: 'Who we are',
        p: [
          `${C.product} is a realtime AI voice agent service operated by ${C.legalName} ("we", "us"), part of ${C.parent}, at ${C.address}.`,
          `For questions about this policy or your data, contact ${C.privacyEmail}.`,
        ],
      },
      {
        h: 'Two different roles',
        p: [
          `We handle two kinds of data, and our role differs for each.`,
          `For our own customers — the businesses who sign up for ${C.product} — we are the controller of account and billing data.`,
          `For the people who call those businesses, we act as a processor on the business's instructions. The business decides why calls are answered and recorded; we process on their behalf under our Data Processing Agreement.`,
        ],
      },
      {
        h: 'What we collect',
        ul: [
          'Account information — name, business name, work email, password credentials, role.',
          'Billing information — plan, billing address, tax identifiers, and payment tokens held by our payment processor. We do not store full card numbers.',
          'Business configuration — your agent instructions, greeting, FAQ content, business hours and escalation rules.',
          'Phone numbers — the numbers you connect, and the numbers of people who call them.',
          'Call metadata — time, duration, direction, outcome, and which agent handled the call.',
          'Voice recordings — audio of calls handled by your agent, where recording is enabled.',
          'Transcripts — text produced from that audio.',
          'AI-generated summaries — outcome notes, intent classification and lead qualification produced from the conversation.',
          'Appointment information — names, contact details and times captured in order to book.',
          'Technical data — IP address, device and browser type, and server logs.',
          'Website data — cookies and similar technologies, as described in our Cookie Policy.',
        ],
      },
      {
        h: 'Why we use it',
        ul: [
          'To provide the service — answering, understanding, and acting on calls.',
          'To book appointments and sync outcomes to the calendars and CRMs you connect.',
          'To show you transcripts, recordings and analytics for your own calls.',
          'To bill you and to prevent fraud and abuse.',
          'To support you when you contact us.',
          'To keep the service secure, reliable and available.',
          'To improve the service. We do not use your customers’ call recordings or transcripts to train general-purpose AI models unless you have asked us to in writing.',
          'To meet legal obligations.',
        ],
      },
      {
        h: 'Recording, consent and disclosure',
        p: [
          'Call recording and automated calling are regulated differently across countries and states. Some require all parties to consent before a call is recorded; some require callers to be told they are speaking with an AI system rather than a person.',
          'You are responsible for configuring your agent so that it makes the disclosures and obtains the consent required where you and your callers are located. We provide the controls; the obligation to use them correctly is yours.',
        ],
      },
      {
        h: 'Who we share it with',
        p: ['We do not sell personal information. We share it only as follows:'],
        ul: [
          'Service providers who run our infrastructure, telephony, speech processing, AI models, payments, email and analytics — each under contract and only to provide the service.',
          'Integrations you connect yourself, such as your calendar or CRM. What happens to data inside those tools is governed by their own terms.',
          'Legal and safety disclosures where we are legally required, or to protect rights and safety.',
          'A successor in a merger, acquisition or asset sale, subject to this policy.',
        ],
        after: [
          'A current list of our subprocessors is available on request from ' + C.privacyEmail + '.',
        ],
      },
      {
        h: 'How long we keep it',
        ul: [
          'Account and billing records — for the life of the account and then as long as tax and accounting law requires.',
          'Recordings and transcripts — for the retention period set in your workspace. You can shorten it, or disable recording entirely.',
          'Call metadata and analytics — retained to give you historical reporting.',
          'Backups — deleted data may persist in encrypted backups for a limited window before being overwritten.',
        ],
        after: [
          'When your account closes, we delete or de-identify personal data within [retention window, e.g. 30 days], except where we must keep it by law.',
        ],
      },
      {
        h: 'Your rights',
        p: [
          'Depending on where you live, you may have rights to access, correct, delete, port, or restrict the processing of your personal information, to object to processing, and to withdraw consent.',
          `To exercise any of these, contact ${C.privacyEmail}. If you called a business that uses ${C.product} and want your data handled, contact that business directly — they decide what happens to it, and we will support their request.`,
          'You may also complain to your local data protection authority.',
        ],
      },
      {
        h: 'International transfers',
        p: [
          'We may process data in countries other than your own. Where we transfer personal data out of a region that restricts transfers, we rely on an approved safeguard such as Standard Contractual Clauses, together with appropriate technical measures.',
        ],
      },
      {
        h: 'Security',
        p: [
          'We use encryption in transit and at rest, access controls, and monitoring. See our Security Policy for more. No system is perfectly secure, and we cannot guarantee absolute security.',
        ],
      },
      {
        h: 'Children',
        p: [
          `${C.product} is a business product and is not directed to children. We do not knowingly collect personal information from children.`,
        ],
      },
      {
        h: 'Changes',
        p: [
          'We will post any changes on this page and update the date above. If a change materially affects your rights, we will give notice by email or in the product before it takes effect.',
        ],
      },
    ],
  },

  {
    slug: 'terms-of-service',
    title: 'Terms of Service',
    tagline: `The agreement between you and ${C.legalName} for use of ${C.product}.`,
    sections: [
      {
        h: 'Agreement',
        p: [
          `These terms govern your use of ${C.product}. By creating an account or using the service you accept them. If you are accepting on behalf of a company, you confirm you have authority to bind it.`,
        ],
      },
      {
        h: 'Eligibility and accounts',
        ul: [
          'You must be at least 18 and able to enter a binding contract.',
          'You must give accurate registration details and keep them current.',
          'You are responsible for your account credentials and for everything done under your account.',
          'Tell us promptly at ' + C.securityEmail + ' if you suspect unauthorised access.',
        ],
      },
      {
        h: 'What you may use the service for',
        p: [
          'You may use ' + C.product + ' to operate AI voice agents for your own business, within your plan limits and subject to our Acceptable Use Policy.',
          'You may not resell, sublicense, reverse engineer, scrape, or use the service to build a competing product, unless we agree in writing.',
        ],
      },
      {
        h: 'Your responsibilities as the operator of an agent',
        p: [
          'The agent speaks for your business. That makes some things yours, not ours:',
        ],
        ul: [
          'The instructions, greeting, pricing, availability and claims you configure.',
          'Obtaining consent for recording, and disclosing AI use, where the law requires it.',
          'Complying with telemarketing, robocalling, do-not-call and telecom rules that apply to you.',
          'Having a lawful basis to process the personal data of the people who call you.',
          'Making sure regulated advice (medical, legal, financial) is not given by an agent that is not qualified or permitted to give it.',
        ],
      },
      {
        h: 'Subscriptions, payment and usage',
        ul: [
          'Plans are billed in advance on a recurring basis and renew automatically until cancelled.',
          'Usage beyond your included minutes is billed in arrears at the overage rate shown on our pricing page.',
          'Prices exclude taxes, which are added where applicable.',
          'Failure to pay may lead to suspension after notice.',
          'We may change pricing with at least [notice period, e.g. 30 days] notice before your next renewal.',
        ],
      },
      {
        h: 'Trials',
        p: [
          'Trials are provided as-is and may be limited or withdrawn. Unless you cancel before the trial ends, the plan continues as a paid subscription under the terms shown at signup.',
        ],
      },
      {
        h: 'Third-party integrations',
        p: [
          'Calendars, CRMs and other tools you connect are controlled by their providers, not by us. Your use of them is governed by their terms, and we are not responsible for their availability or behaviour.',
        ],
      },
      {
        h: 'AI limitations',
        p: [
          'The service uses automated speech and language models. It can mishear, misunderstand, or produce wrong or incomplete responses, and it will not perform identically on every call.',
          'You should review outputs before relying on them for anything consequential. See our Disclaimer.',
        ],
      },
      {
        h: 'Availability',
        p: [
          'We aim for high availability but do not promise uninterrupted service on standard plans. Maintenance, telephony carrier issues and third-party outages can interrupt service. Contracted service levels, where offered, are set out in an Enterprise order form.',
        ],
      },
      {
        h: 'Suspension and termination',
        ul: [
          'You may cancel at any time as described in our Cancellation Policy.',
          'We may suspend or terminate for material breach, non-payment, or use that violates our Acceptable Use Policy or creates legal risk.',
          'Where practical and lawful we will give notice and an opportunity to fix the problem first. Serious abuse may be stopped immediately.',
          'On termination your right to use the service ends; export your data before your access closes.',
        ],
      },
      {
        h: 'Intellectual property',
        p: [
          'We own the service, its software and its branding. You own your content — your configuration, recordings, transcripts and customer data. You grant us the licence needed to host and process that content in order to provide the service.',
        ],
      },
      {
        h: 'Confidentiality',
        p: [
          'Each side will protect the other’s non-public information with reasonable care and use it only for the purpose of this agreement.',
        ],
      },
      {
        h: 'Warranties and liability',
        p: [
          'Except as expressly stated, the service is provided "as is" without warranties of any kind to the extent permitted by law.',
          'To the maximum extent permitted by law, neither party is liable for indirect, incidental, special or consequential damages, or lost profits or revenue. Our total liability in any 12-month period is limited to the fees you paid in that period.',
          'Nothing here limits liability that cannot be limited by law.',
        ],
      },
      {
        h: 'Indemnity',
        p: [
          'You will defend and indemnify us against claims arising from your content, your agent configuration, your use of the service, or your breach of these terms or of applicable law.',
        ],
      },
      {
        h: 'Changes to the service or these terms',
        p: [
          'We may change the service and these terms. For material changes we will give reasonable notice. Continuing to use the service after a change takes effect means you accept it.',
        ],
      },
      {
        h: 'Governing law',
        p: [
          `These terms are governed by the laws of ${C.jurisdiction}, and disputes will be resolved in its courts, without regard to conflict-of-law rules.`,
          `Questions: ${C.legalEmail}.`,
        ],
      },
    ],
  },

  {
    slug: 'cookie-policy',
    title: 'Cookie Policy',
    tagline: 'What we store on your device, why, and how to change it.',
    sections: [
      {
        h: 'What cookies are',
        p: [
          'Cookies are small files a site stores on your device. We also use similar technologies such as local storage. This policy covers all of them.',
        ],
      },
      {
        h: 'Categories we use',
        ul: [
          'Necessary — required for the site to work: security, load balancing, and remembering your cookie choice itself. These cannot be turned off.',
          'Analytics — help us understand which pages are visited so we can improve them. Aggregated.',
          'Functional — remember preferences such as a dismissed banner or chosen language.',
          'Marketing — measure campaign performance and support advertising on other sites.',
        ],
        after: [
          'Nothing outside the Necessary category is loaded until you choose. Reject Non-Essential leaves only Necessary active.',
        ],
      },
      {
        h: 'Where your choice is stored',
        p: [
          'Your choice is saved in your browser under the key zvoice.consent.v1, alongside the date you made it. It stays on your device and is not sent to us as a profile.',
        ],
      },
      {
        h: 'Duration',
        ul: [
          'Session cookies are deleted when you close the browser.',
          'Persistent cookies last up to [duration, e.g. 12 months] unless you clear them sooner.',
          'Your consent record persists until you clear site data or change your choice.',
        ],
      },
      {
        h: 'Third-party cookies',
        p: [
          'Where analytics or advertising providers are enabled, those providers may set their own cookies under their own policies. We only load them after you consent to the relevant category.',
        ],
      },
      {
        h: 'Changing your mind',
        p: [
          'Use the Cookie Preferences link in the footer at any time. You can also clear cookies in your browser settings, which will make the banner appear again on your next visit.',
        ],
      },
    ],
  },

  {
    slug: 'refund-policy',
    title: 'Refund Policy',
    tagline: 'When money comes back, when it does not, and how to ask.',
    sections: [
      {
        h: 'Start with the trial',
        p: [
          'Every plan includes a 14-day free trial with no card required. The trial is the intended way to evaluate ' + C.product + ' before paying anything.',
        ],
      },
      {
        h: 'Refund window',
        p: [
          'If you are not satisfied, contact us within [refund window, e.g. 14 days] of a charge and we will refund the subscription portion of that charge for the current period.',
        ],
      },
      {
        h: 'What is not refundable',
        ul: [
          'Usage-based charges for voice minutes already consumed. The calls were carried and processed.',
          'Overage already incurred in a closed billing period.',
          'Prepaid credits or minute bundles once used; unused portions may be refundable at our discretion.',
          'Third-party charges such as telephony numbers already provisioned for a period.',
          'Periods where the account was suspended for breach of our Acceptable Use Policy.',
        ],
      },
      {
        h: 'Proration',
        p: [
          'Downgrades take effect at the next renewal rather than mid-period, and we do not prorate a partly used month unless we state otherwise in writing. Enterprise agreements may set different terms, and those terms take precedence.',
        ],
      },
      {
        h: 'Service failure',
        p: [
          'If a confirmed fault on our side prevented you from using the service for a sustained period, contact us. We will look at a credit or refund on the facts, regardless of the standard window.',
        ],
      },
      {
        h: 'How to request one',
        p: [
          `Email ${C.supportEmail} from the address on the account, with the invoice number and a short note on what went wrong. We aim to respond within [response time, e.g. 3 business days] and to return approved refunds to the original payment method within [processing time, e.g. 5–10 business days], depending on your bank.`,
        ],
      },
    ],
  },

  {
    slug: 'cancellation-policy',
    title: 'Cancellation Policy',
    tagline: 'How to cancel, when it takes effect, and what happens to your data.',
    sections: [
      {
        h: 'How to cancel',
        p: [
          `Cancel from Billing in your ${C.product} dashboard, or email ${C.supportEmail} from the address on the account. No phone call, no retention queue, no need to give a reason.`,
        ],
      },
      {
        h: 'When it takes effect',
        p: [
          'Cancellation stops the next renewal. Your plan stays active until the end of the period you have already paid for, and you keep full access until then.',
          'You are not charged again after you cancel, but usage-based charges already incurred in the current period are still billed at the end of it.',
        ],
      },
      {
        h: 'Auto-renewal',
        p: [
          'Subscriptions renew automatically until cancelled. Cancel at least [notice, e.g. 24 hours] before the renewal date to be sure the next cycle is not charged.',
        ],
      },
      {
        h: 'Cancelling during a trial',
        p: [
          'Cancel any time before the trial ends and you are not charged at all. The account closes at the end of the trial period.',
        ],
      },
      {
        h: 'Your phone numbers',
        p: [
          'Numbers we provisioned for you are released when the account closes and may not be recoverable afterwards. If you want to keep a number, start porting it out before you cancel.',
        ],
      },
      {
        h: 'Unused minutes and credits',
        p: [
          'Included minutes do not roll over and are not refunded on cancellation. Prepaid credits follow the Refund Policy.',
        ],
      },
      {
        h: 'What happens to your data',
        ul: [
          'Your data stays available for export until the end of your paid period.',
          'After the account closes we retain it for [grace period, e.g. 30 days] so the account can be restored.',
          'After that it is deleted or de-identified, except records we must keep for tax, accounting or legal reasons.',
          'Ask for immediate deletion instead by writing to ' + C.privacyEmail + '.',
        ],
      },
      {
        h: 'Reactivating',
        p: [
          'Reactivate within the grace period and your configuration and history come back. After deletion, you can open a new account but the previous data cannot be recovered.',
        ],
      },
      {
        h: 'If we cancel',
        p: [
          'We may close an account for non-payment or for breach of the Acceptable Use Policy. Except for serious abuse, we will give notice and a chance to put things right, and a reasonable window to export data.',
        ],
      },
    ],
  },

  {
    slug: 'disclaimer',
    title: 'Disclaimer',
    tagline: 'What an AI voice agent can and cannot be relied on to do.',
    sections: [
      {
        h: 'AI makes mistakes',
        p: [
          `${C.product} uses automated speech recognition and language models. It can mishear a word, misread an intent, produce a confident but wrong answer, or fail on an accent, a noisy line or an unusual request. It will not behave identically on every call.`,
          'Treat its output as a capable first pass, not as a verified record.',
        ],
      },
      {
        h: 'Verify what matters',
        p: [
          'Transcripts, summaries, intents and lead scores are generated automatically. Before relying on them for a decision with money, health, legal or safety consequences, check them against the recording or with the caller.',
        ],
      },
      {
        h: 'No guarantee of outcome',
        p: [
          'We do not warrant that the agent will answer every call correctly, capture every lead, book every appointment, or reach any particular accuracy or conversion rate. Examples and figures on our website illustrate the product; they are not promises about your results.',
        ],
      },
      {
        h: 'You configure the agent',
        p: [
          'What the agent says, offers, quotes and promises is what you configured it to say. You are responsible for keeping those instructions accurate, current and appropriate for your business.',
        ],
      },
      {
        h: 'Automated calling is regulated',
        p: [
          'Automated and recorded calls are subject to telecom, consumer protection and privacy law. Depending on where you and your callers are, you may need prior consent, do-not-call screening, calling-hour limits, an identified caller, or a clear disclosure that the caller is speaking with an AI system rather than a person.',
          'Meeting those requirements is your responsibility as the operator of the agent.',
        ],
      },
      {
        h: 'Not professional advice',
        p: [
          `${C.product} is not a substitute for professional medical, legal, financial or other regulated advice, and must not be configured to give it unless you are qualified and permitted to do so.`,
        ],
      },
      {
        h: 'Not an emergency service',
        p: [
          'The service must not be used to receive or handle emergency calls and cannot connect a caller to emergency services. Make sure your greeting directs emergencies to the correct number.',
        ],
      },
    ],
  },

  {
    slug: 'acceptable-use-policy',
    title: 'Acceptable Use Policy',
    tagline: `The line between using ${C.product} and misusing it.`,
    sections: [
      {
        h: 'Why this policy exists',
        p: [
          `${C.product} can place and answer calls at scale in a convincing human voice. That is useful, and it is also exactly what a fraudster would want. This policy sets the limits, and we enforce them.`,
        ],
      },
      {
        h: 'You must not use the service to',
        ul: [
          'Commit fraud or run scams of any kind, including payment, invoice, prize or impersonation scams.',
          'Impersonate a real person, business, bank or government body, or claim an affiliation you do not have.',
          'Harass, threaten, intimidate, stalk or abuse anyone.',
          'Make unlawful robocalls or automated marketing calls without the consent the law requires.',
          'Ignore do-not-call registers, opt-outs, calling-hour restrictions or revoked consent.',
          'Send spam, or dial numbers in bulk without a lawful basis and a genuine relationship.',
          'Record calls where recording is unlawful, or hide that a call is recorded when disclosure is required.',
          'Hide that the caller is an AI system where disclosure is required.',
          'Harvest personal data, or collect payment details or credentials under false pretences.',
          'Facilitate illegal activity, or content that is unlawful, hateful or sexually exploitative.',
          'Abuse the telephony network — number spoofing, traffic pumping, war dialling, or evading carrier controls.',
          'Probe, overload or interfere with our systems, or work around usage limits and security controls.',
          'Resell the service or expose it to third parties without our written agreement.',
        ],
      },
      {
        h: 'What we expect of you',
        ul: [
          'Identify your business honestly at the start of a call.',
          'Give callers a way to reach a human being.',
          'Honour opt-out requests promptly and permanently.',
          'Keep your agent instructions truthful.',
          'Hold a lawful basis for the personal data your agent collects.',
        ],
      },
      {
        h: 'Enforcement',
        p: [
          'We investigate reports and monitor for abuse patterns. Depending on severity we may warn you, rate-limit or disable specific numbers or agents, suspend the account, terminate it, or report the matter to carriers or law enforcement.',
          'Serious abuse — fraud, harassment, illegal robocalling — can be stopped immediately and without notice. Accounts terminated for abuse are not refunded.',
        ],
      },
      {
        h: 'Reporting abuse',
        p: [
          `If you have received a call you believe was made using ${C.product} in breach of this policy, report it to ${C.supportEmail} with the number called, the date and time, and what happened. We take these seriously.`,
        ],
      },
    ],
  },

  {
    slug: 'data-processing-agreement',
    title: 'Data Processing Agreement',
    tagline: 'The processor terms that apply when we handle personal data for you.',
    sections: [
      {
        h: 'Status of this page',
        p: [
          `This page summarises our standard DPA. The executable version, including Standard Contractual Clauses, is available from ${C.legalEmail} — request it, review it, and we will countersign.`,
          'Where a signed DPA or an Enterprise agreement exists, that document takes precedence over this summary.',
        ],
      },
      {
        h: 'Roles',
        p: [
          'For personal data about the people who call your business, you are the controller and we are the processor. You decide why calls are answered, whether they are recorded, and how long recordings are kept. We act on your documented instructions.',
          'For your own account and billing data, we are the controller, as described in the Privacy Policy.',
        ],
      },
      {
        h: 'Scope of processing',
        ul: [
          'Subject matter — providing AI voice agent services.',
          'Duration — the term of your subscription, plus the agreed retention window.',
          'Nature and purpose — answering, transcribing, understanding, responding to and logging calls, and syncing outcomes to systems you connect.',
          'Categories of data — phone numbers, voice recordings, transcripts, appointment details, names and contact details given on a call, call metadata.',
          'Data subjects — the people who call your business, and your own staff who use the product.',
        ],
      },
      {
        h: 'Our obligations',
        ul: [
          'Process personal data only on your documented instructions, unless the law requires otherwise.',
          'Bind everyone with access to confidentiality.',
          'Apply appropriate technical and organisational security measures.',
          'Help you respond to data-subject requests and to regulators, taking account of what we can see.',
          'Notify you without undue delay after becoming aware of a personal data breach.',
          'Delete or return personal data at the end of the service, subject to legal retention.',
          'Make available the information needed to demonstrate compliance, and allow audits on reasonable notice, subject to confidentiality.',
        ],
      },
      {
        h: 'Subprocessors',
        p: [
          'We use subprocessors for infrastructure, telephony, speech and language processing, and support. Each is bound by terms no less protective than these. A current list is available on request, and we will give notice of additions so you can object.',
        ],
      },
      {
        h: 'International transfers',
        p: [
          'Where personal data leaves a region that restricts transfers, we rely on Standard Contractual Clauses or another approved mechanism, together with supplementary technical measures.',
        ],
      },
      {
        h: 'Your obligations',
        ul: [
          'Have a lawful basis for the processing you instruct.',
          'Give the notices and obtain the consents required for recording and for AI interaction.',
          'Set a retention period appropriate to your purpose.',
          'Keep access to recordings and transcripts limited to staff who need it.',
        ],
      },
    ],
  },

  {
    slug: 'security-policy',
    title: 'Security Policy',
    tagline: 'How we protect the calls, recordings and data you trust us with.',
    sections: [
      {
        h: 'Our approach',
        p: [
          'Voice data is sensitive: recordings carry names, numbers, health and financial details. We design for least privilege, encrypt by default, and keep the number of people who can reach production data small.',
          'This page describes our practices at a level that is useful without handing an attacker a map.',
        ],
      },
      {
        h: 'Encryption',
        ul: [
          'Data in transit is encrypted with TLS.',
          'Data at rest, including recordings and transcripts, is encrypted using industry-standard algorithms.',
          'Secrets and keys are held in a managed secrets store, not in code or configuration files.',
        ],
      },
      {
        h: 'Access control',
        ul: [
          'Access to production is role-based, granted on need, and reviewed periodically.',
          'Multi-factor authentication is required for staff access to production systems.',
          'Administrative actions are logged.',
          'Access is revoked promptly when someone changes role or leaves.',
        ],
      },
      {
        h: 'Infrastructure',
        ul: [
          'We run on established cloud providers with their own audited physical and network security.',
          'Environments are separated, and production data is not used in development.',
          'Backups are encrypted and restore procedures are tested.',
          'Dependencies are monitored and patched.',
        ],
      },
      {
        h: 'Monitoring and incident response',
        p: [
          'We monitor for anomalous activity and maintain an incident response process covering detection, containment, eradication, recovery and review. If a breach affects your data we will notify you without undue delay, with what we know and what we are doing.',
        ],
      },
      {
        h: 'People and vendors',
        p: [
          'Staff are subject to confidentiality obligations and security training. Vendors with access to customer data are assessed before onboarding and bound by contract.',
        ],
      },
      {
        h: 'Your part',
        ul: [
          'Use strong, unique credentials and enable multi-factor authentication.',
          'Give team members the least access they need.',
          'Set a retention period that matches your actual need rather than keeping recordings indefinitely.',
          'Report anything suspicious to ' + C.securityEmail + '.',
        ],
      },
      {
        h: 'Certifications',
        p: [
          'Current status: [state any audits or certifications actually held, or say none yet]. We do not claim compliance with a standard we have not been assessed against.',
        ],
      },
    ],
  },

  {
    slug: 'responsible-disclosure',
    title: 'Responsible Disclosure',
    tagline: 'Found a vulnerability? Here is how to tell us, safely.',
    sections: [
      {
        h: 'We want the report',
        p: [
          'If you have found a security vulnerability, we would rather hear it from you than from an attacker. Report it and we will work with you.',
        ],
      },
      {
        h: 'How to report',
        p: [
          `Email ${C.securityEmail}. Please include:`,
        ],
        ul: [
          'What the issue is and why it matters.',
          'Clear steps to reproduce it, including URLs, accounts and payloads.',
          'Proof of concept where you have one.',
          'Any suggested fix.',
          'How you would like to be credited, if at all.',
        ],
      },
      {
        h: 'What we will do',
        ul: [
          'Acknowledge your report within [timeframe, e.g. 3 business days].',
          'Confirm whether we can reproduce it, and tell you our assessment.',
          'Keep you updated while we work on a fix.',
          'Tell you when it is resolved, and credit you if you would like.',
        ],
      },
      {
        h: 'Safe harbour',
        p: [
          'If you make a good-faith effort to follow this policy, we will not pursue legal action over your research, and we will make clear that your actions were authorised if a third party raises them.',
          'This protection does not extend to accessing, altering or exfiltrating other people’s data beyond what is needed to demonstrate the issue.',
        ],
      },
      {
        h: 'Rules for testing',
        ul: [
          'Test only against accounts you own or have permission to use.',
          'Do not access, modify or delete other users’ data.',
          'Do not place real calls to third parties as part of testing.',
          'No denial of service, load testing, or spam.',
          'No social engineering of our staff, customers or vendors.',
          'No physical attacks on our offices or infrastructure.',
          'Stop as soon as you have confirmed the issue, and report it.',
          'Give us reasonable time to fix it before disclosing publicly.',
        ],
      },
      {
        h: 'Out of scope',
        ul: [
          'Reports from automated scanners with no demonstrated impact.',
          'Missing best-practice headers with no exploitable consequence.',
          'Issues requiring a rooted device, physical access or an outdated browser.',
          'Rate-limiting or brute-force reports without practical impact.',
          'Vulnerabilities in third-party services not operated by us.',
        ],
      },
      {
        h: 'Rewards',
        p: [
          'We do not currently run a paid bounty programme. [Update this if you launch one.] We do credit reporters who want it.',
        ],
      },
    ],
  },

  {
    slug: 'accessibility-statement',
    title: 'Accessibility Statement',
    tagline: 'Our commitment, where we stand, and how to tell us we fell short.',
    sections: [
      {
        h: 'Our commitment',
        p: [
          `We want ${C.product} to be usable by everyone, including people who navigate by keyboard, use a screen reader, need larger text, or prefer reduced motion.`,
        ],
      },
      {
        h: 'What we have done',
        ul: [
          'Semantic HTML with meaningful headings and landmarks.',
          'Keyboard access to interactive controls, including the audio players and cookie preferences.',
          'Labels on controls that are icon-only.',
          'Colour combinations chosen for contrast against their backgrounds.',
          'Full support for the reduce-motion system setting — animation and smooth scrolling switch off.',
          'Text that reflows without horizontal scrolling down to small screens.',
          'Audio content that is also available as on-screen text.',
        ],
      },
      {
        h: 'Where we stand',
        p: [
          'We aim to meet WCAG 2.1 Level AA. We have not yet completed a formal third-party audit, so we do not claim conformance. [Update this once an audit is done, and state the result honestly.]',
          'Known gaps we are working on: [list current known issues].',
        ],
      },
      {
        h: 'Tell us',
        p: [
          `If something on this site or in the product is hard to use, email ${C.supportEmail} with the page, what you were trying to do, and the assistive technology you use. We aim to reply within [timeframe, e.g. 5 business days] and will offer another way to get what you needed while we fix it.`,
        ],
      },
    ],
  },
]

export const POLICY_BY_SLUG = Object.fromEntries(POLICIES.map((p) => [p.slug, p]))
