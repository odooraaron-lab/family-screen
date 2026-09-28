import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { stripe } from '@/lib/stripe';
import { activateFromSession } from '@/lib/activate';
import { screenUrl, APP_URL } from '@/lib/config';

export const dynamic = 'force-dynamic';

export default async function Done({ searchParams }: { searchParams: { session_id?: string } }) {
  let screen = null;
  try {
    if (searchParams.session_id) {
      const session = await stripe().checkout.sessions.retrieve(searchParams.session_id);
      screen = await activateFromSession(session);
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <>
      <SiteHead cta={false} />
      <main className="narrow" style={{ paddingTop: 20 }}>
        {!screen || screen.status !== 'active' ? (
          <>
            <h1 style={{ fontSize: 36 }}>Almost there</h1>
            <p>We’re confirming your payment. Your links will arrive by email in the next few minutes.</p>
            <p className="muted">If nothing arrives within 15 minutes, check your spam folder, then reply to any of our emails.</p>
          </>
        ) : (
          <>
            <h1 style={{ fontSize: 36 }}>{screen.resident_name}’s screen is ready</h1>
            <p>We’ve emailed these to {screen.owner_email} as well.</p>
            <div className="card stack">
              <div>
                <h3>1. Connect the TV</h3>
                <p className="muted small">In the TV’s web browser go to the address below. It shows a 6-digit code: open your admin page (step 3) and type it under “Connect a TV”.</p>
                <code style={{ fontSize: 22 }}>{APP_URL.replace(/^https?:\/\//, '')}/tv</code>
                <p className="muted small" style={{ marginTop: 8 }}>Or type the full TV link: <span style={{ wordBreak: 'break-all' }}>{screenUrl(screen.slug, `/tv?k=${screen.tv_key}`)}</span></p>
              </div>
              <div>
                <h3>2. Share the send link with the family</h3>
                <p className="muted small">Or print the QR card from your admin page.</p>
                <code style={{ wordBreak: 'break-all' }}>{screenUrl(screen.slug, `/send?c=${screen.invite_code}`)}</code>
              </div>
              <div>
                <a className="btn block" href={screenUrl(screen.slug, `/family/enter?t=${screen.owner_token}`)}>Open your admin page</a>
              </div>
            </div>
          </>
        )}
      </main>
      <SiteFoot />
    </>
  );
}
