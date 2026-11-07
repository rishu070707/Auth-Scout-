import { Router, Request, Response } from 'express';
import { ApplicationModel } from '../models/Application';
import { GuideModel } from '../models/Guide';
import { ResearchJobModel } from '../models/ResearchJob';

export const appsRouter = Router();

// GET /api/stats - Real counts derived strictly from stored data
appsRouter.get('/stats', async (_req: Request, res: Response) => {
  try {
    const totalApps = await ApplicationModel.countDocuments();
    const totalGuides = await GuideModel.countDocuments();
    const completedJobs = await ResearchJobModel.countDocuments({ status: 'completed' });
    const managedOAuthProviders = await ApplicationModel.countDocuments({ managedOAuthStatus: 'Available' });

    res.json({
      availableAppGuides: totalGuides,
      supportedOAuthProviders: totalApps,
      guidesGenerated: totalGuides,
      researchJobsCompleted: completedJobs,
      managedOAuthCount: managedOAuthProviders
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/apps - Searchable directory with filtering and sorting
appsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const { q, complexity, managedStatus, approvalRequired, sort } = req.query;

    const filter: any = {};

    if (q && typeof q === 'string') {
      const regex = new RegExp(q, 'i');
      filter.$or = [{ name: regex }, { description: regex }, { tags: regex }];
    }

    if (complexity && typeof complexity === 'string' && complexity !== 'All') {
      filter.complexity = complexity;
    }

    if (managedStatus && typeof managedStatus === 'string' && managedStatus !== 'All') {
      filter.managedOAuthStatus = managedStatus;
    }

    if (approvalRequired === 'true') {
      filter.approvalEstimate = { $not: /0 days/i };
    } else if (approvalRequired === 'false') {
      filter.approvalEstimate = /0 days/i;
    }

    let query = ApplicationModel.find(filter);

    // Sorting
    if (sort === 'easiest') {
      // Custom sorting in memory or mapped
      const apps = await query.exec();
      const order: Record<string, number> = { 'Easy': 1, 'Medium': 2, 'Difficult': 3 };
      apps.sort((a, b) => (order[a.complexity] || 2) - (order[b.complexity] || 2));
      return res.json(apps);
    } else if (sort === 'difficult') {
      const apps = await query.exec();
      const order: Record<string, number> = { 'Difficult': 1, 'Medium': 2, 'Easy': 3 };
      apps.sort((a, b) => (order[a.complexity] || 2) - (order[b.complexity] || 2));
      return res.json(apps);
    } else {
      query = query.sort({ updatedAt: -1 });
      const apps = await query.exec();
      return res.json(apps);
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/apps/:slug - Specific application profile
appsRouter.get('/:slug', async (req: Request, res: Response) => {
  try {
    const app = await ApplicationModel.findOne({ slug: req.params.slug });
    if (!app) {
      return res.status(404).json({ error: 'Application not found in directory.' });
    }
    res.json(app);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
