import { cookies } from 'next/headers';
import { db } from '@/lib/db';
import { activeScreen, senderFor, isOwner } from '@/lib/senders';
import { senderCookie } from '@/lib/screens';
import { token } from '@/lib/tokens';
import { reportToHQ } from '@/lib/hq';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const bad = (error: string, status = 400) => Response.json({ error }, { status });

function blobOk(url: unknown, slug: string) {
  try {
    const u = new URL(String(url));
    return u.protocol === 'https:' && u.hostname.endsWith('.public.blob.vercel-storage.com') && u.pathname.startsWith(`/fs/${slug}/`);
  } catch { return false; }
}

/** The sender's own recent messages, with whether each has played on the TV. */
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const s = await activeScreen(params.slug);
  if (!s) return bad('This screen isn’t active.', 404);
  const me = await senderFor(s);
  if (!me) return Response.json({ sender: null, messages: [] });
  const messages = await db()`
    select id, kind, media_url, text, status, played_at, created_at from fs_messages
    where sender_id = ${me.id} and status <> 'removed' order by id desc limit 20`;
  return Response.json({ sender: { name: me.name, status: me.status }, messages });
}

/** { action: 'join', code, name }  or  { kind, media_url?, text?, bytes? } */
export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const s = await activeScreen(params.slug);
  if (!s) return bad('This screen isn’t active.', 404);
  const b = await req.json().catch(() => ({}));
  const sql = db();

  if (b.action === 'join') {
    if (b.code !== s.invite_code) return bad('This send link has changed. Ask your family for the new one.', 403);
    const name = String(b.name || '').replace(/\s+/g, ' ').trim().slice(0, 40);
    if (name.length < 2) return bad('Please add your name.');
    const owner = isOwner(s);
    const status = owner || !s.require_approval ? 'approved' : 'pending';
    const t = token();
    await sql`insert into fs_senders (slug, name, token, status) values (${s.slug}, ${name}, ${t}, ${status})`;
    cookies().set(senderCookie(s.slug), t, { httpOnly: true, secure: true, sameSite: 'lax', path: '/', maxAge: 60 * 60 * 24 * 400 });
    return Response.json({ sender: { name, status } });
  }

  const me = await senderFor(s);
  if (!me) return bad('Please add your name first.', 401);

  const kind = b.kind;
  const text = String(b.text || '').trim().slice(0, 200) || null;
  if (!['photo', 'video', 'text'].includes(kind)) return bad('Unknown message type.');
  if (kind === 'text' && !text) return bad('Write a message first.');
  if (kind !== 'text' && !blobOk(b.media_url, s.slug)) return bad('That upload didn’t work. Please try again.');

  const [{ n }] = await sql`select count(*)::int as n from fs_messages where sender_id = ${me.id} and created_at > now() - interval '1 hour'`;
  if (n >= 60) return bad('That’s a lot in one hour. Please wait a little before sending more.', 429);

  const status = me.status === 'approved' ? 'live' : 'pending';
  const [row] = await sql`
    insert into fs_messages (slug, sender_id, kind, media_url, text, bytes, status)
    values (${s.slug}, ${me.id}, ${kind}, ${kind === 'text' ? null : b.media_url}, ${text}, ${Number(b.bytes) || 0}, ${status})
    returning id`;
  await reportToHQ({ type: 'event', name: 'message_sent', slug: s.slug, data: { kind } });
  return Response.json({ id: row.id, status });
}
