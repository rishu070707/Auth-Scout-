import { Router, Request, Response } from 'express';
import { GuideModel } from '../models/Guide';
import { ResearchJobModel } from '../models/ResearchJob';

export const guidesRouter = Router();

// GET /api/guides - List all generated and saved guides
guidesRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const guides = await GuideModel.find()
      .select('slug shareId applicationName website logo overview.overallDifficulty confidence timeEstimates generatedAt')
      .sort({ createdAt: -1 });
    res.json(guides);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/guides/share/:shareId - Permanent public shareable guide endpoint
guidesRouter.get('/share/:shareId', async (req: Request, res: Response) => {
  try {
    const guide = await GuideModel.findOne({ shareId: req.params.shareId });
    if (!guide) {
      return res.status(404).json({ error: 'Shareable guide not found.' });
    }
    res.json(guide);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/guides/:slug - Get guide by application slug
guidesRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const guide = await GuideModel.findOne({ slug: req.params.slug }).sort({ createdAt: -1 });
    if (!guide) {
      return res.status(404).json({ error: `Guide for "${req.params.slug}" not found.` });
    }
    res.json(guide);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/guides/:jobId/save - Explicitly persist completed guide
guidesRouter.post('/:jobId/save', async (req: Request, res: Response) => {
  try {
    const job = await ResearchJobModel.findOne({ jobId: req.params.jobId });
    if (!job || !job.findings) {
      return res.status(404).json({ error: 'Research job or findings not found.' });
    }

    const existingGuide = await GuideModel.findOne({ shareId: job.findings.shareId });
    if (existingGuide) {
      return res.json({ message: 'Guide already saved.', guide: existingGuide });
    }

    const newGuide = await GuideModel.create(job.findings);
    res.json({ message: 'Guide saved successfully.', guide: newGuide });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
