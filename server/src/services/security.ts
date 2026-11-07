import { URL } from 'url';

const BLOCKED_HOSTNAMES = new Set([
  'localhost',
  '127.0.0.1',
  '0.0.0.0',
  '::1',
  '169.254.169.254', // AWS metadata
  'metadata.google.internal'
]);

export function validateSafeUrl(urlString: string): { valid: boolean; normalizedUrl?: string; error?: string } {
  try {
    let toTest = urlString.trim();
    if (!/^https?:\/\//i.test(toTest)) {
      toTest = 'https://' + toTest;
    }
    const parsed = new URL(toTest);

    if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
      return { valid: false, error: 'Protocol must be HTTP or HTTPS.' };
    }

    const hostname = parsed.hostname.toLowerCase();

    if (BLOCKED_HOSTNAMES.has(hostname) || hostname.endsWith('.local') || hostname.endsWith('.internal')) {
      return { valid: false, error: 'Target host is restricted for security.' };
    }

    // Check private IP ranges (10.x, 192.168.x, 172.16-31.x)
    if (/^(10\.|192\.168\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(hostname)) {
      return { valid: false, error: 'Private network addresses are not allowed.' };
    }

    return { valid: true, normalizedUrl: parsed.origin };
  } catch (err: any) {
    return { valid: false, error: 'Invalid URL format.' };
  }
}
