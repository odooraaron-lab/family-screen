import { slugProblem } from '@/lib/slug';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const slug = (new URL(req.url).searchParams.get('slug') || '').toLowerCase();
  const problem = await slugProblem(slug);
  return Response.json({ available: !problem, message: problem ?? 'That address is free.' });
}
