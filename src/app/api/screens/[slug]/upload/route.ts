import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { activeScreen, senderFor } from '@/lib/senders';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Gives the phone a one-off token to upload straight to storage (no size limit from our server). */
export async function POST(req: Request, { params }: { params: { slug: string } }) {
  const body = (await req.json()) as HandleUploadBody;
  try {
    const result = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname) => {
        const s = await activeScreen(params.slug);
        if (!s) throw new Error('This screen isn’t active.');
        const me = await senderFor(s);
        if (!me) throw new Error('Please add your name first.');
        if (!pathname.startsWith(`fs/${s.slug}/`)) throw new Error('Bad upload path.');
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'video/mp4', 'video/quicktime', 'video/webm'],
          maximumSizeInBytes: 200 * 1024 * 1024,
          addRandomSuffix: true,
        };
      },
      onUploadCompleted: async () => {},
    });
    return Response.json(result);
  } catch (e) {
    return Response.json({ error: e instanceof Error ? e.message : 'Upload failed' }, { status: 400 });
  }
}
