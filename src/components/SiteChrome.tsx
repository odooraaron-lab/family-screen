import Link from 'next/link';
import { PRODUCT, BRAND, APP_URL, SUPPORT_EMAIL } from '@/lib/config';

/** The product name with the umbrella brand in tiny letters underneath. */
export function Wordmark() {
  return <span className="wordmark"><span>{PRODUCT}</span><small>{BRAND}</small></span>;
}

export function Logo({ size = 34, light = false }: { size?: number; light?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true">
      <rect x="4" y="9" width="32" height="22" rx="6" fill={light ? '#fff' : '#2E2140'} />
      <rect x="8" y="13" width="24" height="14" rx="3" fill="#FFC857" />
      <path d="M20 24.5c-3.4-2.3-5.2-4-5.2-6a2.6 2.6 0 0 1 5.2-.9 2.6 2.6 0 0 1 5.2.9c0 2-1.8 3.7-5.2 6z" fill="#C23A64" />
      <rect x="14" y="32" width="12" height="3" rx="1.5" fill={light ? '#fff' : '#2E2140'} />
    </svg>
  );
}

export function SiteHead({ cta = true }: { cta?: boolean }) {
  return (
    <>
      <div className="announce">Photos from the family, straight to the TV in their room</div>
      <header className="wrap site-head">
        <a className="logo" href={APP_URL}><Logo /><Wordmark /></a>
        <nav className="site-nav" aria-label="Main">
          <a href={`${APP_URL}/#how`}>How it works</a>
          <a href={`${APP_URL}/#pricing`}>Pricing</a>
          <a href={`${APP_URL}/#questions`}>Questions</a>
        </nav>
        {cta ? <Link className="btn small" href="/start">Set up a screen</Link> : <span />}
      </header>
    </>
  );
}

export function SiteFoot() {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="brandcol">
          <a className="logo" href={APP_URL}><Logo light /><Wordmark /></a>
          <p style={{ margin: 0 }}>Family photos and messages on the TV in a rest home room. Nothing for the resident to learn.</p>
        </div>
        <div>
          <h4>{PRODUCT}</h4>
          <a href={`${APP_URL}/#how`}>How it works</a>
          <a href={`${APP_URL}/#pricing`}>Pricing</a>
          <a href={`${APP_URL}/start`}>Set up a screen</a>
          <a href={`${APP_URL}/tv`}>Connect a TV</a>
        </div>
        <div>
          <h4>Help</h4>
          <a href={`${APP_URL}/#questions`}>Questions</a>
          {SUPPORT_EMAIL && <a href={`mailto:${SUPPORT_EMAIL}`}>Contact us</a>}
          <a href={`${APP_URL}/privacy`}>Privacy</a>
          <a href={`${APP_URL}/terms`}>Terms</a>
        </div>
        <div className="fine">{PRODUCT} is made by {BRAND} in Aotearoa New Zealand.</div>
      </div>
    </footer>
  );
}
