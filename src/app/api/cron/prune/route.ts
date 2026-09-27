import { del } from '@vercel/blob';
import { db } from '@/lib/db';
import { reportToHQ } from '@/lib/hq';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const KEEP = 200;

/** Daily: keep each screen's newest 200 items, clear abandoned sign-ups, report storage to the admin. */
export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) return new Response('Unauthorized', { status: 401 });
  const sql = db();

  // Oldest items beyond the newest 200 per screen, plus anything removed over a day ago.
  const old = await sql`
    select id, media_url from (
      select id, media_url, status, created_at, row_number() over (partition by slug order by id desc) as rn
      from fs_messages where status <> 'removed'
    ) x where rn > ${KEEP}
    union all
    select id, media_url from fs_messages where status = 'removed' and created_at < now() - interval '1 day'
    limit 500`;
  const urls = old.map((r) => r.media_url).filter(Boolean) as string[];
  if (urls.length && process.env.BLOB_READ_WRITE_TOKEN) await del(urls).catch((e) => console.error('blob delete', e));
  if (old.length) await sql`delete from fs_messages where id = any(${old.map((r) => r.id)})`;

  const abandoned = await sql`delete from fs_screens where status = 'pending' and created_at < now() - interval '2 days' returning slug`;

  const usage = await sql`
    select s.slug, coalesce(sum(m.bytes), 0)::bigint as bytes from fs_screens s
    left join fs_messages m on m.slug = s.slug and m.status <> 'removed'
    where s.status <> 'pending' group by s.slug`;
  for (let i = 0; i < usage.length; i += 100) {
    await reportToHQ(...usage.slice(i, i + 100).map((u) => ({ type: 'site.upsert' as const, slug: u.slug, storage_bytes: Number(u.bytes) })));
  }

  return Response.json({ pruned: old.length, abandoned: abandoned.length, reported: usage.length });
}
