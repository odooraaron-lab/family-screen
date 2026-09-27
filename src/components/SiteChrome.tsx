import Link from 'next/link';
import { PRODUCT, BRAND, APP_URL } from '@/lib/config';

export function SiteHead({ cta = true }: { cta?: boolean }) {
  return (
    <header className="wrap site-head">
      <a className="logo" href={APP_URL}><span className="logo-mark" aria-hidden="true" />{PRODUCT}</a>
      {cta && <Link className="btn small" href="/start">Set up a screen</Link>}
    </header>
  );
}

export function SiteFoot() {
  return (
    <footer className="wrap site-foot">
      <span>{PRODUCT} is made by {BRAND} in Aotearoa New Zealand.</span>
      <a href={`${APP_URL}/privacy`}>Privacy</a>
      <a href={`${APP_URL}/terms`}>Terms</a>
    </footer>
  );
}
