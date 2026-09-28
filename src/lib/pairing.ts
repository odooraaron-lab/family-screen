import { randomInt } from 'crypto';
import { db } from './db';
import { token } from './tokens';

// Connecting a TV without typing a long link: the TV opens <app>/tv and shows a
// 6-digit code; the family admin types that code on their phone.
const MINUTES = 15;
let ready: Promise<unknown> | null = null;

function table() {
  return (ready ??= db()`
    create table if not exists fs_tv_pairings (
      code       text primary key,
      device     text not null unique,
      slug       text references fs_screens(slug) on delete cascade,
      created_at timestamptz not null default now()
    )`.catch((e) => { ready = null; throw e; }));
}

/** New code for a TV. `device` is the TV's own secret, so only that TV can pick up the link. */
export async function newPairing() {
  await table();
  const sql = db();
  await sql`delete from fs_tv_pairings where created_at < now() - make_interval(mins => ${MINUTES})`;
  const device = token(18);
  for (let i = 0; i < 20; i++) {
    const code = String(randomInt(0, 1_000_000)).padStart(6, '0');
    const rows = await sql`insert into fs_tv_pairings (code, device) values (${code}, ${device}) on conflict do nothing returning code`;
    if (rows.length) return { code, device, expiresInSeconds: MINUTES * 60 };
  }
  throw new Error('No free pairing code');
}

/** The screen a TV has been connected to, or null while it's still waiting. */
export async function pairedScreen(device: string): Promise<string | null | 'expired'> {
  await table();
  const [row] = await db()`
    select slug, created_at < now() - make_interval(mins => ${MINUTES}) as expired
    from fs_tv_pairings where device = ${device}`;
  if (!row) return 'expired';
  if (row.slug) return row.slug;
  return row.expired ? 'expired' : null;
}

/** Links a code shown on a TV to a screen. Returns false if the code is wrong or too old. */
export async function claimPairing(code: string, slug: string) {
  await table();
  const clean = code.replace(/\D/g, '');
  if (clean.length !== 6) return false;
  const rows = await db()`
    update fs_tv_pairings set slug = ${slug}
    where code = ${clean} and slug is null and created_at > now() - make_interval(mins => ${MINUTES})
    returning code`;
  return rows.length > 0;
}
