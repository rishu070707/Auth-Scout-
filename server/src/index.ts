import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db';
import { seedDatabase } from './seed';
import { appsRouter } from './routes/apps';
import { guidesRouter } from './routes/guides';
import { researchRouter } from './routes/research';

import path from 'path';
import fs from 'fs';

dotenv.config();
dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.config({ path: path.join(__dirname, '../../.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    product: 'AuthScout',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Mount modular API routers
app.use('/api/stats', (req, res, next) => {
  req.url = '/stats';
  appsRouter(req, res, next);
});
app.use('/api/apps', appsRouter);
app.use('/api/guides', guidesRouter);
app.use('/api/research', researchRouter);

// Serve static frontend in production if built
const clientDistPath = path.resolve(__dirname, '../../client/dist');
if (fs.existsSync(clientDistPath)) {
  console.log(`[AuthScout Server] Serving static client build from ${clientDistPath}`);
  app.use(express.static(clientDistPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(clientDistPath, 'index.html'));
  });
} else {
  // Global 404 handler for API
  app.use('/api/*', (_req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
}

async function bootstrap() {
  try {
    await connectDB();
    await seedDatabase();
    
    app.listen(PORT, () => {
      console.log(`[AuthScout Server] Running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('[AuthScout Server] Bootstrap error:', error);
    process.exit(1);
  }
}

bootstrap();
