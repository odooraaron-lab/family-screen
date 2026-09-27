import { cookies } from 'next/headers';
import { db } from './db';
import { getScreen, isOwner, senderCookie, type Screen } from './screens';

/** Who is sending: must have a sender cookie for this screen that isn't blocked. */
export async function senderFor(s: Screen) {
  const t = cookies().get(senderCookie(s.slug))?.value;
  if (!t) return null;
  const [p] = await db()`select * from fs_senders where slug = ${s.slug} and token = ${t} and status <> 'blocked'`;
  return p ?? null;
}

export async function activeScreen(slug: string) {
  const s = await getScreen(slug);
  return s && s.status === 'active' ? s : null;
}

export { isOwner };
