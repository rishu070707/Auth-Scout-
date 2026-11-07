import mongoose, { Schema, Document } from 'mongoose';
import { IApplication } from '../types';

export interface ApplicationDocument extends IApplication, Document {}

const ApplicationSchema = new Schema<ApplicationDocument>(
  {
    name: { type: String, required: true, index: true },
    slug: { type: String, required: true, unique: true, index: true },
    website: { type: String, required: true },
    logo: { type: String, default: '' },
    description: { type: String, required: true },
    oauthSupported: { type: Boolean, default: true },
    complexity: { type: String, enum: ['Easy', 'Medium', 'Difficult'], required: true, index: true },
    estimatedActiveTime: { type: String, required: true },
    approvalEstimate: { type: String, required: true },
    managedOAuthStatus: { 
      type: String, 
      enum: ['Available', 'Custom Only', 'Not Yet Verified'], 
      required: true, 
      index: true 
    },
    officialDocs: { type: String, required: true },
    lastResearchedAt: { type: String, required: true },
    tags: [{ type: String }]
  },
  { timestamps: true }
);

ApplicationSchema.index({ name: 'text', description: 'text' });

export const ApplicationModel = mongoose.model<ApplicationDocument>('Application', ApplicationSchema);
