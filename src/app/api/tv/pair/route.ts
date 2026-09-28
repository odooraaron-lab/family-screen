import { newPairing, pairedScreen, tvCookie } from '@/lib/pairing';
import { getScreen } from '@/lib/screens';
import { screenUrl } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const json = (data: unknown, extra: Record<string, string> = {}) => Response.json(data, { headers: { 'cache-control': 'no-store', ...extra } });

/** The TV asks for a code to show. */
export async function POST() {
  return json(await newPairing());
}

/** The TV checks whether the family has typed its code in yet. */
export async function GET(req: Request) {
  const device = new URL(req.url).searchParams.get('d') || '';
  if (!device) return json({ status: 'expired' });
  const slug = await pairedScreen(device);
  if (slug === 'expired') return json({ status: 'expired' });
  if (!slug) return json({ status: 'waiting' });
  const s = await getScreen(slug);
  if (!s || s.status === 'pending') return json({ status: 'expired' });
  return json({ status: 'paired', url: screenUrl(s.slug, `/tv?k=${s.tv_key}`) }, { 'set-cookie': tvCookie(s.slug, s.tv_key) });
}
