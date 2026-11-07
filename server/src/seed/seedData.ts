import { IApplication, IGuide } from '../types';

export const SEED_APPLICATIONS: IApplication[] = [
  {
    name: 'Google',
    slug: 'google',
    website: 'https://cloud.google.com',
    logo: 'https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png',
    description: 'OAuth 2.0 authorization for Google Workspace, Gmail, Drive, Calendar, and Google Cloud APIs with granular scope controls.',
    oauthSupported: true,
    complexity: 'Difficult',
    estimatedActiveTime: '45 - 90 mins',
    approvalEstimate: '3 - 21 days (for sensitive/restricted scopes)',
    managedOAuthStatus: 'Available',
    officialDocs: 'https://developers.google.com/identity/protocols/oauth2',
    lastResearchedAt: '2025-05-15',
    tags: ['Cloud', 'Productivity', 'Email', 'Workspace']
  },
  {
    name: 'Slack',
    slug: 'slack',
    website: 'https://slack.com',
    logo: 'https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png',
    description: 'OAuth v2 for Slack bot apps, user tokens, granular channel permissions, and workspace-level authorizations.',
    oauthSupported: true,
    complexity: 'Medium',
    estimatedActiveTime: '20 - 45 mins',
    approvalEstimate: '0 days (Internal) / 2 - 4 weeks (App Directory)',
    managedOAuthStatus: 'Available',
    officialDocs: 'https://api.slack.com/authentication/oauth-v2',
    lastResearchedAt: '2025-05-15',
    tags: ['Messaging', 'Collaboration', 'Bot', 'Productivity']
  },
  {
    name: 'GitHub',
    slug: 'github',
    website: 'https://github.com',
    logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    description: 'Web application OAuth authorization for repositories, organizations, issues, and developer automation tools.',
    oauthSupported: true,
    complexity: 'Easy',
    estimatedActiveTime: '10 - 20 mins',
    approvalEstimate: '0 days (Instant; Org admin consent required)',
    managedOAuthStatus: 'Available',
    officialDocs: 'https://docs.github.com/en/apps/oauth-apps',
    lastResearchedAt: '2025-05-15',
    tags: ['Developer Tools', 'Git', 'Code Hosting', 'CI/CD']
  },
  {
    name: 'Notion',
    slug: 'notion',
    website: 'https://notion.so',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    description: 'OAuth 2.0 authorization for Notion workspaces, databases, pages, and automated document sync agents.',
    oauthSupported: true,
    complexity: 'Medium',
    estimatedActiveTime: '20 - 35 mins',
    approvalEstimate: '0 days (Internal) / 3 - 7 days (Public Directory)',
    managedOAuthStatus: 'Available',
    officialDocs: 'https://developers.notion.com/docs/authorization',
    lastResearchedAt: '2025-05-15',
    tags: ['Productivity', 'Wiki', 'Knowledge Base', 'Notes']
  },
  {
    name: 'Discord',
    slug: 'discord',
    website: 'https://discord.com',
    logo: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
    description: 'OAuth2 with Bot Authorization and RPC flows for servers, user identities, voice states, and slash commands.',
    oauthSupported: true,
    complexity: 'Easy',
    estimatedActiveTime: '15 - 30 mins',
    approvalEstimate: '0 days (Initial) / 5 - 10 days (100+ Guilds Bot Verification)',
    managedOAuthStatus: 'Available',
    officialDocs: 'https://discord.com/developers/docs/topics/oauth2',
    lastResearchedAt: '2025-05-15',
    tags: ['Community', 'Gaming', 'Bot', 'Chat']
  },
  {
    name: 'Linear',
    slug: 'linear',
    website: 'https://linear.app',
    logo: 'https://linear.app/static/apple-touch-icon.png',
    description: 'OAuth 2.0 with PKCE support for issue tracking, cycles, project boards, and AI agent issue triage.',
    oauthSupported: true,
    complexity: 'Easy',
    estimatedActiveTime: '10 - 20 mins',
    approvalEstimate: '0 days (Instantaneous OAuth registration)',
    managedOAuthStatus: 'Available',
    officialDocs: 'https://developers.linear.app/docs/graphql/working-with-the-graphql-api/authentication',
    lastResearchedAt: '2025-05-15',
    tags: ['Project Management', 'Issue Tracker', 'Developer Tools']
  }
];

