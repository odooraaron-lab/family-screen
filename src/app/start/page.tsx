import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { StartForm } from '@/components/StartForm';
import { PRICES, SCREENS_DOMAIN, APP_URL, TRIAL_DAYS, PRODUCT } from '@/lib/config';

export default function Start({ searchParams }: { searchParams: { cancelled?: string; plan?: string } }) {
  const domain = SCREENS_DOMAIN || new URL(APP_URL).host;
  const plan = searchParams.plan === 'monthly' ? 'monthly' : 'yearly';
  return (
    <>
      <SiteHead cta={false} />
      <main className="wrap start">
        <div>
          <span className="eyebrow">About five minutes</span>
          <h1 style={{ fontSize: 'clamp(34px, 5vw, 48px)' }}>Set up a screen</h1>
          <p className="muted">You’ll get everything by email straight after paying.</p>
          {searchParams.cancelled && <div className="notice bad">Payment wasn’t finished, so nothing was charged. You can try again below.</div>}
          <div className="card">
            <StartForm domain={domain} prices={{ monthly: PRICES.monthly.label, yearly: PRICES.yearly.label }} trialDays={TRIAL_DAYS} plan={plan} />
          </div>
        </div>
        <aside className="start-side">
          <div className="card">
            <h2 style={{ fontSize: 24 }}>What you get</h2>
            <ul className="ticks">
              <li>A private screen for one TV and one resident</li>
              <li>A send link for the whole family, plus a printable QR card</li>
              <li>A family page to approve people and remove anything</li>
              <li>Quiet hours with a big, easy clock at night</li>
              <li>An email if the TV has been off for a day</li>
            </ul>
          </div>
          <div className="card" style={{ background: 'var(--wash)', border: 0 }}>
            <h3 style={{ fontSize: 20 }}>Setting up the TV</h3>
            <p className="muted small" style={{ margin: 0 }}>On the TV’s web browser, go to <b>{domain}/tv</b> and type the 6-digit code into your family page. That’s it. {PRODUCT} remembers the TV from then on.</p>
          </div>
        </aside>
      </main>
      <SiteFoot />
    </>
  );
}
