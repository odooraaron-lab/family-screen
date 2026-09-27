import { cookies, headers } from 'next/headers';
import { db } from './db';

export type Screen = {
  slug: string; resident_name: string; owner_name: string; owner_email: string;
  status: 'pending' | 'active' | 'lapsed' | 'disabled'; plan: string;
  stripe_customer_id: string | null; stripe_subscription_id: string | null; checkout_session_id: string | null;
  owner_token: string; invite_code: string; tv_key: string;
  require_approval: boolean; chime: boolean; quiet_start: number; quiet_end: number; timezone: string;
  last_seen_at: string | null; created_at: string; activated_at: string | null;
};

export async function getScreen(slug: string): Promise<Screen | null> {
  const [s] = await db()`select * from fs_screens where slug = ${slug.toLowerCase()}`;
  return (s as Screen) ?? null;
}

export const ownerCookie = (slug: string) => `fso_${slug.replace(/-/g, '_')}`;
export const senderCookie = (slug: string) => `fss_${slug.replace(/-/g, '_')}`;

export function isOwner(s: Screen) {
  const v = cookies().get(ownerCookie(s.slug))?.value;
  return !!v && v === s.owner_token;
}

export async function currentSender(slug: string) {
  const t = cookies().get(senderCookie(slug))?.value;
  if (!t) return null;
  const [row] = await db()`select * from fs_senders where slug = ${slug} and token = ${t}`;
  return row ?? null;
}

/** '' when visited on the screen's own subdomain, '/s/<slug>' otherwise. Set by middleware. */
export function base(slug: string) {
  return headers().get('x-fs-host-mode') === '1' ? '' : `/s/${slug}`;
}

/** Friendly "what they call them" for sentences, e.g. "Grandpa Joe". */
export const who = (s: Pick<Screen, 'resident_name'>) => s.resident_name;
