import { Response } from 'express';
import { ResearchProgressEvent } from '../types';

class ResearchEventBus {
  private clients: Map<string, Set<Response>> = new Map();

  public subscribe(jobId: string, res: Response) {
    if (!this.clients.has(jobId)) {
      this.clients.set(jobId, new Set());
    }
    this.clients.get(jobId)!.add(res);

    res.on('close', () => {
      this.unsubscribe(jobId, res);
    });
  }

  public unsubscribe(jobId: string, res: Response) {
    const jobClients = this.clients.get(jobId);
    if (jobClients) {
      jobClients.delete(res);
      if (jobClients.size === 0) {
        this.clients.delete(jobId);
      }
    }
  }

  public emitProgress(jobId: string, event: ResearchProgressEvent) {
    const jobClients = this.clients.get(jobId);
    if (jobClients) {
      const data = `data: ${JSON.stringify(event)}\n\n`;
      jobClients.forEach((client) => {
        try {
          client.write(data);
        } catch (e) {
          // Client probably disconnected
        }
      });
    }
  }

  public emitDone(jobId: string, result: any) {
    const jobClients = this.clients.get(jobId);
    if (jobClients) {
      const data = `data: ${JSON.stringify({ type: 'COMPLETE', payload: result })}\n\n`;
      jobClients.forEach((client) => {
        try {
          client.write(data);
          client.end();
        } catch (e) {
          // Ignore
        }
      });
      this.clients.delete(jobId);
    }
  }

  public emitError(jobId: string, error: string) {
    const jobClients = this.clients.get(jobId);
    if (jobClients) {
      const data = `data: ${JSON.stringify({ type: 'ERROR', error })}\n\n`;
      jobClients.forEach((client) => {
        try {
          client.write(data);
          client.end();
        } catch (e) {
          // Ignore
        }
      });
      this.clients.delete(jobId);
    }
  }
}

export const eventBus = new ResearchEventBus();
