export const BRAND = process.env.BRAND_NAME || 'myQR';
export const PRODUCT = process.env.PRODUCT_NAME || 'Resthome TV';
export const APP_URL = (process.env.APP_URL || 'http://localhost:3000').replace(/\/$/, '');
export const SCREENS_DOMAIN = (process.env.SCREENS_DOMAIN || '').toLowerCase();
export const SUPPORT_EMAIL = process.env.SUPPORT_EMAIL || '';
export const PRICES = {
  monthly: { id: process.env.STRIPE_PRICE_MONTHLY || '', label: process.env.PRICE_MONTHLY_LABEL || '$9 a month' },
  yearly: { id: process.env.STRIPE_PRICE_YEARLY || '', label: process.env.PRICE_YEARLY_LABEL || '$79 a year' },
};
export const TRIAL_DAYS = Math.max(0, Number(process.env.TRIAL_DAYS || 0));

/** Words that can't be used as a screen address. */
export const RESERVED = new Set([
  'www', 'admin', 'api', 'app', 'mail', 'email', 'hq', 'help', 'support', 'start', 'status', 'blog',
  's', 'tv', 'send', 'family', 'card', 'login', 'billing', 'privacy', 'terms', 'static', 'assets', 'cdn', 'test',
]);

export const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]{1,28}[a-z0-9])$/;

/** Full link to a page of a screen: https://grandpa-joe.resthome.myqr.co.nz/send, or /s/grandpa-joe/send without a domain. */
export function screenUrl(slug: string, path = '') {
  if (SCREENS_DOMAIN) return `https://${slug}.${SCREENS_DOMAIN}${path}`;
  return `${APP_URL}/s/${slug}${path}`;
}
