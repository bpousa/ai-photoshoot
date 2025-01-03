import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface Subscription {
  tier: 'basic' | 'pro' | 'studio';
  status: 'active' | 'past_due' | 'canceled';
  currentPeriodEnd: string;
}

export function useSubscription(userId?: string) {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSubscription = useCallback(async () => {
    if (!userId) return;

    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('tier, status, current_period_end')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      if (data) {
        setSubscription({
          tier: data.tier,
          status: data.status,
          currentPeriodEnd: data.current_period_end
        });
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchSubscription();

    // Listen for subscription updates
    const channel = supabase
      .channel(`subscription:${userId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'subscriptions',
        filter: `user_id=eq.${userId}`
      }, () => {
        fetchSubscription();
      })
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, [userId, fetchSubscription]);

  return { subscription, loading, refetch: fetchSubscription };
}