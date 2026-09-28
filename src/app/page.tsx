import Link from 'next/link';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { PRICES, TRIAL_DAYS, SUPPORT_EMAIL, PRODUCT } from '@/lib/config';

// The room: window, lamp, armchair with the resident, a plant. The TV and phone sit on top as HTML.
function Room() {
  return (
    <svg className="room" viewBox="0 0 460 400" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <rect x="28" y="40" width="120" height="130" rx="10" fill="#CFE3F5" stroke="#fff" strokeWidth="8" />
      <path d="M88 40v130M28 105h120" stroke="#fff" strokeWidth="6" />
      <circle cx="120" cy="72" r="14" fill="#FFE7A8" />
      <path d="M20 36h136" stroke="#C99A86" strokeWidth="8" strokeLinecap="round" />
      <path d="M26 36c-6 50 4 100 12 140M150 36c6 50-4 100-12 140" stroke="#E8B9AC" strokeWidth="14" strokeLinecap="round" fill="none" opacity=".9" />
      <rect x="140" y="262" width="300" height="10" rx="5" fill="#C9A98B" />
      <rect x="160" y="272" width="10" height="40" fill="#B89475" /><rect x="410" y="272" width="10" height="40" fill="#B89475" />
      <g>
        <rect x="16" y="226" width="150" height="120" rx="34" fill="#7E9E86" />
        <rect x="30" y="286" width="122" height="62" rx="18" fill="#6A8C72" />
        <rect x="10" y="258" width="30" height="92" rx="14" fill="#6A8C72" /><rect x="142" y="258" width="30" height="92" rx="14" fill="#6A8C72" />
        <circle cx="92" cy="226" r="26" fill="#F2C9A8" />
        <path d="M66 222c2-22 50-26 52 0 0 0-6-14-26-14s-26 14-26 14z" fill="#E6E2EA" />
        <rect x="64" y="248" width="56" height="52" rx="20" fill="#C23A64" />
        <rect x="70" y="276" width="44" height="26" rx="8" fill="#F4E4D0" />
        <circle cx="84" cy="228" r="2.5" fill="#2E2140" /><circle cx="100" cy="228" r="2.5" fill="#2E2140" />
        <path d="M86 238q6 5 12 0" stroke="#2E2140" strokeWidth="2.4" fill="none" strokeLinecap="round" />
        <circle cx="84" cy="228" r="7" fill="none" stroke="#2E2140" strokeWidth="1.8" /><circle cx="100" cy="228" r="7" fill="none" stroke="#2E2140" strokeWidth="1.8" />
      </g>
      <g>
        <rect x="392" y="300" width="36" height="40" rx="6" fill="#C99A86" />
        <path d="M410 300c-24-10-30-40-16-52 6 18 12 26 16 52zM410 300c20-12 32-34 18-50-8 16-14 28-18 50zM410 300c0-24 2-40 0-60-6 20-4 40 0 60z" fill="#3F6B4F" />
      </g>
    </svg>
  );
}

