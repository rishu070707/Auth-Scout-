import axios from 'axios';
import * as cheerio from 'cheerio';
import { validateSafeUrl } from './security';
import { SourceCitation } from '../types';

export async function fetchPageContent(url: string, timeoutMs = 8000): Promise<{ title: string; content: string; links: string[] } | null> {
  const safe = validateSafeUrl(url);
  if (!safe.valid) return null;

  try {
    const res = await axios.get(url, {
      timeout: timeoutMs,
      maxContentLength: 1024 * 1024 * 2, // 2MB limit
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 AuthScoutBot/1.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      }
    });

    if (typeof res.data !== 'string') return null;

    const $ = cheerio.load(res.data);
    
    // Remove scripts, styles, navigations
    $('script, style, noscript, svg').remove();

    const title = $('title').text().trim() || $('h1').first().text().trim() || url;
    
    // Extract internal/external links that might point to auth/developer docs
    const links: string[] = [];
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
        links.push(href);
      }
    });

    // Extract text from headings, paragraphs, and lists
    const textPieces: string[] = [];
    $('h1, h2, h3, h4, p, li, pre, code').each((_, el) => {
      const text = $(el).text().replace(/\s+/g, ' ').trim();
      if (text.length > 20) {
        textPieces.push(text);
      }
    });

    const content = textPieces.slice(0, 100).join('\n');
    return { title, content, links: Array.from(new Set(links)).slice(0, 40) };
  } catch (error: any) {
    // If request fails or times out, return null gracefully
    return null;
  }
}

export function extractDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return 'unknown';
  }
}
