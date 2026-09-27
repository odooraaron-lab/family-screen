import type Stripe from 'stripe';
import { db } from './db';
import { getScreen, type Screen } from './screens';
import { welcomeEmail } from './email';
import { reportToHQ } from './hq';
import { screenUrl } from './config';

const idOf = (x: string | { id: string } | null | undefined) => (typeof x === 'string' ? x : x?.id ?? null);

/**
 * Turns a paid checkout into a live screen. Safe to call twice (webhook + thank-you page):
 * only the first call sends the welcome email.
 */
export async function activateFromSession(session: Stripe.Checkout.Session): Promise<Screen | null> {
  const slug = session.metadata?.site_slug;
  if (!slug || session.status !== 'complete') return null;
  const rows = await db()`
    update fs_screens set status = 'active', activated_at = now(),
      stripe_customer_id = ${idOf(session.customer as any)}, stripe_subscription_id = ${idOf(session.subscription as any)}
    where slug = ${slug} and checkout_session_id = ${session.id} and status = 'pending'
    returning *`;
  if (rows.length) {
    const s = rows[0] as Screen;
    await welcomeEmail(s);
    await reportToHQ({
      type: 'site.upsert', slug: s.slug, url: screenUrl(s.slug), owner_email: s.owner_email,
      owner_name: s.owner_name, status: 'live', order_id: session.id,
    });
  }
  return getScreen(slug);
}

/** Keeps the screen in step with its Stripe subscription. */
export async function syncSubscription(sub: Stripe.Subscription) {
  const live = ['active', 'trialing', 'past_due'].includes(sub.status); // past_due = Stripe is still retrying
  const rows = await db()`
    update fs_screens set status = ${live ? 'active' : 'lapsed'}
    where stripe_subscription_id = ${sub.id} and status in ('active', 'lapsed')
    returning slug`;
  for (const r of rows) {
    await reportToHQ({ type: 'site.upsert', slug: r.slug, status: live ? 'live' : 'expired' });
  }
}
