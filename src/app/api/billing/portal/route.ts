import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getProfile } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const { userId } = await request.json();
    const profile = await getProfile(userId);

    const session = await stripe.billingPortal.sessions.create({
      customer: profile.stripe_customer_id,
      return_url: `${process.env.NEXT_PUBLIC_URL}/account/billing`
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create portal session' },
      { status: 500 }
    );
  }
}