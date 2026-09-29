import Link from 'next/link';
import { MobileBuyBar } from '@/components/MobileBuyBar';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SiteHead, SiteFoot } from '@/components/SiteChrome';
import { TvMock } from '@/components/TvMock';
import { GUIDES, getGuide } from '@/lib/guides';
import { PRICES, PRODUCT } from '@/lib/config';
import { pageMeta, JsonLd, faqLd, breadcrumbLd, articleLd, productLd } from '@/lib/seo';

// Guide pages (/send-photos-to-grandparents …). Unknown slugs 404.
export const dynamicParams = false;
export function generateStaticParams() {
  return GUIDES.map((g) => ({ guide: g.slug }));
}

const fill = (s: string) => s.replace('{monthly}', PRICES.monthly.label).replace('{yearly}', PRICES.yearly.label);

export function generateMetadata({ params }: { params: { guide: string } }): Metadata {
  const g = getGuide(params.guide);
  return g ? pageMeta(`/${g.slug}`, g.title, fill(g.description)) : {};
}

export default function GuidePage({ params }: { params: { guide: string } }) {
  const g = getGuide(params.guide);
  if (!g) notFound();
  const faq = g.faq.map(([q, a]) => [q, fill(a)] as [string, string]);
  return (
    <>
      <JsonLd data={[articleLd(`/${g.slug}`, g.h1, fill(g.description)), faqLd(faq), productLd(`/${g.slug}`),
        breadcrumbLd([{ name: PRODUCT, path: '' }, { name: 'Guides', path: '/guides' }, { name: g.nav, path: `/${g.slug}` }])]} />
      <SiteHead />
      <main className="lp">
        <section className="lp-hero">
          <div className="wrap lp-hero-in">
            <div>
              <nav className="small muted" aria-label="Breadcrumb" style={{ marginBottom: 14 }}>
                <Link href="/">{PRODUCT}</Link> › <Link href="/guides">Guides</Link> › {g.nav}
              </nav>
              <span className="eyebrow">{g.kicker}</span>
              <h1 className="rt-h1">{g.h1}</h1>
              <p className="lede">{fill(g.intro)}</p>
              <div className="row">
                <Link className="btn big" href="/start">Set up a screen</Link>
                <Link className="btn big ghost" href="/#how">How it works</Link>
              </div>
            </div>
            <TvMock msg={g.tv.msg} from={g.tv.from} time={g.tv.time} />
          </div>
        </section>

        <article className="wrap section rt-body">
          <div className="rt-main">
            {g.sections.map((s) => (
              <section key={s.h2}>
                <h2>{s.h2}</h2>
                {s.body.map((p) => <p key={p}>{fill(p)}</p>)}
                {s.list && <ul className="rt-list">{s.list.map((li) => <li key={li}>{li}</li>)}</ul>}
              </section>
            ))}
            {g.ideas && (
              <section>
                <h2>Ideas to send</h2>
                <div className="rt-ideas">{g.ideas.map((i) => <div key={i.h} className="feature"><h3>{i.h}</h3><p>{i.p}</p></div>)}</div>
              </section>
            )}
            {g.sources && (
              <section className="rt-sources">
                <h2>Sources and support</h2>
                <ul>{g.sources.map((s) => <li key={s.url}><a href={s.url} target="_blank" rel="noopener">{s.name}</a></li>)}</ul>
              </section>
            )}
          </div>
          <aside className="rt-side">
            <div className="price-card best">
              <span className="tag">{PRODUCT}</span>
              <h3>Family photos on their TV</h3>
              <div className="price">{PRICES.monthly.label}</div>
              <p className="muted small" style={{ margin: 0 }}>or {PRICES.yearly.label} · the whole family sends free</p>
              <ul><li>Nothing for them to learn</li><li>Big names and a gentle chime</li><li>Family send from a link, no app</li><li>Dims to a clock at night</li></ul>
              <Link className="btn" href="/start">Set up a screen</Link>
            </div>
          </aside>
        </article>

        <section className="wrap section" id="questions">
          <h2>Questions</h2>
          <div className="faq">{faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}</div>
        </section>

        <section className="wrap section" style={{ paddingTop: 0 }}>
          <h2 style={{ fontSize: 26 }}>Read next</h2>
          <div className="rt-chips m-chips">
            {g.related.map((r) => { const o = getGuide(r); return o ? <Link key={r} href={`/${r}`} className="rt-chip">{o.nav}</Link> : null; })}
            <Link href="/guides" className="rt-chip">All guides</Link>
          </div>
        </section>

        <section className="wrap">
          <div className="cta-band">
            <div><h2>Tonight, Nana could be looking at the grandkids.</h2><p>Set up a screen in five minutes and send the first photo straight away.</p></div>
            <Link className="btn sun big" href="/start">Set up a screen</Link>
          </div>
        </section>
      </main>
      <SiteFoot />
      <MobileBuyBar title={PRICES.monthly.label} note="The whole family sends free" href="/start" label="Set up a screen" />
    </>
  );
}
