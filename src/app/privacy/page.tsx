import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { BRAND, PRODUCT, SUPPORT_EMAIL } from '@/lib/config';

export default function Privacy() {
  return (
    <>
      <SiteHead />
      <main className="wrap prose">
        <h1>Privacy</h1>
        <p>{BRAND} runs {PRODUCT}. This page explains what we collect and why, in line with the New Zealand Privacy Act 2020.</p>
        <h2>What we collect</h2>
        <p>From the person who sets up a screen: their name, email address, the resident’s display name, and payment details (handled by Stripe; we never see card numbers).</p>
        <p>From people who send messages: the name they enter, and the photos, videos and messages they send.</p>
        <p>From the TV: when it last checked in, so we can tell you if it goes offline.</p>
        <h2>How it’s used</h2>
        <p>Only to run the screen: showing messages on the TV, letting the family manage it, billing, and support emails. We don’t sell data or use it for advertising.</p>
        <h2>Who can see photos and messages</h2>
        <p>Anyone with the screen’s TV link, the person who set it up, and our support staff when helping you. Files are stored with our hosting provider (Vercel) behind long, unguessable links.</p>
        <h2>How long we keep it</h2>
        <p>Each screen keeps its most recent 200 items; older ones are deleted automatically. If a subscription ends, the screen and its content are deleted within 90 days. You can remove any message at any time, or ask us to delete everything.</p>
        <h2>Consent</h2>
        <p>The person who sets up a screen confirms they have permission from the resident, or the resident’s representative, to show family content on their TV.</p>
        <h2>Your rights</h2>
        <p>You can ask to see or correct the information we hold about you, or ask us to delete it{SUPPORT_EMAIL ? <> by emailing <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></> : ''}. You can also contact the Office of the Privacy Commissioner.</p>
      </main>
      <SiteFoot />
    </>
  );
}
