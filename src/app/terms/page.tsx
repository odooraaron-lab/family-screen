import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { BRAND, PRODUCT, SUPPORT_EMAIL } from '@/lib/config';

export default function Terms() {
  return (
    <>
      <SiteHead />
      <main className="wrap prose">
        <h1>Terms</h1>
        <p>These terms cover your use of {PRODUCT}, run by {BRAND}.</p>
        <h2>Your subscription</h2>
        <p>{PRODUCT} is a monthly or yearly subscription, charged in advance through Stripe. You can cancel any time from your admin page; the screen keeps working until the end of the period you’ve paid for. We don’t give partial refunds, except where the Consumer Guarantees Act requires it.</p>
        <h2>Permission and content</h2>
        <p>You confirm you have the resident’s permission, or their representative’s, to set up the screen. You’re responsible for who you let send messages, and for removing anything unsuitable. Don’t send anything unlawful, or anything the resident or other people in the photos wouldn’t be comfortable with.</p>
        <h2>The rest home</h2>
        <p>{PRODUCT} runs on the TV and wifi available in the room. We can’t guarantee the TV will be on or connected, and the rest home is not responsible for the service.</p>
        <h2>Changes and support</h2>
        <p>We may update the service or these terms and will tell you by email about anything important.{SUPPORT_EMAIL ? <> For help, email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>.</> : ''}</p>
      </main>
      <SiteFoot />
    </>
  );
}
