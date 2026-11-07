import { Application, Guide, ResearchJob, PlatformStats } from '../types';

const API_BASE = '/api';

export async function fetchStats(): Promise<PlatformStats> {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch platform stats');
  return res.json();
}

export async function fetchApplications(params?: {
  q?: string;
  complexity?: string;
  managedStatus?: string;
  approvalRequired?: string;
  sort?: string;
}): Promise<Application[]> {
  const query = new URLSearchParams();
  if (params?.q) query.append('q', params.q);
  if (params?.complexity && params.complexity !== 'All') query.append('complexity', params.complexity);
  if (params?.managedStatus && params.managedStatus !== 'All') query.append('managedStatus', params.managedStatus);
  if (params?.approvalRequired && params.approvalRequired !== 'All') query.append('approvalRequired', params.approvalRequired);
  if (params?.sort) query.append('sort', params.sort);

  const res = await fetch(`${API_BASE}/apps?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch applications');
  return res.json();
}

export async function fetchApplicationBySlug(slug: string): Promise<Application> {
  const res = await fetch(`${API_BASE}/apps/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch application profile');
  return res.json();
}

export async function fetchGuideBySlug(slug: string): Promise<Guide> {
  const res = await fetch(`${API_BASE}/guides/${slug}`);
  if (!res.ok) throw new Error('Failed to fetch guide');
  return res.json();
}

export async function fetchGuideByShareId(shareId: string): Promise<Guide> {
  const res = await fetch(`${API_BASE}/guides/share/${shareId}`);
  if (!res.ok) throw new Error('Failed to fetch shared guide');
  return res.json();
}

export async function fetchAllGuides(): Promise<Guide[]> {
  const res = await fetch(`${API_BASE}/guides`);
  if (!res.ok) throw new Error('Failed to fetch saved guides');
  return res.json();
}

export async function startResearch(name: string, website: string): Promise<{ jobId: string; status: string }> {
  const res = await fetch(`${API_BASE}/research`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, website })
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to initiate research job');
  }
  return res.json();
}

export async function fetchResearchJob(jobId: string): Promise<ResearchJob> {
  const res = await fetch(`${API_BASE}/research/${jobId}`);
  if (!res.ok) throw new Error('Failed to fetch research job');
  return res.json();
}
