import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { SITE } from '@/lib/seo';

// Family screens (grandpa-joe.resthome.myqr.co.nz) hold private photos: keep every subdomain out of
// search engines, and on the main site only index the public pages.
export default function robots(): MetadataRoute.Robots {
  const host = (headers().get('host') || '').split(':')[0].toLowerCase();
  const main = new URL(SITE).hostname;
  const isMain = host === main || host.endsWith('.vercel.app') || host === 'localhost';
  if (!isMain) return { rules: { userAgent: '*', disallow: '/' } };
  return {
    rules: { userAgent: '*', allow: '/', disallow: ['/api/', '/s/', '/tv', '/start/done'] },
    sitemap: `${SITE}/sitemap.xml`,
  };
}
