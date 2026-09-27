import { notFound } from 'next/navigation';
import { getScreen, isOwner, base } from '@/lib/screens';
import { PRODUCT, APP_URL } from '@/lib/config';

export const dynamic = 'force-dynamic';

export default async function ScreenHome({ params }: { params: { slug: string } }) {
  const s = await getScreen(params.slug);
  if (!s || s.status === 'pending') notFound();
  const b = base(s.slug);
  return (
    <>
      <header className="send-head">
        <div className="narrow"><h1>{s.resident_name}’s {PRODUCT}</h1><p>Family photos and messages on the TV in their room.</p></div>
      </header>
      <main className="narrow">
        <p>To send something, use the send link your family shared, or scan the QR card.</p>
        {isOwner(s) ? (
          <a className="btn" href={`${b}/family`}>Open your family admin</a>
        ) : (
          <p className="small muted">Set this up for your family? <a href={`${b}/family`}>Family admin</a> or <a href={APP_URL}>learn about {PRODUCT}</a>.</p>
        )}
      </main>
    </>
  );
}
