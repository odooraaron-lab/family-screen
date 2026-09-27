import { notFound } from 'next/navigation';
import QRCode from 'qrcode';
import { getScreen, isOwner } from '@/lib/screens';
import { screenUrl, PRODUCT } from '@/lib/config';
import { PrintButton } from '@/components/PrintButton';

export const dynamic = 'force-dynamic';

export default async function Card({ params, searchParams }: { params: { slug: string }; searchParams: { t?: string } }) {
  const s = await getScreen(params.slug);
  if (!s || s.status === 'pending') notFound();
  if (!isOwner(s) && searchParams.t !== s.owner_token) {
    return <main className="narrow" style={{ paddingTop: 50 }}><p>Open the card from your admin page or the link in your email.</p></main>;
  }
  const link = screenUrl(s.slug, `/send?c=${s.invite_code}`);
  const qr = await QRCode.toString(link, { type: 'svg', margin: 1, errorCorrectionLevel: 'M' });

  return (
    <main>
      <div className="qr-card">
        <h1>Send {s.resident_name} a photo</h1>
        <p className="muted">It shows up on the TV in {s.resident_name}’s room, with your name.</p>
        <div className="qr" dangerouslySetInnerHTML={{ __html: qr }} />
        <p style={{ marginTop: 16 }}><strong>Point your phone camera at the square</strong>, tap the link, and choose a photo, video or message.</p>
        <p className="url muted">{link}</p>
        <p className="small muted">{PRODUCT}</p>
      </div>
      <div className="center no-print" style={{ marginBottom: 40 }}><PrintButton /></div>
    </main>
  );
}