export const SEED_GUIDES: IGuide[] = [
  {
    slug: 'google',
    shareId: 'google-auth-guide-v1',
    applicationName: 'Google',
    website: 'https://cloud.google.com',
    logo: 'https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png',
    overview: {
      summary: 'Google OAuth 2.0 is the authentication protocol used across Google Cloud, Google Workspace (Gmail, Drive, Calendar, Docs), and YouTube APIs. It enforces strict scope tiering (Non-sensitive, Sensitive, Restricted) with mandatory domain verification and CASA security audits for restricted APIs.',
      howOAuthWorks: 'Google uses standard Authorization Code flow (with optional PKCE for mobile/SPA). Developers register an OAuth 2.0 Client ID in Google Cloud Console, define authorized redirect URIs, configure the OAuth Consent Screen, and request scopes. Tokens expire in 3600 seconds, and refresh tokens are issued only on the first authorization when access_type=offline and prompt=consent are specified.',
      customOAuthNeeded: true,
      managedOAuthAvailable: true,
      overallDifficulty: 'Difficult',
      difficultyReason: 'Configuring the initial test credentials is easy, but achieving production verification requires published Privacy Policy, YouTube video demonstrating OAuth flow with client ID visible, Google Search Console domain ownership verification, and potentially Cloud Application Security Assessment (CASA Tier 2/3) costing thousands if restricted scopes are requested.'
    },
    composio: {
      isManagedSupported: true,
      managedStatus: 'Available',
      recommendedPath: 'managed',
      recommendationReason: 'Using Composio Managed OAuth allows developers to instantly authenticate users to Google Workspace (Gmail, Calendar, Drive, Sheets) using pre-verified Composio enterprise credentials, bypassing the weeks-long Google verification and CASA audit entirely.',
      composioToolkitSlug: 'google-workspace',
      composioDocsUrl: 'https://docs.composio.dev/toolkits/managed-auth',
      whatComposioManages: [
        'Pre-verified Google Cloud OAuth Application credentials',
        'Automatic token refresh handling and secure credential encryption',
        'CASA Tier 2/3 security compliance certification',
        'Dynamic multi-tenant authorization routing'
      ],
      whatDeveloperStillNeeds: [
        'Composio API Key in your backend',
        'Trigger connection URL for your end users',
        'Specify needed Google toolkits (e.g. Gmail, Google Calendar)'
      ]
    },
    timeEstimates: {
      activeSetupMinutes: { min: 45, max: 90 },
      activeSetupExplanation: 'Creating Google Cloud project, enabling APIs, filling consent screen branding, setting scopes, configuring redirect URIs, and setting up testing users.',
      approvalWaitingDays: { min: 3, max: 21 },
      approvalWaitingExplanation: 'Internal Google Trust & Safety verification team review. Sensitive scopes take 3-7 business days; Restricted scopes (e.g. mail.google.com) take 2-4 weeks plus third-party CASA audit.',
      externalDependencies: [
        'Google Cloud Console account with billing or billing exemption',
        'Domain ownership verified in Google Search Console',
        'Public Privacy Policy and Terms of Service URLs',
        'Public YouTube unlisted video demonstration for verification'
      ],
      evidenceBehindEstimates: 'Google Identity OAuth 2.0 Verification Policy documentation, official OAuth App Verification FAQ, and CASA Tier 2 assessment guidelines.'
    },
    prerequisites: [
      'Active Google Account & Google Cloud project',
      'Verified domain ownership inside Google Search Console',
      'Live, publicly accessible Privacy Policy hosted on your domain',
      'Live Terms of Service URL',
      'Application logo (120x120px PNG, max 50KB)'
    ],
    setupSteps: [
      {
        stepNumber: 1,
        title: 'Create Google Cloud Project & Enable APIs',
        explanation: 'OAuth credentials in Google reside inside a specific GCP project, and target APIs (e.g. Gmail API, Google Calendar API) must be explicitly enabled.',
        exactAction: 'Navigate to Google Cloud Console > Select Project > APIs & Services > Library > Search and enable required APIs.',
        portalLink: 'https://console.cloud.google.com/apis/library',
        expectedResult: 'APIs are enabled with status "API Enabled" in your Cloud Console dashboard.',
        commonMistakes: ['Forgetting to enable the specific API before making OAuth requests, resulting in 403 accessNotConfigured error.']
      },
      {
        stepNumber: 2,
        title: 'Configure OAuth Consent Screen',
        explanation: 'Define what users see when connecting your application: App name, support email, developer contact, domain, and requested scopes.',
        exactAction: 'Navigate to APIs & Services > OAuth consent screen > Choose User Type (External) > Fill App Name, Support Email, Authorized Domains, and Developer Contact.',
        portalLink: 'https://console.cloud.google.com/apis/credentials/consent',
        expectedResult: 'Consent screen is configured in "Testing" mode.',
        commonMistakes: ['Leaving authorized domains blank or entering a subpath instead of the naked apex domain (e.g., enter myapp.com, not https://myapp.com/callback).']
      },
      {
        stepNumber: 3,
        title: 'Create OAuth 2.0 Client ID Credentials',
        explanation: 'Generate the Client ID and Client Secret pair needed for the Authorization Code exchange.',
        exactAction: 'Navigate to APIs & Services > Credentials > + Create Credentials > OAuth client ID > Application type: "Web application" > Add Authorized JavaScript origins and Authorized redirect URIs.',
        portalLink: 'https://console.cloud.google.com/apis/credentials',
        expectedResult: 'Modal displays your Client ID (ending in .apps.googleusercontent.com) and Client Secret.',
        commonMistakes: [
          'Using HTTP instead of HTTPS (Google rejects HTTP redirect URIs except for http://localhost and http://127.0.0.1).',
          'Mismatch between registered redirect URI and the redirect_uri query parameter in the authorization URL.'
        ]
      },
      {
        stepNumber: 4,
        title: 'Add Test Users for Development Mode',
        explanation: 'While your app is in "Testing" status, only users explicitly added to the Test Users list can log in.',
        exactAction: 'Under OAuth consent screen > Test users > Click "+ Add Users" > Enter the test Google accounts.',
        portalLink: 'https://console.cloud.google.com/apis/credentials/consent',
        expectedResult: 'Added test users can authorize without encountering the "Access blocked: app has not completed the Google verification process" screen.',
        commonMistakes: ['Attempting to test authorization with an account not on the Test Users list, resulting in error 403: access_denied.']
      },
      {
        stepNumber: 5,
        title: 'Submit for Verification (Production Transition)',
        explanation: 'To open authorization to any Google user without the 100-user limit or warning interstitial, you must publish the app and submit for Trust & Safety verification.',
        exactAction: 'Click "Publish App" > Click "Prepare for Verification" > Upload Privacy Policy, explain scope justifications, and submit unlisted YouTube video showing client ID in address bar.',
        portalLink: 'https://console.cloud.google.com/apis/credentials/consent',
        expectedResult: 'Google sends an automated intake email followed by Trust & Safety reviewer correspondence.',
        commonMistakes: ['Omitting the client ID in the address bar during the YouTube demo video, which guarantees immediate rejection.']
      }
    ],
    oauthConfiguration: {
      authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      tokenEndpoint: 'https://oauth2.googleapis.com/token',
      redirectUriExample: 'https://api.yourdomain.com/auth/google/callback',
      supportedFlows: ['Authorization Code Flow (Recommended)', 'Authorization Code Flow with PKCE'],
      pkceSupported: true,
      tokenRefresh: 'Tokens expire in 3600 seconds. To obtain a refresh token, supply access_type=offline and prompt=consent in the authorization URL. If prompt=consent is omitted, Google only returns a refresh token on first authorization.',
      securityConsiderations: [
        'Always validate state parameter against CSRF attacks.',
        'Never store Client Secret in client-side mobile/browser bundles.',
        'Restricted scopes require annual CASA security reassessments.'
      ]
    },
    scopes: [
      {
        name: 'https://www.googleapis.com/auth/userinfo.profile',
        description: 'View basic profile info (name, avatar, locale)',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'https://www.googleapis.com/auth/userinfo.email',
        description: 'View user email address',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'https://www.googleapis.com/auth/calendar.events',
        description: 'View and edit events on all calendars',
        sensitivity: 'Sensitive',
        triggersReview: true
      },
      {
        name: 'https://mail.google.com/',
        description: 'Read, compose, send, and permanently delete email from Gmail',
        sensitivity: 'Restricted',
        triggersReview: true
      }
    ],
    verificationRequirements: {
      reviewRequired: true,
      verificationTriggers: [
        'Requesting any Sensitive Scope (e.g. Calendar, Drive metadata)',
        'Requesting any Restricted Scope (e.g. Gmail full access, Drive files)',
        'Pushing application status from "Testing" to "In Production" for external users'
      ],
      requiredDocuments: [
        'Verified Google Search Console domain ownership',
        'Valid Privacy Policy URL hosted on the verified domain',
        'Terms of Service URL',
        'YouTube video demo showing OAuth consent screen with client ID visible in address bar'
      ],
      testingModeLimitations: 'Testing status limits app to 100 test users added manually in console. Unverified production status shows intimidating "Google hasn\'t verified this app" interstitial.',
      submissionProcess: 'Submit via GCP OAuth Consent Screen tab. Google Trust & Safety reviews via email within 3-7 business days.',
      rejectionReasons: [
        'Client ID not visible in demo video URL bar',
        'Privacy Policy does not mention Google User Data Limited Use Disclosure',
        'Domain not verified in Google Search Console under the same GCP organization account',
        'Requesting excessive scopes without justifiable application feature explanation'
      ],
      approvalDistinction: 'Google Verification is distinct from Google Workspace Admin approval. A verified app can be installed by standard consumer Google accounts, but Workspace accounts may still require domain administrator consent policy approval.'
    },
    blockers: [
      {
        issue: 'Access blocked: Authorization Error 403: access_denied',
        whyItHappens: 'Application is in "Testing" mode and the user signing in is not added to the Test Users list.',
        howToIdentify: 'Error screen in Google sign-in modal stating "App has not completed the Google verification process".',
        howToFix: 'Go to OAuth consent screen in GCP Console > Test Users > Add the user email address.',
        agentCanHelp: true,
        agentHelpDetails: 'Agent can generate the exact direct link to the GCP Console Test Users settings.'
      },
      {
        issue: 'Redirect URI mismatch: Error 400: redirect_uri_mismatch',
        whyItHappens: 'The redirect_uri parameter passed in authorization request does not character-for-character match the URI in GCP Credentials.',
        howToIdentify: 'Google OAuth page explicitly reports redirect_uri_mismatch with the received URI.',
        howToFix: 'Ensure trailing slashes, http vs https, and ports are identical in both GCP Console and your app code.',
        agentCanHelp: true,
        agentHelpDetails: 'Agent can inspect your environment redirect URI and compare against GCP format requirements.'
      },
      {
        issue: 'CASA Tier 2/3 Security Assessment Requirement',
        whyItHappens: 'App requested a Restricted Scope (like Gmail full access). Google requires third-party penetration testing.',
        howToIdentify: 'Google Trust & Safety sends email requiring letter of validation from an authorized CASA lab.',
        howToFix: 'Switch to Composio Managed OAuth or reduce scopes to non-restricted alternatives if possible.',
        agentCanHelp: true,
        agentHelpDetails: 'Agent can map requested functionality to minimal non-restricted Google scopes.'
      }
    ],
    agentResponsibilities: [
      'Discover exact OAuth 2.0 endpoints and parameter requirements',
      'Identify minimal scopes required for desired functionality to avoid CASA audits',
      'Generate step-by-step developer checklist with direct GCP links',
      'Draft compliant Privacy Policy section adhering to Google Limited Use requirements',
      'Validate redirect URI format and state parameter implementation',
      'Draft submission script and video walkthrough storyboard'
    ],
    developerResponsibilities: [
      'Create and log into Google Cloud Platform account with corporate credentials',
      'Verify domain ownership in Google Search Console (DNS TXT record)',
      'Record and upload the unlisted YouTube demonstration video',
      'Pay any third-party CASA security assessment fees if required',
      'Accept Google Developer APIs Terms of Service'
    ],
    evidenceMatrix: [
      {
        claim: 'Google OAuth 2.0 requires HTTPS for all redirect URIs except localhost',
        value: 'Strict HTTPS enforced; http://localhost and http://127.0.0.1 allowed for development',
        status: 'VERIFIED',
        sourceUrl: 'https://developers.google.com/identity/protocols/oauth2/web-server#uri-validation',
        sourceTitle: 'Google Identity: OAuth 2.0 for Web Server Applications',
        supportingExcerpt: 'Authorized redirect URIs must use HTTPS, not HTTP, with the exception of localhost URLs.',
        retrievedAt: '2025-05-15'
      },
      {
        claim: 'Restricted scopes trigger CASA Tier 2/3 security audit',
        value: 'Mandatory independent third-party lab assessment',
        status: 'VERIFIED',
        sourceUrl: 'https://appdefensealliance.dev/casa/tier-requirements',
        sourceTitle: 'App Defense Alliance: CASA Tier Requirements',
        supportingExcerpt: 'Applications requesting restricted Google scopes must obtain CASA Tier 2 or Tier 3 assessment through an approved third-party laboratory.',
        retrievedAt: '2025-05-15'
      },
      {
        claim: 'Composio Managed OAuth available for Google Workspace',
        value: 'Full managed authentication supported in Composio toolkit',
        status: 'VERIFIED',
        sourceUrl: 'https://docs.composio.dev/toolkits/managed-auth',
        sourceTitle: 'Composio Documentation: Managed Auth Toolkit',
        supportingExcerpt: 'Composio provides managed OAuth apps for Google tools including Gmail, Calendar, and Drive, eliminating independent verification overhead.',
        retrievedAt: '2025-05-15'
      }
    ],
    sources: [
      {
        title: 'Using OAuth 2.0 to Access Google APIs',
        url: 'https://developers.google.com/identity/protocols/oauth2',
        domain: 'developers.google.com',
        supports: 'OAuth endpoints, parameter semantics, and token refresh behavior',
        excerpt: 'Google APIs use the OAuth 2.0 protocol for authentication and authorization.',
        lastChecked: '2025-05-15'
      },
      {
        title: 'OAuth API Verification FAQs',
        url: 'https://support.google.com/cloud/answer/9110914',
        domain: 'support.google.com',
        supports: 'Verification timeline, testing limitations, and rejection causes',
        excerpt: 'Verification process typically takes 3-7 business days for sensitive scopes.',
        lastChecked: '2025-05-15'
      },
      {
        title: 'Composio Managed Authentication Docs',
        url: 'https://docs.composio.dev/toolkits/managed-auth',
        domain: 'docs.composio.dev',
        supports: 'Composio managed auth availability and implementation path',
        excerpt: 'Managed Auth enables zero-configuration OAuth for agentic integrations.',
        lastChecked: '2025-05-15'
      }
    ],
    confidence: {
      score: 96,
      level: 'High',
      explanation: 'Verified directly against official Google Identity documentation, App Defense Alliance specifications, and Composio documentation.'
    },
    uncertainties: [
      'Exact verification turnaround varies dynamically with Google Trust & Safety queue volume (ranges from 72 hours up to 4 weeks during holiday spikes).'
    ],
    generatedAt: '2025-05-15T00:00:00Z',
    lastResearchedAt: '2025-05-15T00:00:00Z',
    researchStatus: 'completed'
  },
  {
    slug: 'slack',
    shareId: 'slack-auth-guide-v1',
    applicationName: 'Slack',
    website: 'https://slack.com',
    logo: 'https://a.slack-edge.com/80588/marketing/img/meta/slack_hash_256.png',
    overview: {
      summary: 'Slack uses OAuth v2 for granting bots and user tokens granular permissions in specific workspaces. Scopes are divided cleanly into Bot Token Scopes (prefixed with `bot`) and User Token Scopes. Internal workspace installation is instant; publishing to the public Slack App Directory requires security review.',
      howOAuthWorks: 'Users are redirected to https://slack.com/oauth/v2/authorize with client_id, scope (bot scopes), and user_scope. Slack returns an authorization code exchanged at https://slack.com/api/oauth.v2.access for an access_token (bot token xoxb- or user token xoxp-) and authed_user details.',
      customOAuthNeeded: true,
      managedOAuthAvailable: true,
      overallDifficulty: 'Medium',
      difficultyReason: 'Straightforward to implement for single workspaces, but requires managing workspace-level installs, handling bot vs user token scopes, and navigating workspace administrator approval policies.'
    },
    composio: {
      isManagedSupported: true,
      managedStatus: 'Available',
      recommendedPath: 'managed',
      recommendationReason: 'Composio handles multi-workspace token management, team switching, token renewal, and webhook payload routing automatically.',
      composioToolkitSlug: 'slack',
      composioDocsUrl: 'https://docs.composio.dev/toolkits/managed-auth',
      whatComposioManages: [
        'Pre-configured Slack App credentials and callback endpoints',
        'Automatic workspace switching and token association',
        'Real-time event subscription webhook forwarding'
      ],
      whatDeveloperStillNeeds: [
        'Composio API key',
        'Workspace invitation link for end-user authorization'
      ]
    },
    timeEstimates: {
      activeSetupMinutes: { min: 20, max: 45 },
      activeSetupExplanation: 'Creating Slack app at api.slack.com/apps, configuring OAuth & Permissions, adding redirect URLs, selecting bot scopes, and installing to test workspace.',
      approvalWaitingDays: { min: 0, max: 0 },
      approvalWaitingExplanation: '0 days for private/custom apps installed in your own workspace. If distributing publicly via Slack App Directory, review takes 2-4 weeks.',
      externalDependencies: [
        'Slack account and workspace admin privileges (or workspace admin to approve custom app installation)'
      ],
      evidenceBehindEstimates: 'Slack API Official Documentation on OAuth v2 and App Directory Review Guidelines.'
    },
    prerequisites: [
      'Slack workspace with permission to install custom apps',
      'HTTPS redirect endpoint',
      'List of required bot and user permission scopes'
    ],
    setupSteps: [
      {
        stepNumber: 1,
        title: 'Create Slack App',
        explanation: 'Create your application in the Slack API developer portal.',
        exactAction: 'Navigate to https://api.slack.com/apps > Click "Create New App" > Select "From scratch" > Enter App Name and choose Development Slack Workspace.',
        portalLink: 'https://api.slack.com/apps',
        expectedResult: 'App dashboard appears with Basic Information and App Credentials (App ID, Client ID, Client Secret).',
        commonMistakes: ['Selecting the wrong workspace as your development workspace; you cannot change this later.']
      },
      {
        stepNumber: 2,
        title: 'Configure Redirect URLs',
        explanation: 'Specify where Slack sends the authorization code after workspace authorization.',
        exactAction: 'Click "OAuth & Permissions" in the left sidebar > Scroll to "Redirect URLs" > Click "Add New Redirect URL" > Enter your callback HTTPS URL > Click "Save URLs".',
        portalLink: 'https://api.slack.com/apps',
        expectedResult: 'Redirect URL is saved.',
        commonMistakes: ['Forgetting to click "Save URLs" button after adding the entry.']
      },
      {
        stepNumber: 3,
        title: 'Assign Bot Token Scopes',
        explanation: 'Choose what your bot agent can read and write in the workspace.',
        exactAction: 'Under "OAuth & Permissions", scroll to "Scopes" > "Bot Token Scopes" > Add: chat:write, channels:history, channels:read, app_mentions:read.',
        portalLink: 'https://api.slack.com/apps',
        expectedResult: 'Selected scopes appear in the Bot Token Scopes table.',
        commonMistakes: ['Adding scopes under User Token Scopes when you intend the bot to perform the actions autonomously.']
      },
      {
        stepNumber: 4,
        title: 'Install to Development Workspace',
        explanation: 'Generate the first test bot token (`xoxb-`) by installing directly to your workspace.',
        exactAction: 'Scroll up to the top of "OAuth & Permissions" > Click "Install to Workspace" > Review permissions and click "Allow".',
        portalLink: 'https://api.slack.com/apps',
        expectedResult: 'Bot User OAuth Token (`xoxb-...`) is generated and visible.',
        commonMistakes: ['Reinstalling the app after changing scopes is required; otherwise new scopes do not take effect.']
      },
      {
        stepNumber: 5,
        title: 'Enable Public Distribution (If Multi-Workspace)',
        explanation: 'If you want users outside your development workspace to connect, activate public distribution.',
        exactAction: 'Navigate to "Manage Distribution" in left sidebar > Complete the checklist (App Icon, Description, Redirect URLs) > Click "Activate Public Distribution".',
        portalLink: 'https://api.slack.com/apps',
        expectedResult: 'Sharable Add to Slack button and public authorization URL become active.',
        commonMistakes: ['Not activating public distribution causes error "team_not_authorized" when external users attempt to connect.']
      }
    ],
    oauthConfiguration: {
      authorizationEndpoint: 'https://slack.com/oauth/v2/authorize',
      tokenEndpoint: 'https://slack.com/api/oauth.v2.access',
      redirectUriExample: 'https://api.yourdomain.com/auth/slack/callback',
      supportedFlows: ['Authorization Code Flow (OAuth v2)'],
      pkceSupported: false,
      tokenRefresh: 'Slack bot tokens (xoxb-) are non-expiring by default unless token rotation is explicitly enabled in app settings. If rotation is enabled, refresh tokens expire after 12 hours.',
      securityConsiderations: [
        'Validate the Slack request signing secret (`X-Slack-Signature`) on all incoming webhook and slash command payloads.',
        'Never expose Bot User OAuth Tokens (xoxb-) in client-side code.'
      ]
    },
    scopes: [
      {
        name: 'chat:write',
        description: 'Send messages as the bot in channels it has joined',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'channels:history',
        description: 'View messages and other content in public channels',
        sensitivity: 'Sensitive',
        triggersReview: false
      },
      {
        name: 'app_mentions:read',
        description: 'View messages that mention your bot agent',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'commands',
        description: 'Add slash commands and shortcuts',
        sensitivity: 'Standard',
        triggersReview: false
      }
    ],
    verificationRequirements: {
      reviewRequired: false,
      verificationTriggers: [
        'Submission to Slack App Directory (not required for direct multi-tenant OAuth installations)'
      ],
      requiredDocuments: [
        'App Icon (512x512px)',
        'Detailed App Description & Support URL',
        'Privacy Policy URL'
      ],
      testingModeLimitations: 'None for your development workspace. Non-distributed apps can only be installed in the creator\'s workspace.',
      submissionProcess: 'Submit via "Submit to App Directory" tab in api.slack.com/apps.',
      rejectionReasons: [
        'Inadequate error handling on disconnected webhooks',
        'Requesting excessive scopes without clear user value',
        'Failing to handle Slack Rate Limits (HTTP 429)'
      ],
      approvalDistinction: 'Slack App Directory approval (for public marketplace discovery) vs Workspace Administrator approval (per-workspace installation approval setting).'
    },
    blockers: [
      {
        issue: 'team_not_authorized error during OAuth flow',
        whyItHappens: 'Public distribution is disabled, so users outside the development workspace cannot authorize.',
        howToIdentify: 'OAuth screen shows "You are not authorized to install this app".',
        howToFix: 'In Slack API portal, go to "Manage Distribution" and activate "Public Distribution".',
        agentCanHelp: true,
        agentHelpDetails: 'Agent can identify missing requirements in the Manage Distribution checklist.'
      },
      {
        issue: 'missing_scope error on API call',
        whyItHappens: 'A new scope was added to the Slack app settings, but the app was not reinstalled to the workspace.',
        howToIdentify: 'API response body returns {"ok": false, "error": "missing_scope", "needed": "...", "provided": "..."}',
        howToFix: 'Click "Reinstall to Workspace" on the OAuth & Permissions page in the Slack developer portal.',
        agentCanHelp: true,
        agentHelpDetails: 'Agent can parse the error response and specify the exact reinstall URL.'
      }
    ],
    agentResponsibilities: [
      'Discover exact bot vs user scope strings',
      'Generate OAuth redirect URL with encoded scopes and state token',
      'Construct exchange request for /api/oauth.v2.access',
      'Verify Slack request signature implementation in backend'
    ],
    developerResponsibilities: [
      'Create Slack App in api.slack.com/apps',
      'Obtain workspace admin approval for custom integrations',
      'Safely store Client Secret and Signing Secret in environment variables'
    ],
    evidenceMatrix: [
      {
        claim: 'Slack bot tokens are non-expiring by default unless token rotation is enabled',
        value: 'Permanent tokens default; optional 12-hour refresh token rotation',
        status: 'VERIFIED',
        sourceUrl: 'https://api.slack.com/authentication/rotation',
        sourceTitle: 'Slack API: Rotating tokens',
        supportingExcerpt: 'By default, Slack access tokens do not expire. You can optionally enable token rotation to receive 12-hour expiring access tokens.',
        retrievedAt: '2025-05-15'
      },
      {
        claim: 'Public distribution does not require App Directory listing to work across multiple workspaces',
        value: 'Direct install links work immediately once Public Distribution is toggled on',
        status: 'VERIFIED',
        sourceUrl: 'https://api.slack.com/start/distributing/public_distribution',
        sourceTitle: 'Slack API: Distributing your app publicly',
        supportingExcerpt: 'You can share your app with any Slack team without listing it in the App Directory by turning on Public Distribution.',
        retrievedAt: '2025-05-15'
      }
    ],
    sources: [
      {
        title: 'Slack OAuth v2 Documentation',
        url: 'https://api.slack.com/authentication/oauth-v2',
        domain: 'api.slack.com',
        supports: 'OAuth v2 flow endpoints, parameters, and response structure',
        excerpt: 'Use the OAuth v2 flow to request token scopes from Slack teams.',
        lastChecked: '2025-05-15'
      }
    ],
    confidence: {
      score: 98,
      level: 'High',
      explanation: 'Verified directly against Slack API official reference and tested OAuth v2 specification.'
    },
    uncertainties: [],
    generatedAt: '2025-05-15T00:00:00Z',
    lastResearchedAt: '2025-05-15T00:00:00Z',
    researchStatus: 'completed'
  },
  {
    slug: 'github',
    shareId: 'github-auth-guide-v1',
    applicationName: 'GitHub',
    website: 'https://github.com',
    logo: 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png',
    overview: {
      summary: 'GitHub provides OAuth Apps for simple user authentication and identity, and GitHub Apps for fine-grained permissions and server-to-server installations. Setup is instantaneous with zero external approval required for user accounts.',
      howOAuthWorks: 'Users are redirected to https://github.com/login/oauth/authorize with client_id, scope, and state. The received code is POSTed to https://github.com/login/oauth/access_token with client_secret to receive an access_token. GitHub supports both bearer header auth and fine-grained repository permissions.',
      customOAuthNeeded: false,
      managedOAuthAvailable: true,
      overallDifficulty: 'Easy',
      difficultyReason: 'GitHub has one of the cleanest developer onboarding flows in the industry: immediate credential generation, no mandatory verification delay, and clear documentation.'
    },
    composio: {
      isManagedSupported: true,
      managedStatus: 'Available',
      recommendedPath: 'managed',
      recommendationReason: 'Composio provides managed GitHub authentication for committing code, opening pull requests, and reading repositories with zero app setup needed.',
      composioToolkitSlug: 'github',
      composioDocsUrl: 'https://docs.composio.dev/toolkits/managed-auth',
      whatComposioManages: [
        'GitHub OAuth Application registration',
        'Secure multi-tenant token storage',
        'Repository and organization webhook routing'
      ],
      whatDeveloperStillNeeds: [
        'Composio API key'
      ]
    },
    timeEstimates: {
      activeSetupMinutes: { min: 10, max: 20 },
      activeSetupExplanation: 'Registering OAuth App in GitHub Developer Settings, setting homepage and callback URL, and copying credentials.',
      approvalWaitingDays: { min: 0, max: 0 },
      approvalWaitingExplanation: 'Instantaneous. No review or approval required.',
      externalDependencies: [
        'GitHub Account'
      ],
      evidenceBehindEstimates: 'GitHub Docs: Creating an OAuth App.'
    },
    prerequisites: [
      'GitHub account',
      'Application callback URL'
    ],
    setupSteps: [
      {
        stepNumber: 1,
        title: 'Open Developer Settings in GitHub',
        explanation: 'Access your account or organization developer portal.',
        exactAction: 'Click your profile photo > Settings > Developer settings (bottom left) > OAuth Apps.',
        portalLink: 'https://github.com/settings/developers',
        expectedResult: 'OAuth Apps management screen is displayed.',
        commonMistakes: ['Creating a GitHub App when you specifically require a traditional user OAuth App.']
      },
      {
        stepNumber: 2,
        title: 'Register a New Application',
        explanation: 'Register your application details with GitHub.',
        exactAction: 'Click "New OAuth App" > Fill "Application name", "Homepage URL", and "Authorization callback URL" > Click "Register application".',
        portalLink: 'https://github.com/settings/applications/new',
        expectedResult: 'App details page shows your Client ID.',
        commonMistakes: ['Leaving callback URL with an invalid port or protocol.']
      },
      {
        stepNumber: 3,
        title: 'Generate Client Secret',
        explanation: 'Create a confidential secret used for token exchanges.',
        exactAction: 'Under "Client secrets", click "Generate a new client secret" > Copy the secret string immediately.',
        portalLink: 'https://github.com/settings/developers',
        expectedResult: 'Client secret is displayed once.',
        commonMistakes: ['Failing to save the client secret before navigating away.']
      }
    ],
    oauthConfiguration: {
      authorizationEndpoint: 'https://github.com/login/oauth/authorize',
      tokenEndpoint: 'https://github.com/login/oauth/access_token',
      redirectUriExample: 'https://api.yourdomain.com/auth/github/callback',
      supportedFlows: ['Web Application Flow (Authorization Code)'],
      pkceSupported: false,
      tokenRefresh: 'Traditional GitHub OAuth access tokens do not expire unless explicitly configured in beta token expiration settings.',
      securityConsiderations: [
        'Specify `Accept: application/json` header when calling https://github.com/login/oauth/access_token, otherwise GitHub returns form-urlencoded data.',
        'Always validate state parameter against CSRF.'
      ]
    },
    scopes: [
      {
        name: 'read:user',
        description: 'Read user profile data',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'repo',
        description: 'Full control of private and public repositories',
        sensitivity: 'Sensitive',
        triggersReview: false
      },
      {
        name: 'workflow',
        description: 'Update GitHub Action workflows',
        sensitivity: 'Sensitive',
        triggersReview: false
      }
    ],
    verificationRequirements: {
      reviewRequired: false,
      verificationTriggers: [],
      requiredDocuments: [],
      testingModeLimitations: 'None',
      submissionProcess: 'None required for standard OAuth usage.',
      rejectionReasons: [],
      approvalDistinction: 'Personal user authorizations are instant. When a user connects on behalf of an Organization with Third-Party Application Restrictions enabled, an Organization Owner must click Approve.'
    },
    blockers: [
      {
        issue: 'Organization access restricted / Org owners must approve',
        whyItHappens: 'Organization has third-party application access restrictions enabled.',
        howToIdentify: 'Repositories belonging to the organization do not show up even after authorizing.',
        howToFix: 'Request organization approval from the GitHub OAuth authorization consent screen or Org Settings > Third-party access.',
        agentCanHelp: true,
        agentHelpDetails: 'Agent can check whether the token has org access via GET /user/orgs and explain how to request owner approval.'
      }
    ],
    agentResponsibilities: [
      'Format authorization URL with encoded scopes',
      'Execute code-to-token exchange with correct Accept: application/json header',
      'Handle rate limit headers (X-RateLimit-Remaining)'
    ],
    developerResponsibilities: [
      'Create OAuth App under personal account or company GitHub organization',
      'Store Client Secret in secure environment configuration'
    ],
    evidenceMatrix: [
      {
        claim: 'GitHub token endpoint returns form-urlencoded by default unless Accept header specified',
        value: 'Requires Accept: application/json header for JSON response',
        status: 'VERIFIED',
        sourceUrl: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#2-users-are-redirected-back-to-your-site-by-github',
        sourceTitle: 'GitHub Docs: Authorizing OAuth Apps',
        supportingExcerpt: 'By default, the response takes the following form: access_token=gho_16C7e42F292c6912E7710c838347Ae178B4a&token_type=bearer. To receive JSON, send Accept: application/json.',
        retrievedAt: '2025-05-15'
      }
    ],
    sources: [
      {
        title: 'Authorizing OAuth Apps in GitHub',
        url: 'https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps',
        domain: 'docs.github.com',
        supports: 'Full OAuth endpoints and token exchange details',
        excerpt: 'Detailed specification of GitHub OAuth authorization flow.',
        lastChecked: '2025-05-15'
      }
    ],
    confidence: {
      score: 100,
      level: 'High',
      explanation: 'Verified against authoritative GitHub Docs.'
    },
    uncertainties: [],
    generatedAt: '2025-05-15T00:00:00Z',
    lastResearchedAt: '2025-05-15T00:00:00Z',
    researchStatus: 'completed'
  },
  {
    slug: 'notion',
    shareId: 'notion-auth-guide-v1',
    applicationName: 'Notion',
    website: 'https://notion.so',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png',
    overview: {
      summary: 'Notion uses OAuth 2.0 to connect integrations to specific Notion workspaces. Unlike many APIs that grant workspace-wide read/write permissions upfront, Notion requires the user to select specific pages during authorization or share pages with the integration afterward.',
      howOAuthWorks: 'Users authorize via https://api.notion.com/v1/oauth/authorize with client_id, response_type=code, owner=user, and redirect_uri. Code is exchanged via HTTP Basic Auth at https://api.notion.com/v1/oauth/token with client_id:client_secret base64-encoded in Authorization header.',
      customOAuthNeeded: true,
      managedOAuthAvailable: true,
      overallDifficulty: 'Medium',
      difficultyReason: 'Notion requires HTTP Basic Authentication in the token exchange header (rather than request body parameters) and requires users to explicitly grant page access during the consent flow, which causes frequent developer confusion.'
    },
    composio: {
      isManagedSupported: true,
      managedStatus: 'Available',
      recommendedPath: 'managed',
      recommendationReason: 'Composio Managed Notion OAuth provides pre-configured public integration settings and handles the page selection nuances automatically.',
      composioToolkitSlug: 'notion',
      composioDocsUrl: 'https://docs.composio.dev/toolkits/managed-auth',
      whatComposioManages: [
        'Public integration registration and maintenance',
        'Basic Auth token exchange orchestration',
        'Multi-tenant workspace token association'
      ],
      whatDeveloperStillNeeds: ['Composio API key']
    },
    timeEstimates: {
      activeSetupMinutes: { min: 20, max: 35 },
      activeSetupExplanation: 'Creating integration in Notion My Integrations portal, configuring Public Integration, and setting redirect URIs.',
      approvalWaitingDays: { min: 0, max: 0 },
      approvalWaitingExplanation: '0 days for public integrations using direct OAuth links. No approval wait unless submitting to the Notion Integration Gallery.',
      externalDependencies: ['Notion account with at least one workspace.'],
      evidenceBehindEstimates: 'Notion Developers: Authorization Guide.'
    },
    prerequisites: [
      'Notion account with workspace ownership',
      'Integration icon (280x280px)',
      'Privacy Policy & Terms of Service URLs (for Public Integrations)'
    ],
    setupSteps: [
      {
        stepNumber: 1,
        title: 'Create New Integration in Notion',
        explanation: 'Create an integration in the Notion Developer Portal.',
        exactAction: 'Navigate to https://www.notion.so/profile/integrations > Click "+ New integration" > Enter Name and associated workspace.',
        portalLink: 'https://www.notion.so/profile/integrations',
        expectedResult: 'Internal integration is created with Internal Integration Secret.',
        commonMistakes: ['Keeping the integration as "Internal" when building multi-user OAuth.']
      },
      {
        stepNumber: 2,
        title: 'Convert to Public Integration',
        explanation: 'Switch integration type from Internal to Public to unlock the OAuth 2.0 flow.',
        exactAction: 'In integration settings, click "Distribution" > Toggle to "Public integration" > Fill Company name, Website, Privacy Policy URL, Terms of Service URL, and Redirect URIs > Click "Submit".',
        portalLink: 'https://www.notion.so/profile/integrations',
        expectedResult: 'OAuth Client ID and OAuth Client Secret become available.',
        commonMistakes: ['Forgetting to fill Privacy Policy and Terms URLs, which disables the Public distribution toggle.']
      },
      {
        stepNumber: 3,
        title: 'Execute OAuth Token Exchange with Basic Auth',
        explanation: 'Exchange the authorization code for an access token using HTTP Basic Auth.',
        exactAction: 'POST to https://api.notion.com/v1/oauth/token with header Authorization: Basic base64(client_id:client_secret) and body { grant_type: "authorization_code", code, redirect_uri }.',
        expectedResult: 'Returns access_token, workspace_id, workspace_name, and bot_id.',
        commonMistakes: ['Passing client_id and client_secret in the JSON body instead of the HTTP Basic Auth header, causing 401 unauthorized.']
      }
    ],
    oauthConfiguration: {
      authorizationEndpoint: 'https://api.notion.com/v1/oauth/authorize',
      tokenEndpoint: 'https://api.notion.com/v1/oauth/token',
      redirectUriExample: 'https://api.yourdomain.com/auth/notion/callback',
      supportedFlows: ['Authorization Code Flow'],
      pkceSupported: false,
      tokenRefresh: 'Notion access tokens are permanent and do not expire.',
      securityConsiderations: [
        'Must use HTTP Basic Auth header for /oauth/token endpoint.',
        'Integration only has access to pages explicitly shared with it by the user during or after OAuth.'
      ]
    },
    scopes: [
      {
        name: 'read_content',
        description: 'Read content from pages and databases',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'insert_content',
        description: 'Insert new pages and comments',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'update_content',
        description: 'Update page content and properties',
        sensitivity: 'Standard',
        triggersReview: false
      }
    ],
    verificationRequirements: {
      reviewRequired: false,
      verificationTriggers: ['Gallery listing only'],
      requiredDocuments: ['Privacy Policy URL', 'Terms of Service URL'],
      testingModeLimitations: 'None',
      submissionProcess: 'Direct OAuth distribution requires no review.',
      rejectionReasons: [],
      approvalDistinction: 'Direct public OAuth requires no approval. Listing in Notion App Gallery requires editorial review.'
    },
    blockers: [
      {
        issue: 'object_not_found error when querying Notion pages',
        whyItHappens: 'The user did not select the page during OAuth consent or did not share it via the "..." menu.',
        howToIdentify: 'API returns HTTP 404 {"object": "error", "status": 404, "code": "object_not_found"}.',
        howToFix: 'Instruct the user to open the target page in Notion > Click "..." > Connections > Add your integration.',
        agentCanHelp: true,
        agentHelpDetails: 'Agent can guide the end-user with screenshots/instructions on sharing pages with Notion integrations.'
      }
    ],
    agentResponsibilities: [
      'Format Basic Auth header encoding for token exchange',
      'Handle Notion-Version API header (e.g. 2022-06-28)',
      'Parse workspace metadata from token response'
    ],
    developerResponsibilities: [
      'Host public Privacy Policy and Terms URLs',
      'Convert integration to Public in Notion portal'
    ],
    evidenceMatrix: [
      {
        claim: 'Notion token endpoint requires HTTP Basic Authentication in Authorization header',
        value: 'Authorization: Basic base64(client_id:client_secret)',
        status: 'VERIFIED',
        sourceUrl: 'https://developers.notion.com/docs/authorization#step-4-send-the-code-in-a-post-request-to-the-notion-api',
        sourceTitle: 'Notion Developers: Authorization',
        supportingExcerpt: 'Set the Authorization header to Basic <base64 encoded client_id:client_secret>.',
        retrievedAt: '2025-05-15'
      }
    ],
    sources: [
      {
        title: 'Notion Authorization Guide',
        url: 'https://developers.notion.com/docs/authorization',
        domain: 'developers.notion.com',
        supports: 'Complete OAuth flow and Public integration conversion steps',
        excerpt: 'Explains building public OAuth integrations with Notion.',
        lastChecked: '2025-05-15'
      }
    ],
    confidence: {
      score: 98,
      level: 'High',
      explanation: 'Verified directly with Notion official API specs.'
    },
    uncertainties: [],
    generatedAt: '2025-05-15T00:00:00Z',
    lastResearchedAt: '2025-05-15T00:00:00Z',
    researchStatus: 'completed'
  },
  {
    slug: 'discord',
    shareId: 'discord-auth-guide-v1',
    applicationName: 'Discord',
    website: 'https://discord.com',
    logo: 'https://assets-global.website-files.com/6257adef93867e50d84d30e2/636e0a6a49cf127bf92de1e2_icon_clyde_blurple_RGB.png',
    overview: {
      summary: 'Discord provides OAuth2 for user identity authentication and bot installation into guilds (servers). Bot authorization uses permissions integer bitmasks in combination with OAuth scopes.',
      howOAuthWorks: 'Users are directed to https://discord.com/oauth2/authorize with client_id, response_type=code, scope, and optional permissions bitmask. Tokens are exchanged at https://discord.com/api/v10/oauth2/token using form-urlencoded parameters.',
      customOAuthNeeded: false,
      managedOAuthAvailable: true,
      overallDifficulty: 'Easy',
      difficultyReason: 'Fast setup without initial review delays; bot verification is only triggered when the bot joins 100+ Discord guilds.'
    },
    composio: {
      isManagedSupported: true,
      managedStatus: 'Available',
      recommendedPath: 'managed',
      recommendationReason: 'Composio provides managed Discord authentication for messaging, voice events, and slash commands without bot configuration headaches.',
      composioToolkitSlug: 'discord',
      composioDocsUrl: 'https://docs.composio.dev/toolkits/managed-auth',
      whatComposioManages: [
        'Discord Bot and OAuth application credentials',
        'Gateway websocket connection lifecycle',
        'Token refresh and guild authorization routing'
      ],
      whatDeveloperStillNeeds: ['Composio API key']
    },
    timeEstimates: {
      activeSetupMinutes: { min: 15, max: 30 },
      activeSetupExplanation: 'Creating application in Discord Developer Portal, creating Bot user, setting OAuth2 redirects, and calculating permissions bitwise integer.',
      approvalWaitingDays: { min: 0, max: 0 },
      approvalWaitingExplanation: '0 days initially. Bot verification (ID/business verification) only required once bot reaches 100 servers.',
      externalDependencies: ['Discord account with verified phone number/2FA.'],
      evidenceBehindEstimates: 'Discord Developer Documentation: OAuth2 & Bot Verification.'
    },
    prerequisites: [
      'Discord account with 2FA enabled',
      'Redirect URI'
    ],
    setupSteps: [
      {
        stepNumber: 1,
        title: 'Create Application in Discord Developer Portal',
        explanation: 'Create the top-level application container.',
        exactAction: 'Navigate to https://discord.com/developers/applications > Click "New Application" > Enter Name > Accept Developer Terms.',
        portalLink: 'https://discord.com/developers/applications',
        expectedResult: 'Application General Information page loads with Application ID and Public Key.',
        commonMistakes: ['Naming application with restricted terms like "Discord" or "Clyde".']
      },
      {
        stepNumber: 2,
        title: 'Configure OAuth2 Redirects',
        explanation: 'Set up redirect URIs and inspect Client Secret.',
        exactAction: 'Click "OAuth2" in sidebar > Under "Redirects", click "Add Redirect" > Enter callback URL > Click "Save Changes".',
        portalLink: 'https://discord.com/developers/applications',
        expectedResult: 'Redirects are saved.',
        commonMistakes: ['Forgetting to click the floating Save Changes bar at the bottom of the screen.']
      },
      {
        stepNumber: 3,
        title: 'Create Bot and Privileged Gateway Intents',
        explanation: 'If your agent interacts as a bot, generate the bot token and toggle required intents.',
        exactAction: 'Click "Bot" in sidebar > Click "Reset Token" to copy bot token > Toggle "Message Content Intent" if reading channel text.',
        portalLink: 'https://discord.com/developers/applications',
        expectedResult: 'Bot is active and privileged intents configured.',
        commonMistakes: ['Forgetting to enable Message Content Intent, which causes messages to arrive with empty content strings.']
      }
    ],
    oauthConfiguration: {
      authorizationEndpoint: 'https://discord.com/oauth2/authorize',
      tokenEndpoint: 'https://discord.com/api/v10/oauth2/token',
      redirectUriExample: 'https://api.yourdomain.com/auth/discord/callback',
      supportedFlows: ['Authorization Code Grant', 'Client Credentials Grant', 'Implicit Grant (Deprecated)'],
      pkceSupported: false,
      tokenRefresh: 'Access tokens expire in 604800 seconds (7 days). Token refresh requires POST to /oauth2/token with grant_type=refresh_token and refresh_token parameter.',
      securityConsiderations: [
        'Endpoint requires Content-Type: application/x-www-form-urlencoded.',
        'Never publish Bot Token or Client Secret in public repositories.'
      ]
    },
    scopes: [
      {
        name: 'identify',
        description: 'Read user id, username, avatar, and banner',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'bot',
        description: 'Add the bot to a server with specified permissions',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'guilds',
        description: 'Read user list of joined Discord guilds',
        sensitivity: 'Standard',
        triggersReview: false
      }
    ],
    verificationRequirements: {
      reviewRequired: false,
      verificationTriggers: ['Bot reaches 100 guilds (servers)'],
      requiredDocuments: ['Government ID of developer or company business registration for Stripe Identity verification'],
      testingModeLimitations: 'Unverified bots cannot join more than 100 servers.',
      submissionProcess: 'Submit via "Verification" tab once 100-guild threshold is reached.',
      rejectionReasons: ['Failing identity check', 'Terms of Service violations'],
      approvalDistinction: 'Server Admin approval (installing bot into specific guild) vs Discord Bot Verification (platform-wide certification).'
    },
    blockers: [
      {
        issue: 'Bot receives empty message content ("")',
        whyItHappens: 'Message Content Intent is not enabled in Discord Developer Portal.',
        howToIdentify: 'Message object contains message ID and author, but content is empty string.',
        howToFix: 'Go to Discord Developer Portal > App > Bot > Scroll to Privileged Gateway Intents > Enable "Message Content Intent".',
        agentCanHelp: true,
        agentHelpDetails: 'Agent can identify missing gateway intents and provide direct portal navigation instructions.'
      }
    ],
    agentResponsibilities: [
      'Calculate bitwise permission flags integer for bot authorization URL',
      'Format urlencoded payload for token endpoint',
      'Implement refresh token rotation before 7-day expiration'
    ],
    developerResponsibilities: [
      'Enable 2FA on Discord account',
      'Submit government ID if bot reaches 100 guilds'
    ],
    evidenceMatrix: [
      {
        claim: 'Discord token exchange requires application/x-www-form-urlencoded format',
        value: 'JSON body is rejected by Discord OAuth token endpoint',
        status: 'VERIFIED',
        sourceUrl: 'https://discord.com/developers/docs/topics/oauth2#authorization-code-grant-token-exchange-example',
        sourceTitle: 'Discord Docs: Token Exchange Example',
        supportingExcerpt: 'The endpoint must be requested with a POST body that is application/x-www-form-urlencoded.',
        retrievedAt: '2025-05-15'
      }
    ],
    sources: [
      {
        title: 'Discord OAuth2 Documentation',
        url: 'https://discord.com/developers/docs/topics/oauth2',
        domain: 'discord.com',
        supports: 'OAuth2 endpoints, flow, and parameters',
        excerpt: 'Discord OAuth2 API reference and guidelines.',
        lastChecked: '2025-05-15'
      }
    ],
    confidence: {
      score: 98,
      level: 'High',
      explanation: 'Verified against Discord developer API documentation.'
    },
    uncertainties: [],
    generatedAt: '2025-05-15T00:00:00Z',
    lastResearchedAt: '2025-05-15T00:00:00Z',
    researchStatus: 'completed'
  },
  {
    slug: 'linear',
    shareId: 'linear-auth-guide-v1',
    applicationName: 'Linear',
    website: 'https://linear.app',
    logo: 'https://linear.app/static/apple-touch-icon.png',
    overview: {
      summary: 'Linear uses modern OAuth 2.0 with full PKCE (Proof Key for Code Exchange) support and granular actor scopes (read, write, issues:create, admin). Applications can be created instantly within any Linear workspace.',
      howOAuthWorks: 'Users are redirected to https://linear.app/oauth/authorize with client_id, redirect_uri, response_type=code, scope, and code_challenge (PKCE). Tokens are exchanged at https://api.linear.app/oauth/token with client_id, client_secret (or code_verifier for PKCE).',
      customOAuthNeeded: false,
      managedOAuthAvailable: true,
      overallDifficulty: 'Easy',
      difficultyReason: 'Exceptional developer ergonomics: instant application creation, full support for PKCE, clear GraphQL API documentation, and no waiting period for review.'
    },
    composio: {
      isManagedSupported: true,
      managedStatus: 'Available',
      recommendedPath: 'managed',
      recommendationReason: 'Composio provides managed Linear OAuth for creating issues, querying project roadmaps, and assigning cycles with zero setup.',
      composioToolkitSlug: 'linear',
      composioDocsUrl: 'https://docs.composio.dev/toolkits/managed-auth',
      whatComposioManages: [
        'Pre-registered Linear OAuth Application',
        'Automatic workspace token management',
        'GraphQL request signing and proxying'
      ],
      whatDeveloperStillNeeds: ['Composio API key']
    },
    timeEstimates: {
      activeSetupMinutes: { min: 10, max: 20 },
      activeSetupExplanation: 'Creating application in Linear Workspace Settings > API > Applications, configuring callback URL and scopes.',
      approvalWaitingDays: { min: 0, max: 0 },
      approvalWaitingExplanation: '0 days. Applications can be authorized by any workspace immediately.',
      externalDependencies: ['Linear account with an existing workspace.'],
      evidenceBehindEstimates: 'Linear Developers Documentation: Authentication & OAuth.'
    },
    prerequisites: [
      'Linear workspace',
      'Redirect URI'
    ],
    setupSteps: [
      {
        stepNumber: 1,
        title: 'Open Linear API Settings',
        explanation: 'Access application management in Linear workspace settings.',
        exactAction: 'In Linear, click your workspace name top-left > Settings > API > Applications tab.',
        portalLink: 'https://linear.app/settings/api',
        expectedResult: 'Applications list and "Create new" button appear.',
        commonMistakes: ['Creating a Personal API key instead of an OAuth Application for multi-user tools.']
      },
      {
        stepNumber: 2,
        title: 'Create OAuth Application',
        explanation: 'Register your application name, description, and redirect URIs.',
        exactAction: 'Click "Create new" > Fill Application name, Developer name, and Callback URLs > Click "Create".',
        portalLink: 'https://linear.app/settings/api',
        expectedResult: 'Client ID and Client Secret are displayed.',
        commonMistakes: ['Using non-HTTPS callback URLs for production.']
      },
      {
        stepNumber: 3,
        title: 'Implement Authorization URL with PKCE',
        explanation: 'Generate code_verifier and code_challenge for enhanced security.',
        exactAction: 'Redirect user to https://linear.app/oauth/authorize?response_type=code&client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&scope=read,write,issues:create&actor=application.',
        expectedResult: 'User sees Linear consent screen approving access to their workspace.',
        commonMistakes: ['Not specifying actor=application or actor=user depending on whether actions should be attributed to the bot or user.']
      }
    ],
    oauthConfiguration: {
      authorizationEndpoint: 'https://linear.app/oauth/authorize',
      tokenEndpoint: 'https://api.linear.app/oauth/token',
      redirectUriExample: 'https://api.yourdomain.com/auth/linear/callback',
      supportedFlows: ['Authorization Code Flow with PKCE', 'Standard Authorization Code Flow'],
      pkceSupported: true,
      tokenRefresh: 'Linear access tokens are long-lived by default, or provide refresh tokens if configured.',
      securityConsiderations: [
        'Support PKCE using SHA-256 code challenge.',
        'Use actor=application for actions performed autonomously by an agent.'
      ]
    },
    scopes: [
      {
        name: 'read',
        description: 'Read access to workspace data (issues, teams, projects)',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'write',
        description: 'Write access to update issues and comments',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'issues:create',
        description: 'Create new issues in teams',
        sensitivity: 'Standard',
        triggersReview: false
      },
      {
        name: 'admin',
        description: 'Full workspace administration access',
        sensitivity: 'Sensitive',
        triggersReview: false
      }
    ],
    verificationRequirements: {
      reviewRequired: false,
      verificationTriggers: [],
      requiredDocuments: [],
      testingModeLimitations: 'None',
      submissionProcess: 'Instantaneous direct distribution. No review process for general OAuth authorization.',
      rejectionReasons: [],
      approvalDistinction: 'Workspace member installing the app must have appropriate permission in the target Linear workspace.'
    },
    blockers: [
      {
        issue: 'Invalid actor parameter in authorization URL',
        whyItHappens: 'Linear supports actor=user and actor=application. Misconfigured parameter causes error.',
        howToIdentify: 'Linear OAuth screen displays error regarding actor parameter.',
        howToFix: 'Ensure actor=application (for agent acting on its own behalf) or actor=user is explicitly set.',
        agentCanHelp: true,
        agentHelpDetails: 'Agent can format the query parameters according to Linear OAuth specs.'
      }
    ],
    agentResponsibilities: [
      'Generate cryptographic PKCE code_verifier and code_challenge (S256)',
      'Format authorization URL with correct actor and scope parameters',
      'Execute token exchange with Linear OAuth endpoint'
    ],
    developerResponsibilities: [
      'Register OAuth application in Linear workspace settings',
      'Store Client ID and Secret in environment config'
    ],
    evidenceMatrix: [
      {
        claim: 'Linear supports Proof Key for Code Exchange (PKCE) with S256',
        value: 'code_challenge and code_challenge_method=S256 fully supported',
        status: 'VERIFIED',
        sourceUrl: 'https://developers.linear.app/docs/graphql/working-with-the-graphql-api/authentication#pkce',
        sourceTitle: 'Linear Developers: Authentication & PKCE',
        supportingExcerpt: 'Linear supports PKCE for enhanced security during the authorization code grant flow.',
        retrievedAt: '2025-05-15'
      }
    ],
    sources: [
      {
        title: 'Linear Authentication Documentation',
        url: 'https://developers.linear.app/docs/graphql/working-with-the-graphql-api/authentication',
        domain: 'developers.linear.app',
        supports: 'Complete OAuth flow, actor modes, and scopes',
        excerpt: 'Official Linear API guide for OAuth 2.0 authorization.',
        lastChecked: '2025-05-15'
      }
    ],
    confidence: {
      score: 100,
      level: 'High',
      explanation: 'Verified against authoritative Linear developer documentation.'
    },
    uncertainties: [],
    generatedAt: '2025-05-15T00:00:00Z',
    lastResearchedAt: '2025-05-15T00:00:00Z',
    researchStatus: 'completed'
  }
];
