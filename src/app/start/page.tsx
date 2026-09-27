import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { StartForm } from '@/components/StartForm';
import { PRICES, SCREENS_DOMAIN, APP_URL, TRIAL_DAYS } from '@/lib/config';

export default function Start({ searchParams }: { searchParams: { cancelled?: string } }) {
  const domain = SCREENS_DOMAIN || new URL(APP_URL).host;
  return (
    <>
      <SiteHead cta={false} />
      <main className="narrow" style={{ paddingTop: 20 }}>
        <h1 style={{ fontSize: 38 }}>Set up a screen</h1>
        <p className="muted">It takes about five minutes. You’ll get everything by email straight after.</p>
        {searchParams.cancelled && <div className="notice bad">Payment wasn’t finished, so nothing was charged. You can try again below.</div>}
        <StartForm domain={domain} prices={{ monthly: PRICES.monthly.label, yearly: PRICES.yearly.label }} trialDays={TRIAL_DAYS} />
      </main>
      <SiteFoot />
    </>
  );
}
