import { notFound } from 'next/navigation';
import { getScreen, currentSender } from '@/lib/screens';
import { SendApp } from '@/components/SendApp';
import { PRODUCT } from '@/lib/config';

export const dynamic = 'force-dynamic';

export default async function Send({ params, searchParams }: { params: { slug: string }; searchParams: { c?: string } }) {
  const s = await getScreen(params.slug);
  if (!s || s.status === 'pending') notFound();
  const me = s.status === 'active' ? await currentSender(s.slug) : null;
  const code = searchParams.c || '';
  const codeOk = code === s.invite_code;
  const blocked = me?.status === 'blocked';

  return (
    <>
      <header className="send-head">
        <div className="narrow">
          <h1>Send to {s.resident_name}</h1>
          <p>Photos, videos and messages play on the TV in their room.</p>
        </div>
      </header>
      <main className="narrow" style={{ paddingBottom: 60 }}>
        {s.status !== 'active' ? (
          <p>This {PRODUCT} is paused at the moment, so messages can’t be sent. Please check with the family member who set it up.</p>
        ) : blocked ? (
          <p>This send link isn’t available to you. Please check with the family member who set it up.</p>
        ) : !me && !codeOk ? (
          <p>This link is missing part of its code. Please open the full send link that was shared with you, or scan the QR card.</p>
        ) : (
          <SendApp slug={s.slug} resident={s.resident_name} code={code}
            initialSender={me ? { name: me.name, status: me.status } : null} />
        )}
      </main>
    </>
  );
}
