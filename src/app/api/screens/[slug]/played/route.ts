import { db } from '@/lib/db';
import { getScreen } from '@/lib/screens';

export const dynamic = 'force-dynamic';

/** The TV tells us which new messages it has shown, so senders see "Played on the TV". */
export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const b = await req.json().catch(() => ({}));
  const s = await getScreen(params.slug);
  if (!s || b.k !== s.tv_key) return Response.json({ error: 'wrong-link' }, { status: 403 });
  const ids = (Array.isArray(b.ids) ? b.ids : []).map(Number).filter(Number.isFinite).slice(0, 50);
  if (ids.length) {
    await db()`update fs_messages set played_at = now() where slug = ${s.slug} and id = any(${ids}) and played_at is null`;
  }
  return Response.json({ ok: true });
}
