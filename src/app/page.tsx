import Link from 'next/link';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { PRICES, TRIAL_DAYS, SUPPORT_EMAIL, PRODUCT } from '@/lib/config';

export default function Home() {
  return (
    <>
      <SiteHead />
      <main>
        <section className="wrap hero">
          <div>
            <h1>Photos from the family, on Grandma’s own TV.</h1>
            <p className="lede">
              Everyone in the family can send photos, videos and little messages from their phone.
              They play on the TV in her room with who sent them. She doesn’t need to press a thing.
            </p>
            <div className="row">
              <Link className="btn" href="/start">Set up a screen</Link>
              <a className="btn ghost" href="#how">How it works</a>
            </div>
            {TRIAL_DAYS > 0 && <p className="small muted" style={{ marginTop: 14 }}>Free for {TRIAL_DAYS} days, then {PRICES.monthly.label} or {PRICES.yearly.label}. Cancel any time.</p>}
          </div>
          <div className="tv-mock" aria-label="Example of the TV screen showing a message">
            <div className="glass">
              <div className="clock">10:42 am<br />Tuesday 6 October</div>
              <span className="from">From Sarah in Brisbane</span>
              <div className="msg">Happy birthday Nana! The kids made you a cake. Can’t wait to see you at Christmas.</div>
            </div>
            <div className="phone-note">Sent from Sarah’s phone, 2 min ago</div>
          </div>
        </section>

        <section className="band" id="how">
          <div className="wrap">
            <h2>How it works</h2>
            <ol className="steps">
              <li><h3>Set it up in five minutes</h3><p className="muted">Pick a name for the screen and pay online. You get a TV link, a send link and a printable QR card.</p></li>
              <li><h3>Open the link on the TV</h3><p className="muted">Open the TV link in the TV’s browser once and bookmark it. Staff only need to switch the TV on.</p></li>
              <li><h3>Share the send link</h3><p className="muted">Put it in the family group chat. You approve each new person once, then their photos go straight to the TV.</p></li>
            </ol>
          </div>
        </section>

        <section className="wrap" style={{ padding: '40px 0' }}>
          <h2>Made for rest home rooms</h2>
          <div className="price-grid">
            <div><h3>Nothing to learn</h3><p className="muted">No buttons, apps or passwords for the resident. New messages play with a gentle chime, then everything cycles.</p></div>
            <div><h3>Quiet at night</h3><p className="muted">From 8pm to 7am the screen dims to a clock. You choose the hours.</p></div>
            <div><h3>Family only</h3><p className="muted">Only people you approve can send. You can remove any message from your admin page.</p></div>
            <div><h3>Keeps going</h3><p className="muted">If the wifi drops it keeps showing recent photos, and we email you if the TV has been off for a day.</p></div>
          </div>
        </section>

        <section className="band">
          <div className="wrap">
            <h2>Pricing</h2>
            <div className="price-grid">
              <div className="card"><div className="price">{PRICES.monthly.label}</div><p className="muted">Monthly, cancel any time.</p></div>
              <div className="card"><div className="price">{PRICES.yearly.label}</div><p className="muted">Yearly, the best value.</p></div>
              <div className="card">
                <div className="price" style={{ fontSize: 24 }}>For rest homes</div>
                <p className="muted">Offer {PRODUCT} to every resident, with one bill.</p>
                {SUPPORT_EMAIL && <a href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(PRODUCT + ' for our rest home')}`}>Email us</a>}
              </div>
            </div>
          </div>
        </section>

        <section className="wrap faq" style={{ paddingTop: 24 }}>
          <h2>Questions</h2>
          <details><summary>What kind of TV does it need?</summary><p>Any smart TV with a web browser. If the TV is older or its browser is slow, a Chromecast or Fire TV Stick works well.</p></details>
          <details><summary>Does the rest home need to do anything?</summary><p>Only turn the TV on and leave it on the right input. Everything else is done by the family.</p></details>
          <details><summary>Can Grandpa reply?</summary><p>Not yet. Senders can see when their message has played on the TV.</p></details>
          <details><summary>Who can see the photos?</summary><p>Only people with the TV link or your admin link. Photos aren’t public or searchable. You can delete anything at any time.</p></details>
          <details><summary>How do I cancel?</summary><p>From your admin page, under Subscription. The screen keeps working until the end of the period you’ve paid for.</p></details>
        </section>
      </main>
      <SiteFoot />
    </>
  );
}
