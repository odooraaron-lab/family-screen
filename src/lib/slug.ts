import { db } from './db';
import { RESERVED, SLUG_RE } from './config';

export async function slugProblem(slug: string): Promise<string | null> {
  if (!SLUG_RE.test(slug)) return 'Use 3 to 30 letters, numbers or dashes.';
  if (RESERVED.has(slug)) return 'That address is reserved. Try another.';
  const [row] = await db()`
    select 1 from fs_screens
    where slug = ${slug} and (status <> 'pending' or created_at > now() - interval '1 hour')`;
  return row ? 'That address is taken. Try adding a surname or town.' : null;
}
