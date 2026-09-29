import Link from 'next/link';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import type { Metadata } from 'next';
import { PRICES, TRIAL_DAYS, SUPPORT_EMAIL, PRODUCT } from '@/lib/config';
import { GUIDES } from '@/lib/guides';
import { pageMeta, JsonLd, faqLd, productLd, organizationLd } from '@/lib/seo';

export const metadata: Metadata = pageMeta(
  '',
  'Send Photos of the Grandkids to Nana’s TV in the Rest Home | Resthome TV NZ',
  'Keep Nana and Poppa updated. The whole family sends photos, videos and messages from their phones and they play on the TV in their rest home room. No app, nothing for them to learn.',
);

const FAQ: [string, string][] = [
  ['What kind of TV does it need?', 'Any smart TV with a web browser. If the TV is older or its browser is slow, a Chromecast or Fire TV Stick works well.'],
  ['Does the rest home need to do anything?', 'Only turn the TV on and leave it on the right input. Everything else is done by the family.'],
  ['Can the grandkids send photos?', 'Yes. Share the send link or QR card with the whole family. Each new sender is approved once, then they can send photos, short videos and notes from any phone, with no app.'],
  ['Is it better than a digital photo frame?', 'If there’s a TV in the room, it’s much bigger, shows who sent each photo in large letters, and plays written messages and short videos too. If there’s no TV, a frame is a good choice.'],
  ['What happens after a power cut?', 'Type the short address on the TV again and it goes straight back to the photos. No code needed a second time.'],
  ['Can Mum reply?', 'Not yet. Senders can see when their message has played on the TV.'],
  ['Who can see the photos?', 'Only the TV and the family members you approve. Photos aren’t public or searchable, and you can delete anything at any time.'],
  ['How do I cancel?', 'From your family page, under Subscription. The screen keeps working until the end of the period you’ve paid for.'],
];

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

const Tick = () => <svg className="tick" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#E3F4F1" /><path d="M7 12.5l3 3 7-7" fill="none" stroke="#0F766E" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
const Cross = () => <svg className="tick" width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="11" fill="#FCE8EE" /><path d="M8.5 8.5l7 7M15.5 8.5l-7 7" fill="none" stroke="#C23A64" strokeWidth="2.6" strokeLinecap="round" /></svg>;

function Ico({ d, c }: { d: string; c: string }) {
  return <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>;
}

const COMPARE: { what: string; us: boolean; call: boolean; frame: boolean; chat: boolean }[] = [
  { what: 'Nothing for Mum or Dad to press, charge or remember', us: true, call: false, frame: true, chat: false },
  { what: 'Family can send without installing an app', us: true, call: false, frame: false, chat: false },
  { what: 'Shows who sent it, big and easy to read', us: true, call: true, frame: false, chat: false },
  { what: 'Photos, short videos and written messages', us: true, call: false, frame: false, chat: true },
  { what: 'On the big TV they already have', us: true, call: false, frame: false, chat: false },
  { what: 'You approve who can send', us: true, call: true, frame: false, chat: false },
  { what: 'Dims to a clock at night', us: true, call: false, frame: false, chat: false },
];

