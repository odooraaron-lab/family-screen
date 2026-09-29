import Link from 'next/link';
import { MobileBuyBar } from '@/components/MobileBuyBar';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { GUIDES } from '@/lib/guides';
import { PRODUCT, PRICES } from '@/lib/config';
import { pageMeta, JsonLd, breadcrumbLd } from '@/lib/seo';

export const metadata = pageMeta(
  '/guides',
  'Guides: Staying Close to Nana & Poppa in a Rest Home | Resthome TV NZ',
  'Practical guides for families: sending photos to grandparents, what the grandkids can share, gifts for Nana in care, loneliness, dementia and digital photo frames.',
);

export default function Guides() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: PRODUCT, path: '' }, { name: 'Guides', path: '/guides' }])} />
      <SiteHead />
      <main className="lp">
        <section className="wrap section">
          <span className="eyebrow">Guides for families</span>
          <h1 className="rt-h1">Staying close to Nana and Poppa</h1>
          <p className="lede muted" style={{ maxWidth: 640 }}>Practical ideas for keeping grandparents part of family life, especially after a move into care.</p>
          <div className="rt-guides">
            {GUIDES.map((g) => (
              <Link key={g.slug} href={`/${g.slug}`} className="feature rt-guide">
                <span className="rt-kicker">{g.kicker}</span>
                <h2>{g.h1}</h2>
                <p>{g.intro.split('. ')[0]}.</p>
                <span className="rt-more">Read the guide →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFoot />
      <MobileBuyBar title={PRICES.monthly.label} note="The whole family sends free" href="/start" label="Set up a screen" />
    </>
  );
}
