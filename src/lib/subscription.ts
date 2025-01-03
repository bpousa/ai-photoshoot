import { stripe, PRICE_IDS } from './stripe';
import { supabase } from './supabase';

export async function createSubscription(customerId: string, tier: keyof typeof PRICE_IDS) {
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: PRICE_IDS[tier] }],
    metadata: { tier },
    payment_behavior: 'default_incomplete',
    payment_settings: { save_default_payment_method: 'on_subscription' },
    expand: ['latest_invoice.payment_intent']
  });

  return subscription;
}

export async function cancelSubscription(subscriptionId: string) {
  await stripe.subscriptions.cancel(subscriptionId);
}

export async function getUsage(userId: string) {
  const { data } = await supabase
    .from('usage')
    .select('*')
    .eq('user_id', userId)
    .single();

  return {
    totalPhotos: data?.total_photos || 0,
    totalVideos: data?.total_videos || 0,
    monthlyPhotos: data?.monthly_photos || 0,
    monthlyVideos: data?.monthly_videos || 0,
  };
}