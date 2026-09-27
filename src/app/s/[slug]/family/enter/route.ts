import { getScreen, ownerCookie } from '@/lib/screens';

export const dynamic = 'force-dynamic';

/** Admin link from the email: remembers this device, then opens the admin page with a clean address. */
export async function GET(req: Request, { params }: { params: { slug: string } }) {
  const s = await getScreen(params.slug);
  const t = new URL(req.url).searchParams.get('t');
  const hostMode = req.headers.get('x-fs-host-mode') === '1';
  const target = hostMode ? '/family' : `/s/${params.slug}/family`;
  const headers = new Headers({ Location: target });
  if (s && t && t === s.owner_token) {
    headers.append('Set-Cookie', `${ownerCookie(s.slug)}=${s.owner_token}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${60 * 60 * 24 * 400}`);
  }
  return new Response(null, { status: 303, headers });
}
