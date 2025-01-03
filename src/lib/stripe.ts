import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const PRICE_IDS = {
  basic: process.env.STRIPE_BASIC_PRICE_ID,
  pro: process.env.STRIPE_PRO_PRICE_ID,
  studio: process.env.STRIPE_STUDIO_PRICE_ID
};

export async function createCustomer(email: string, name?: string) {
  return await stripe.customers.create({
    email,
    name,
    metadata: {
      source: 'ai_photoshoot'
    }
  });
}

export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl
}: {
  customerId: string;
  priceId: string;
  successUrl: string;
  cancelUrl: string;
}) {
  return await stripe.checkout.sessions.create({
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl
  });
}