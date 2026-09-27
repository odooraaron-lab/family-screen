import type Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { activateFromSession, syncSubscription } from '@/lib/activate';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * This app's own Stripe webhook (the admin has a separate one).
 * Events: checkout.session.completed, customer.subscription.updated, customer.subscription.deleted
 */
export async function POST(req: Request) {
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(raw, req.headers.get('stripe-signature') || '', process.env.STRIPE_WEBHOOK_SECRET || '');
  } catch {
    return new Response('Bad signature', { status: 400 });
  }
  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.metadata?.site_slug) await activateFromSession(session);
    }
    if (event.type === 'customer.subscription.updated' || event.type === 'customer.subscription.deleted') {
      await syncSubscription(event.data.object as Stripe.Subscription);
    }
  } catch (e) {
    console.error('webhook failed', event.type, e);
    return new Response('Handler error', { status: 500 });
  }
  return Response.json({ received: true });
}