export default function Home() {
  return (
    <>
      <JsonLd data={[organizationLd(), productLd(), faqLd(FAQ)]} />
      <SiteHead />
      <main className="lp">
        {/* ── Hero ── */}
        <section className="lp-hero">
          <div className="wrap lp-hero-in">
            <div>
              <span className="eyebrow">For Nana, Poppa and the whole whānau</span>
              <h1>Be part of Mum’s day, <span className="hl">even when you can’t be there.</span></h1>
              <p className="lede">
                The whole family sends photos, videos and little notes from their phones. They appear on the TV in her room,
                with who sent them. She doesn’t have to press a thing.
              </p>
              <div className="row">
                <Link className="btn big" href="/start">Set up Mum’s screen</Link>
                <a className="btn ghost big" href="#how">See how it works</a>
              </div>
              <ul className="lp-promise">
                <li><Tick /> Ready in five minutes</li>
                <li><Tick /> No app, no passwords</li>
                <li><Tick /> {TRIAL_DAYS > 0 ? `${TRIAL_DAYS} days free, then ` : ''}{PRICES.monthly.label}, cancel any time</li>
              </ul>
            </div>
            <div className="lp-stage">
              <div className="scene" role="img" aria-label="A resident in an armchair as family photos and messages arrive on the TV in their room">
                <Room />
                <div className="tvbox"><div className="screen"><Photo /><span className="clock">10:42</span><span className="from">From Sarah in Brisbane</span></div></div>
                <div className="phone"><div className="pic" /><div className="send">Send</div></div>
              </div>
              <div className="bubble b1"><b>Aroha</b>See you Sunday, Nana! 💛</div>
              <div className="bubble b2"><b>Sam</b>sent 3 photos from the beach</div>
              <div className="bubble b3"><b>Mike</b>sent a video · 0:42</div>
            </div>
          </div>
        </section>

        {/* ── The problem ── */}
        <section className="lp-dark">
          <div className="wrap">
            <p className="kicker">Sound familiar?</p>
            <h2>Visits are precious. <br />The days in between are long.</h2>
            <div className="lp-pains">
              <div><span className="pain-ico"><Ico d="M7 2h10v20H7zM11 18h2" c="#FFC857" /></span><h3>Phones and tablets get too hard</h3><p>Tiny buttons, forgotten passwords, flat batteries. The tablet ends up in a drawer.</p></div>
              <div><span className="pain-ico"><Ico d="M15 10l5-3v10l-5-3zM3 6h12v12H3z" c="#FFC857" /></span><h3>Video calls need someone to help</h3><p>Staff are busy, time zones clash, and calls get missed.</p></div>
              <div><span className="pain-ico"><Ico d="M4 5h16v11H8l-4 4z" c="#FFC857" /></span><h3>Photos stay stuck in the group chat</h3><p>The grandkids’ photos are on everyone’s phone except the one person who’d love them most.</p></div>
            </div>
          </div>
        </section>

        {/* ── The answer ── */}
        <section className="wrap section lp-answer">
          <div className="lp-answer-copy">
            <p className="kicker dark">The answer</p>
            <h2>One screen. The whole family. <br />Nothing for Mum to learn.</h2>
            <p className="lede">{PRODUCT} turns the TV in her room into a window on the family. Every photo, video and note you send plays on the big screen, with a gentle chime and your name, then keeps cycling all day.</p>
            <ul className="lp-list">
              <li><Tick /><span><b>Big, clear and calm.</b> Large text, one thing at a time, a clock always on screen.</span></li>
              <li><Tick /><span><b>Family only.</b> You approve each new person once. Nothing is public.</span></li>
              <li><Tick /><span><b>Works on the TV she already has.</b> Any smart TV, or a Chromecast or Fire TV Stick.</span></li>
              <li><Tick /><span><b>Quiet at night.</b> From 8pm to 7am it dims to a big, easy clock.</span></li>
            </ul>
            <Link className="btn big" href="/start">Set up Mum’s screen</Link>
          </div>
          <div className="lp-answer-tv" aria-hidden="true">
            <div className="tvbig">
              <div className="tvbig-screen">
                <span className="tv-clock">Tuesday 10:42</span>
                <span className="tv-new">New</span>
                <p className="tv-msg">“Happy birthday Nana! The kids made you a cake. Can’t wait to see you at Christmas.”</p>
                <span className="tv-from">From Sarah in Brisbane</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Grandkids ── */}
        <section className="wrap section" id="grandkids">
          <div className="section-head" style={{ display: 'block' }}>
            <span className="eyebrow">Keep Nana and Poppa in the loop</span>
            <h2>The grandkids grow up fast. Now Nana doesn’t miss it.</h2>
            <p className="muted" style={{ maxWidth: 680, margin: 0 }}>The family group chat moves faster than Nana can scroll. Send the everyday moments to her TV instead, where she can actually see them, with the grandkid’s name in big letters.</p>
          </div>
          <div className="rt-grand">
            <div className="feature"><h3>After school</h3><p>A photo at the gate, what’s in the lunchbox, a new haircut.</p></div>
            <div className="feature"><h3>Big moments</h3><p>Lost teeth, certificates, sports games, kapa haka and school shows.</p></div>
            <div className="feature"><h3>Made with love</h3><p>Drawings of Nana, Lego, baking her recipe, a card for her birthday.</p></div>
            <div className="feature"><h3>Just because</h3><p>“Good morning Nana!”, “See you Sunday!”, a photo of the dog being silly.</p></div>
          </div>
          <div className="row" style={{ marginTop: 18 }}>
            <Link className="btn ghost" href="/what-to-send-nana">40 things to send Nana</Link>
            <Link className="btn ghost" href="/send-photos-to-grandparents">Sending photos to grandparents</Link>
          </div>
        </section>

        {/* ── Who it's for ── */}
        <section className="band">
          <div className="wrap">
            <div className="section-head"><h2>Made for everyone around Mum</h2></div>
            <div className="lp-who">
              <div className="who w1"><h3>For the family far away</h3><p>Send a photo from the airport, a video from the school concert, a quick “thinking of you”. It’s on her TV in seconds, wherever you are.</p></div>
              <div className="who w2"><h3>For Mum or Dad</h3><p>No buttons, no apps, no passwords. Just the faces they love on the TV, with names in big letters, and a soft chime when something new arrives.</p></div>
              <div className="who w3"><h3>For the rest home staff</h3><p>Nothing to set up and nothing to manage. The TV just needs to be on. Families do the rest from their phones.</p></div>
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="wrap section" id="how">
          <div className="section-head"><h2>Up and running in five minutes</h2><p className="muted" style={{ margin: 0 }}>Nothing to install, for anyone.</p></div>
          <ol className="steps">
            <li><h3>Set up the screen</h3><p className="muted">Choose a name for the screen and pay online. You get a send link and a printable QR card for the family.</p></li>
            <li><h3>Connect the TV</h3><p className="muted">On the TV’s browser, go to our short address. Type the 6-digit code it shows into your phone. Done, and it remembers.</p></li>
            <li><h3>Share with the family</h3><p className="muted">Drop the send link in the family group chat. Approve each person once, then their photos go straight to the TV.</p></li>
          </ol>
        </section>

        {/* ── Comparison ── */}
        <section className="wrap section" style={{ paddingTop: 0 }}>
          <div className="section-head"><h2>Why not just…?</h2><p className="muted" style={{ margin: 0 }}>How {PRODUCT} compares with what families usually try.</p></div>
          <div className="compare-wrap">
            <table className="compare">
              <thead><tr><th scope="col"><span className="sr-only">Feature</span></th><th scope="col" className="us">{PRODUCT}</th><th scope="col">Video calls</th><th scope="col">Digital photo frame</th><th scope="col">Family group chat</th></tr></thead>
              <tbody>
                {COMPARE.map((r) => (
                  <tr key={r.what}><th scope="row">{r.what}</th><td className="us">{r.us ? <Tick /> : <Cross />}</td><td>{r.call ? <Tick /> : <Cross />}</td><td>{r.frame ? <Tick /> : <Cross />}</td><td>{r.chat ? <Tick /> : <Cross />}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Features ── */}
        <section className="band">
          <div className="wrap">
            <div className="section-head"><h2>Gentle by design</h2><p className="muted" style={{ margin: 0 }}>Built around the person in the room.</p></div>
            <div className="features">
              <div className="feature"><div className="ico" style={{ background: '#FCE8EE' }}><Ico d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" c="#C23A64" /></div><h3>Nothing to learn</h3><p>New messages play first with a soft chime, then everything cycles. No remote needed.</p></div>
              <div className="feature"><div className="ico" style={{ background: '#FFF4D6' }}><Ico d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" c="#9A6B00" /></div><h3>Quiet at night</h3><p>The screen dims to a big clock overnight. You choose the hours.</p></div>
              <div className="feature"><div className="ico" style={{ background: '#E3F4F1' }}><Ico d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" c="#0F766E" /></div><h3>Private</h3><p>Only people you approve can send. Remove anything, any time, from your family page.</p></div>
              <div className="feature"><div className="ico" style={{ background: '#E9F1FC' }}><Ico d="M5 12.5a10 10 0 0 1 14 0M8 15.5a6 6 0 0 1 8 0M12 19h.01" c="#2E2140" /></div><h3>Keeps going</h3><p>If the Wi-Fi drops it keeps playing, and we email you if the TV has been off for a day.</p></div>
            </div>
          </div>
        </section>

        {/* ── Pricing ── */}
        <section className="wrap section" id="pricing">
          <div className="section-head"><h2>One simple price per TV</h2><p className="muted" style={{ margin: 0 }}>The whole family sends for free. Cancel any time.</p></div>
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
              <ul><li>A screen for each room</li><li>One invoice</li><li>Nothing for staff to manage</li></ul>
              {SUPPORT_EMAIL
                ? <a className="btn sun" href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(PRODUCT + ' for our rest home')}`}>Talk to us</a>
                : <Link className="btn sun" href="/start">Get started</Link>}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="wrap section" id="questions" style={{ paddingTop: 16 }}>
          <h2>Questions families ask</h2>
          <div className="faq">
            {FAQ.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
          </div>
        </section>

        {/* ── Guides ── */}
        <section className="wrap section" style={{ paddingTop: 0 }}>
          <div className="section-head"><h2>Guides for families</h2><Link href="/guides" className="small">All guides →</Link></div>
          <div className="rt-chips">{GUIDES.map((g) => <Link key={g.slug} href={`/${g.slug}`} className="rt-chip">{g.nav}</Link>)}</div>
        </section>

        {/* ── Close ── */}
        <section className="wrap">
          <div className="cta-band">
            <div><h2>Tonight, Mum could be looking at the grandkids.</h2><p>Set up a screen in five minutes and send the first photo straight away.</p></div>
            <Link className="btn sun big" href="/start">Set up Mum’s screen</Link>
          </div>
        </section>
      </main>
      <SiteFoot />
    </>
  );
}
