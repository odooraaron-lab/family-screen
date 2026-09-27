import { db } from '@/lib/db';
import { getScreen } from '@/lib/screens';

export const dynamic = 'force-dynamic';

/** What the TV polls every 20 seconds. */
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const s = await getScreen(params.slug);
  const k = new URL(req.url).searchParams.get('k');
  if (!s || !k || k !== s.tv_key) return Response.json({ error: 'wrong-link' }, { status: 403 });

  const sql = db();
  await sql`update fs_screens set last_seen_at = now()
            where slug = ${s.slug} and (last_seen_at is null or last_seen_at < now() - interval '60 seconds')`;

  const items = s.status === 'active' ? await sql`
    select m.id, m.kind, m.media_url as url, m.text, m.created_at, (m.played_at is not null) as played,
           coalesce(p.name, 'Family') as sender
    from fs_messages m left join fs_senders p on p.id = m.sender_id
    where m.slug = ${s.slug} and m.status = 'live'
    order by m.id desc limit 80` : [];

  return Response.json(
    {
      status: s.status,
      resident: s.resident_name,
      settings: { chime: s.chime, quietStart: s.quiet_start, quietEnd: s.quiet_end, timezone: s.timezone },
      items,
    },
    { headers: { 'Cache-Control': 'no-store' } },
  );
}
