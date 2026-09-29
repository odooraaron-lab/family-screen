import type { Metadata } from 'next';
import { APP_URL, BRAND, PRODUCT, PRICES } from './config';

// The public address, for canonical links, the sitemap and structured data.
export const SITE = APP_URL;
export const OG_IMAGE = { url: '/opengraph-image', width: 1200, height: 630, alt: `${PRODUCT}: family photos on Nana’s TV in the rest home` };

/** Page metadata with a canonical link and matching social-share text. */
export function pageMeta(path: string, title: string, description: string, extra: Metadata = {}): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path || '/' },
    openGraph: { title, description, url: path || '/', siteName: `${PRODUCT} by ${BRAND}`, locale: 'en_NZ', type: 'website', images: [OG_IMAGE] },
    twitter: { card: 'summary_large_image', title, description, images: [OG_IMAGE.url] },
    ...extra,
  };
}

/** Structured data for Google. */
export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}

export const organizationLd = () => ({
  '@context': 'https://schema.org', '@type': 'Organization', name: BRAND, url: SITE, logo: `${SITE}/icon.svg`, areaServed: 'NZ',
});

const num = (label: string) => (label.match(/[\d.]+/) || ['0'])[0];

/** The product with both prices (read from the price labels, e.g. "$9 a month"). */
export const productLd = (path = '') => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${PRODUCT} by ${BRAND}`,
  description: 'Family send photos, videos and messages from their phones and they play on the TV in a grandparent’s rest home room. Nothing for the resident to learn.',
  url: `${SITE}${path}`,
  image: `${SITE}/opengraph-image`,
  brand: { '@type': 'Brand', name: BRAND },
  category: 'Family photo sharing for aged care',
  offers: [
    { '@type': 'Offer', name: 'Monthly', price: num(PRICES.monthly.label), priceCurrency: 'NZD', url: `${SITE}/start?plan=monthly`, availability: 'https://schema.org/InStock' },
    { '@type': 'Offer', name: 'Yearly', price: num(PRICES.yearly.label), priceCurrency: 'NZD', url: `${SITE}/start?plan=yearly`, availability: 'https://schema.org/InStock' },
  ],
});

export const faqLd = (items: [string, string][]) => ({
  '@context': 'https://schema.org', '@type': 'FAQPage',
  mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${SITE}${it.path}` })),
});

export const articleLd = (path: string, headline: string, description: string) => ({
  '@context': 'https://schema.org', '@type': 'Article', headline, description, inLanguage: 'en-NZ',
  mainEntityOfPage: `${SITE}${path}`, author: { '@type': 'Organization', name: BRAND }, publisher: { '@type': 'Organization', name: BRAND },
});