// A little family photo for the TV in the scene.
function Photo() {
  return (
    <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#9ED0F0" /><stop offset="1" stopColor="#E6F4FB" /></linearGradient></defs>
      <rect width="320" height="180" fill="url(#sky)" />
      <path d="M0 140q80-30 160-8t160-6v54H0z" fill="#8CC08A" />
      <circle cx="262" cy="36" r="16" fill="#FFE08A" />
      <g><circle cx="120" cy="92" r="16" fill="#F2C9A8" /><rect x="102" y="108" width="36" height="46" rx="14" fill="#C23A64" /></g>
      <g><circle cx="170" cy="100" r="12" fill="#D8A27F" /><rect x="156" y="112" width="28" height="36" rx="11" fill="#FFC857" /></g>
      <g><circle cx="208" cy="96" r="14" fill="#F2C9A8" /><rect x="192" y="110" width="32" height="42" rx="12" fill="#2E2140" /></g>
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <SiteHead />
      <main>
        <section className="wrap hero">
          <div>
            <span className="eyebrow">Made for rest home rooms</span>
            <h1>Family photos, on Grandma’s own TV.</h1>
            <p className="lede">
              Everyone in the family sends photos, videos and little messages from their phone.
              They play on the TV in her room, with who sent them. She doesn’t need to press a thing.
            </p>
            <div className="row">
              <Link className="btn" href="/start">Set up a screen</Link>
              <a className="btn ghost" href="#how">How it works</a>
            </div>
            {TRIAL_DAYS > 0 && <p className="small muted" style={{ marginTop: 14 }}>Free for {TRIAL_DAYS} days, then {PRICES.monthly.label} or {PRICES.yearly.label}. Cancel any time.</p>}
          </div>
          <div className="scene" role="img" aria-label="A resident in an armchair watching family photos arrive on the TV in their room">
            <Room />
            <div className="tvbox">
              <div className="screen">
                <Photo />
                <span className="clock">10:42</span>
                <span className="from">From Sarah in Brisbane</span>
              </div>
            </div>
            <div className="phone"><div className="pic" /><div className="send">Send</div></div>
          </div>
        </section>

        <div className="wrap trust">
          <div><b>One price per TV</b>Monthly or yearly</div>
          <div><b>No app for anyone</b>Just a link and a phone</div>
          <div><b>Family only</b>You approve who can send</div>
          <div><b>Made in New Zealand</b>Prices in NZD</div>
        </div>

        <section className="wrap section" id="how">
          <div className="section-head"><h2>How it works</h2><p className="muted" style={{ margin: 0 }}>Ready in five minutes. Nothing to install.</p></div>
          <ol className="steps">
            <li><h3>Set up the screen</h3><p className="muted">Pick a name for the screen and pay online. You get a send link and a printable QR card for the family.</p></li>
            <li><h3>Connect the TV</h3><p className="muted">On the TV’s browser go to our short address. It shows a 6-digit code; type it on your phone and you’re done.</p></li>
            <li><h3>Share with the family</h3><p className="muted">Put the send link in the family group chat. Approve each new person once, then their photos go straight to the TV.</p></li>
          </ol>
        </section>

        <section className="band">
          <div className="wrap">
            <div className="section-head"><h2>Gentle by design</h2><p className="muted" style={{ margin: 0 }}>Built around the person in the room.</p></div>
            <div className="features">
              <div className="feature"><div className="ico" style={{ background: '#FCE8EE' }}><Ico d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" c="#C23A64" /></div><h3>Nothing to learn</h3><p>No buttons, apps or passwords for the resident. New messages play with a soft chime, then everything cycles.</p></div>
              <div className="feature"><div className="ico" style={{ background: '#FFF4D6' }}><Ico d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" c="#9A6B00" /></div><h3>Quiet at night</h3><p>From 8pm to 7am the screen dims to a big, easy clock. You choose the hours.</p></div>
              <div className="feature"><div className="ico" style={{ background: '#E3F4F1' }}><Ico d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" c="#0F766E" /></div><h3>Family only</h3><p>Only people you approve can send. Remove any message from your family page.</p></div>
              <div className="feature"><div className="ico" style={{ background: '#E9F1FC' }}><Ico d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0M12 19h.01" c="#2E2140" /></div><h3>Keeps going</h3><p>If the wifi drops it keeps playing recent photos, and we email you if the TV has been off for a day.</p></div>
            </div>
          </div>
        </section>

        <section className="wrap section" id="pricing">
          <div className="section-head"><h2>Simple pricing</h2><p className="muted" style={{ margin: 0 }}>One price per TV. Cancel any time.</p></div>
          <div className="price-grid">
            <div className="price-card">
              <h3>Monthly</h3>
              <div className="price">{PRICES.monthly.label}</div>
              <ul><li>Unlimited family members</li><li>Photos, videos and messages</li><li>Cancel any time</li></ul>
              <Link className="btn ghost" href="/start?plan=monthly">Choose monthly</Link>
            </div>
            <div className="price-card best">
              <span className="tag">Best value</span>
              <h3>Yearly</h3>
              <div className="price">{PRICES.yearly.label}</div>
              <ul><li>Everything in monthly</li><li>Cheaper than paying monthly</li><li>One payment a year</li></ul>
              <Link className="btn" href="/start?plan=yearly">Choose yearly</Link>
            </div>
            <div className="price-card dark">
              <h3>For rest homes</h3>
              <p style={{ margin: 0 }}>Offer {PRODUCT} to every resident, with one bill and help setting up the TVs.</p>
              <ul><li>A screen for each room</li><li>One invoice</li><li>Staff don’t need to do a thing</li></ul>
              {SUPPORT_EMAIL
                ? <a className="btn sun" href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(PRODUCT + ' for our rest home')}`}>Talk to us</a>
                : <Link className="btn sun" href="/start">Get started</Link>}
            </div>
          </div>
        </section>

        <section className="wrap section" id="questions" style={{ paddingTop: 16 }}>
          <h2>Questions families ask</h2>
          <div className="faq">
            <details><summary>What kind of TV does it need?</summary><p>Any smart TV with a web browser. If the TV is older or its browser is slow, a Chromecast or Fire TV Stick works well.</p></details>
            <details><summary>Does the rest home need to do anything?</summary><p>Only turn the TV on and leave it on the right input. Everything else is done by the family.</p></details>
            <details><summary>What happens after a power cut?</summary><p>Type the short address on the TV again and it goes straight back to the photos. No code needed a second time.</p></details>
            <details><summary>Can Grandpa reply?</summary><p>Not yet. Senders can see when their message has played on the TV.</p></details>
            <details><summary>Who can see the photos?</summary><p>Only the TV and the family members you approve. Photos aren’t public or searchable, and you can delete anything at any time.</p></details>
            <details><summary>How do I cancel?</summary><p>From your family page, under Subscription. The screen keeps working until the end of the period you’ve paid for.</p></details>
          </div>
        </section>

        <section className="wrap">
          <div className="cta-band">
            <div><h2>Bring the family into the room</h2><p>Set up a screen in five minutes. Photos can be on the TV tonight.</p></div>
            <Link className="btn sun" href="/start">Set up a screen</Link>
          </div>
        </section>
      </main>
      <SiteFoot />
    </>
  );
}

function Ico({ d, c }: { d: string; c: string }) {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
}
