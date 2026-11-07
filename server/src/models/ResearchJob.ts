import mongoose, { Schema, Document } from 'mongoose';
import { IResearchJob } from '../types';

export interface ResearchJobDocument extends IResearchJob, Document {}

const ResearchJobSchema = new Schema<ResearchJobDocument>(
  {
    jobId: { type: String, required: true, unique: true, index: true },
    applicationName: { type: String, required: true },
    website: { type: String, required: true },
    status: { 
      type: String, 
      enum: ['pending', 'running', 'completed', 'failed'], 
      default: 'pending',
      index: true 
    },
    currentStage: { type: String, default: 'Initialized' },
    progressEvents: [
      {
        stage: { type: String, required: true },
        stepIndex: { type: Number, required: true },
        totalSteps: { type: Number, required: true },
        message: { type: String, required: true },
        status: { 
          type: String, 
          enum: ['pending', 'running', 'completed', 'failed', 'needs_human'], 
          required: true 
        },
        details: { type: String },
        timestamp: { type: String, required: true }
      }
    ],
    discoveredSources: [
      {
        title: { type: String, required: true },
        url: { type: String, required: true },
        domain: { type: String, required: true },
        supports: { type: String, required: true },
        excerpt: { type: String },
        lastChecked: { type: String, required: true }
      }
    ],
    findings: { type: Schema.Types.Mixed },
    errorLog: [{ type: String }],
    startedAt: { type: String, required: true },
    completedAt: { type: String }
  },
  { timestamps: true }
);

export const ResearchJobModel = mongoose.model<ResearchJobDocument>('ResearchJob', ResearchJobSchema);
