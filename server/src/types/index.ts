export type EvidenceStatus = 'VERIFIED' | 'INFERRED' | 'UNVERIFIED' | 'BLOCKED';
export type ComplexityLevel = 'Easy' | 'Medium' | 'Difficult';
export type ManagedOAuthStatus = 'Available' | 'Custom Only' | 'Not Yet Verified';

export interface SourceCitation {
  title: string;
  url: string;
  domain: string;
  supports: string;
  excerpt?: string;
  lastChecked: string;
}

export interface EvidenceItem {
  claim: string;
  value: string;
  status: EvidenceStatus;
  sourceUrl: string;
  sourceTitle: string;
  supportingExcerpt: string;
  retrievedAt: string;
}

export interface SetupStep {
  stepNumber: number;
  title: string;
  explanation: string;
  exactAction: string;
  portalLink?: string;
  expectedResult: string;
  commonMistakes: string[];
}

export interface OAuthConfig {
  authorizationEndpoint: string;
  tokenEndpoint: string;
  redirectUriExample: string;
  supportedFlows: string[];
  pkceSupported: boolean;
  tokenRefresh: string;
  securityConsiderations: string[];
}

export interface ScopeInfo {
  name: string;
  description: string;
  sensitivity: 'Standard' | 'Sensitive' | 'Restricted';
  triggersReview: boolean;
}

export interface BlockerItem {
  issue: string;
  whyItHappens: string;
  howToIdentify: string;
  howToFix: string;
  agentCanHelp: boolean;
  agentHelpDetails?: string;
}

export interface Responsibilities {
  agentCan: string[];
  developerMust: string[];
}

export interface TimeEstimates {
  activeSetupMinutes: { min: number; max: number };
  activeSetupExplanation: string;
  approvalWaitingDays: { min: number; max: number };
  approvalWaitingExplanation: string;
  externalDependencies: string[];
  evidenceBehindEstimates: string;
}

export interface ComposioIntelligence {
  isManagedSupported: boolean;
  managedStatus: ManagedOAuthStatus;
  recommendedPath: 'managed' | 'custom' | 'investigate';
  recommendationReason: string;
  composioToolkitSlug?: string;
  composioDocsUrl?: string;
  whatComposioManages: string[];
  whatDeveloperStillNeeds: string[];
}

export interface IApplication {
  name: string;
  slug: string;
  website: string;
  logo: string;
  description: string;
  oauthSupported: boolean;
  complexity: ComplexityLevel;
  estimatedActiveTime: string;
  approvalEstimate: string;
  managedOAuthStatus: ManagedOAuthStatus;
  officialDocs: string;
  lastResearchedAt: string;
  tags?: string[];
}

export interface IGuide {
  applicationId?: string;
  slug: string;
  shareId: string;
  applicationName: string;
  website: string;
  logo?: string;
  overview: {
    summary: string;
    howOAuthWorks: string;
    customOAuthNeeded: boolean;
    managedOAuthAvailable: boolean;
    overallDifficulty: ComplexityLevel;
    difficultyReason: string;
  };
  composio: ComposioIntelligence;
  timeEstimates: TimeEstimates;
  prerequisites: string[];
  setupSteps: SetupStep[];
  oauthConfiguration: OAuthConfig;
  scopes: ScopeInfo[];
  verificationRequirements: {
    reviewRequired: boolean;
    verificationTriggers: string[];
    requiredDocuments: string[];
    testingModeLimitations: string;
    submissionProcess: string;
    rejectionReasons: string[];
    approvalDistinction: string;
  };
  blockers: BlockerItem[];
  agentResponsibilities: string[];
  developerResponsibilities: string[];
  evidenceMatrix: EvidenceItem[];
  sources: SourceCitation[];
  confidence: {
    score: number; // 0 - 100
    level: 'High' | 'Moderate' | 'Cautious';
    explanation: string;
  };
  uncertainties: string[];
  generatedAt: string;
  lastResearchedAt: string;
  researchStatus: 'completed' | 'in_progress' | 'failed';
}

export interface ResearchProgressEvent {
  stage: string;
  stepIndex: number;
  totalSteps: number;
  message: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'needs_human';
  details?: string;
  timestamp: string;
}

export interface IResearchJob {
  jobId: string;
  applicationName: string;
  website: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  currentStage: string;
  progressEvents: ResearchProgressEvent[];
  discoveredSources: SourceCitation[];
  findings?: Partial<IGuide>;
  errorLog?: string[];
  startedAt: string;
  completedAt?: string;
}
