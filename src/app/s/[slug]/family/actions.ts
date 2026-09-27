'use server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { del } from '@vercel/blob';
import { db } from '@/lib/db';
import { getScreen, isOwner, base, type Screen } from '@/lib/screens';
import { token, inviteCode } from '@/lib/tokens';
import { welcomeEmail } from '@/lib/email';

async function ownerScreen(form: FormData): Promise<Screen> {
  const s = await getScreen(String(form.get('slug') || ''));
  if (!s || !isOwner(s)) throw new Error('Not allowed');
  return s;
}

function done(s: Screen, msg: string): never {
  revalidatePath(`/s/${s.slug}/family`);
  redirect(`${base(s.slug)}/family?ok=${encodeURIComponent(msg)}`);
}

export async function approveSender(form: FormData) {
  const s = await ownerScreen(form);
  const id = Number(form.get('id'));
  const sql = db();
  const [p] = await sql`update fs_senders set status = 'approved' where id = ${id} and slug = ${s.slug} returning name`;
  await sql`update fs_messages set status = 'live' where sender_id = ${id} and slug = ${s.slug} and status = 'pending'`;
  done(s, `${p?.name ?? 'They'} can now send to the TV.`);
}

export async function blockSender(form: FormData) {
  const s = await ownerScreen(form);
  const id = Number(form.get('id'));
  const sql = db();
  const [p] = await sql`update fs_senders set status = 'blocked' where id = ${id} and slug = ${s.slug} returning name`;
  await sql`update fs_messages set status = 'removed' where sender_id = ${id} and slug = ${s.slug} and status = 'pending'`;
  done(s, `${p?.name ?? 'They'} can no longer send.`);
}

export async function removeMessage(form: FormData) {
  const s = await ownerScreen(form);
  const id = Number(form.get('id'));
  const [m] = await db()`update fs_messages set status = 'removed' where id = ${id} and slug = ${s.slug} returning media_url`;
  if (m?.media_url && process.env.BLOB_READ_WRITE_TOKEN) await del(m.media_url).catch(() => {});
  done(s, 'Removed from the TV.');
}

export async function saveSettings(form: FormData) {
  const s = await ownerScreen(form);
  const name = String(form.get('resident_name') || '').replace(/\s+/g, ' ').trim().slice(0, 40) || s.resident_name;
  const hour = (v: FormDataEntryValue | null, d: number) => { const n = Number(v); return Number.isInteger(n) && n >= 0 && n <= 23 ? n : d; };
  await db()`
    update fs_screens set resident_name = ${name},
      require_approval = ${form.get('require_approval') === 'on'},
      chime = ${form.get('chime') === 'on'},
      quiet_start = ${hour(form.get('quiet_start'), 20)},
      quiet_end = ${hour(form.get('quiet_end'), 7)}
    where slug = ${s.slug}`;
  done(s, 'Saved. The TV picks up changes within a minute.');
}

export async function newTvLink(form: FormData) {
  const s = await ownerScreen(form);
  await db()`update fs_screens set tv_key = ${token(18)} where slug = ${s.slug}`;
  done(s, 'New TV link made. Open it on the TV; the old link has stopped working.');
}

export async function newSendLink(form: FormData) {
  const s = await ownerScreen(form);
  await db()`update fs_screens set invite_code = ${inviteCode()} where slug = ${s.slug}`;
  done(s, 'New send link made. People already approved can keep sending; share the new link with anyone else.');
}

export async function emailLinks(form: FormData) {
  const s = await getScreen(String(form.get('slug') || ''));
  if (s && s.status !== 'pending') await welcomeEmail(s);
  redirect(`${base(String(form.get('slug')))}/family?sent=1`);
}
