import QRCode from 'qrcode';
import { getScreen } from '@/lib/screens';
import { screenUrl, PRODUCT } from '@/lib/config';
import { TV_CSS, TV_JS } from '@/lib/tv';

export const dynamic = 'force-dynamic';

const page = (title: string, head: string, body: string) => `<!doctype html>
<html lang="en-NZ"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${title}</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible:wght@400;700&display=swap">
<style>${TV_CSS}</style>${head}</head><body>${body}</body></html>`;

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));

export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const s = await getScreen(params.slug);
  const k = new URL(req.url).searchParams.get('k');
  const html = { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' };

  if (!s || s.status === 'pending' || !k || k !== s.tv_key) {
    return new Response(page(PRODUCT, '', `<div class="center"><h1>This TV link isn’t quite right</h1>
      <p>Please ask your family for the TV link from their ${esc(PRODUCT)} email.</p></div>`), { status: 404, headers: html });
  }

  const qr = await QRCode.toString(screenUrl(s.slug, `/send?c=${s.invite_code}`), { type: 'svg', margin: 0, errorCorrectionLevel: 'M' });
  const config = {
    slug: s.slug, key: s.tv_key, resident: s.resident_name, product: PRODUCT, tz: s.timezone, qr,
    feed: `/api/screens/${s.slug}/feed?k=${encodeURIComponent(s.tv_key)}`,
    played: `/api/screens/${s.slug}/played`,
  };
  const hq = process.env.HQ_URL
    ? `<script defer src="${process.env.HQ_URL}/beacon.js" data-product="${process.env.HQ_PRODUCT || 'familyscreen'}" data-site="${s.slug}" data-heartbeat></script>`
    : '';

  const body = `
<div id="stage"></div>
<div id="clock"><div id="clock-time"></div><div id="clock-date"></div></div>
<div id="net" title="Reconnecting"></div>
<div id="start">
  <h1>${esc(s.resident_name)}’s ${esc(PRODUCT)}</h1>
  <p>Press OK on the remote to start with sound. It starts by itself in 30 seconds.</p>
  <button id="start-btn" type="button">Start</button>
</div>
<script>window.FS=${JSON.stringify(config).replace(/</g, '\\u003c')};</script>
<script>${TV_JS}</script>`;

  return new Response(page(`${esc(s.resident_name)} - ${PRODUCT}`, hq, body), { headers: html });
}
