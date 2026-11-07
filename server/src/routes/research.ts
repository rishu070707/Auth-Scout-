import { Router, Request, Response } from 'express';
import { z } from 'zod';
import crypto from 'crypto';
import { ResearchJobModel } from '../models/ResearchJob';
import { runResearchPipeline } from '../services/researchEngine';
import { eventBus } from '../services/eventBus';
import { validateSafeUrl } from '../services/security';

export const researchRouter = Router();

const ResearchRequestSchema = z.object({
  name: z.string().min(2).max(80),
  website: z.string().min(3).max(255)
});

// POST /api/research - Start research for an unfamiliar application
researchRouter.post('/', async (req: Request, res: Response) => {
  try {
    const parse = ResearchRequestSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: 'Invalid input. Please provide a valid application name and website URL.' });
    }

    const { name, website } = parse.data;

    // Security & SSRF Protection
    const urlValidation = validateSafeUrl(website);
    if (!urlValidation.valid) {
      return res.status(400).json({ error: `Security validation rejected target URL: ${urlValidation.error}` });
    }

    const jobId = 'job_' + crypto.randomBytes(8).toString('hex');

    const job = await ResearchJobModel.create({
      jobId,
      applicationName: name,
      website: urlValidation.normalizedUrl || website,
      status: 'pending',
      currentStage: 'Initialized',
      progressEvents: [
        {
          stage: 'Initialization',
          stepIndex: 0,
          totalSteps: 6,
          message: `Research job initialized for ${name}`,
          status: 'pending',
          details: `Target: ${website}`,
          timestamp: new Date().toISOString()
        }
      ],
      discoveredSources: [],
      startedAt: new Date().toISOString()
    });

    // Run async pipeline in background
    runResearchPipeline(jobId, name, urlValidation.normalizedUrl || website).catch((err) => {
      console.error(`[ResearchRouter] Pipeline failure for job ${jobId}:`, err);
    });

    res.status(202).json({
      message: 'Research pipeline initiated.',
      jobId: job.jobId,
      status: job.status
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/research/:jobId - Query job status
researchRouter.get('/:jobId', async (req: Request, res: Response) => {
  try {
    const jobId = Array.isArray(req.params.jobId) ? req.params.jobId[0] : req.params.jobId;
    const job = await ResearchJobModel.findOne({ jobId });
    if (!job) {
      return res.status(404).json({ error: 'Research job not found.' });
    }
    res.json(job);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/research/:jobId/stream - Server-Sent Events (SSE) live progress streaming
researchRouter.get('/:jobId/stream', async (req: Request, res: Response) => {
  try {
    const jobId = Array.isArray(req.params.jobId) ? req.params.jobId[0] : req.params.jobId;
    const job = await ResearchJobModel.findOne({ jobId });
    if (!job) {
      return res.status(404).json({ error: 'Research job not found.' });
    }

    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*'
    });

    // Send existing progress events to the client immediately
    job.progressEvents.forEach((ev) => {
      res.write(`data: ${JSON.stringify(ev)}\n\n`);
    });

    if (job.status === 'completed') {
      res.write(`data: ${JSON.stringify({ type: 'COMPLETE', payload: job.findings })}\n\n`);
      res.end();
      return;
    }

    if (job.status === 'failed') {
      const errMessage = (job.errorLog && job.errorLog.length > 0) ? job.errorLog[0] : 'Research failed';
      res.write(`data: ${JSON.stringify({ type: 'ERROR', error: errMessage })}\n\n`);
      res.end();
      return;
    }

    // Subscribe to ongoing events
    eventBus.subscribe(jobId, res);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
