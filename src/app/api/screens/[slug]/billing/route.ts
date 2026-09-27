import { getScreen, isOwner } from '@/lib/screens';
import { stripe } from '@/lib/stripe';
import { screenUrl } from '@/lib/config';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** Sends the owner to Stripe's billing page (change card, switch plan, cancel). */
export async function GET(_: Request, { params }: { params: { slug: string } }) {
  const s = await getScreen(params.slug);
  if (!s || !isOwner(s) || !s.stripe_customer_id) {
    return new Response('Open your admin link from your email first.', { status: 403 });
  }
  const portal = await stripe().billingPortal.sessions.create({
    customer: s.stripe_customer_id,
    return_url: screenUrl(s.slug, '/family'),
  });
  return Response.redirect(portal.url, 303);
}
