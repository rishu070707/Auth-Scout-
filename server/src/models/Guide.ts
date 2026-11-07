import mongoose, { Schema, Document } from 'mongoose';
import { IGuide } from '../types';

export interface GuideDocument extends IGuide, Document {}

const GuideSchema = new Schema<GuideDocument>(
  {
    applicationId: { type: Schema.Types.ObjectId, ref: 'Application' },
    slug: { type: String, required: true, index: true },
    shareId: { type: String, required: true, unique: true, index: true },
    applicationName: { type: String, required: true },
    website: { type: String, required: true },
    logo: { type: String, default: '' },
    overview: {
      summary: { type: String, required: true },
      howOAuthWorks: { type: String, required: true },
      customOAuthNeeded: { type: Boolean, required: true },
      managedOAuthAvailable: { type: Boolean, required: true },
      overallDifficulty: { type: String, enum: ['Easy', 'Medium', 'Difficult'], required: true },
      difficultyReason: { type: String, required: true }
    },
    composio: {
      isManagedSupported: { type: Boolean, required: true },
      managedStatus: { type: String, enum: ['Available', 'Custom Only', 'Not Yet Verified'], required: true },
      recommendedPath: { type: String, enum: ['managed', 'custom', 'investigate'], required: true },
      recommendationReason: { type: String, required: true },
      composioToolkitSlug: { type: String },
      composioDocsUrl: { type: String },
      whatComposioManages: [{ type: String }],
      whatDeveloperStillNeeds: [{ type: String }]
    },
    timeEstimates: {
      activeSetupMinutes: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
      },
      activeSetupExplanation: { type: String, required: true },
      approvalWaitingDays: {
        min: { type: Number, required: true },
        max: { type: Number, required: true }
      },
      approvalWaitingExplanation: { type: String, required: true },
      externalDependencies: [{ type: String }],
      evidenceBehindEstimates: { type: String, required: true }
    },
    prerequisites: [{ type: String }],
    setupSteps: [
      {
        stepNumber: { type: Number, required: true },
        title: { type: String, required: true },
        explanation: { type: String, required: true },
        exactAction: { type: String, required: true },
        portalLink: { type: String },
        expectedResult: { type: String, required: true },
        commonMistakes: [{ type: String }]
      }
    ],
    oauthConfiguration: {
      authorizationEndpoint: { type: String, default: '' },
      tokenEndpoint: { type: String, default: '' },
      redirectUriExample: { type: String, default: '' },
      supportedFlows: [{ type: String }],
      pkceSupported: { type: Boolean, default: false },
      tokenRefresh: { type: String, default: '' },
      securityConsiderations: [{ type: String }]
    },
    scopes: [
      {
        name: { type: String, required: true },
        description: { type: String, required: true },
        sensitivity: { type: String, enum: ['Standard', 'Sensitive', 'Restricted'], required: true },
        triggersReview: { type: Boolean, default: false }
      }
    ],
    verificationRequirements: {
      reviewRequired: { type: Boolean, default: false },
      verificationTriggers: [{ type: String }],
      requiredDocuments: [{ type: String }],
      testingModeLimitations: { type: String, default: '' },
      submissionProcess: { type: String, default: '' },
      rejectionReasons: [{ type: String }],
      approvalDistinction: { type: String, default: '' }
    },
    blockers: [
      {
        issue: { type: String, required: true },
        whyItHappens: { type: String, required: true },
        howToIdentify: { type: String, required: true },
        howToFix: { type: String, required: true },
        agentCanHelp: { type: Boolean, default: false },
        agentHelpDetails: { type: String }
      }
    ],
    agentResponsibilities: [{ type: String }],
    developerResponsibilities: [{ type: String }],
    evidenceMatrix: [
      {
        claim: { type: String, required: true },
        value: { type: String, required: true },
        status: { type: String, enum: ['VERIFIED', 'INFERRED', 'UNVERIFIED', 'BLOCKED'], required: true },
        sourceUrl: { type: String, required: true },
        sourceTitle: { type: String, required: true },
        supportingExcerpt: { type: String, required: true },
        retrievedAt: { type: String, required: true }
      }
    ],
    sources: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        domain: { type: String, required: true },
        supports: { type: String, required: true },
        excerpt: { type: String },
        lastChecked: { type: String, required: true }
      }
    ],
    confidence: {
      score: { type: Number, required: true },
      level: { type: String, enum: ['High', 'Moderate', 'Cautious'], required: true },
      explanation: { type: String, required: true }
    },
    uncertainties: [{ type: String }],
    generatedAt: { type: String, required: true },
    lastResearchedAt: { type: String, required: true },
    researchStatus: { type: String, enum: ['completed', 'in_progress', 'failed'], default: 'completed' }
  },
  { timestamps: true }
);

GuideSchema.index({ slug: 1, shareId: 1 });

export const GuideModel = mongoose.model<GuideDocument>('Guide', GuideSchema);
