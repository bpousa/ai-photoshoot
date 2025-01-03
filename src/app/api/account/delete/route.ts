import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { stripe } from '@/lib/stripe';

export async function DELETE(request: Request) {
  try {
    const { userId } = await request.json();

    // Get Stripe customer ID
    const { data: profile } = await supabase
      .from('profiles')
      .select('stripe_customer_id')
      .eq('id', userId)
      .single();

    if (profile?.stripe_customer_id) {
      // Cancel all subscriptions
      const subscriptions = await stripe.subscriptions.list({
        customer: profile.stripe_customer_id
      });

      await Promise.all(
        subscriptions.data.map(sub =>
          stripe.subscriptions.cancel(sub.id)
        )
      );

      // Delete customer
      await stripe.customers.del(profile.stripe_customer_id);
    }

    // Delete user
    const { error } = await supabase.auth.admin.deleteUser(userId);
    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Account deletion error:', error);
    return NextResponse.json(
      { error: 'Failed to delete account' },
      { status: 500 }
    );
  }
}