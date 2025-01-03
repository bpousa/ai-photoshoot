import { supabase } from '@/lib/supabase';

const TIER_LIMITS = {
  basic: { photos: 20, videos: 0 },
  pro: { photos: 50, videos: 5 },
  studio: { photos: -1, videos: 15 }
};

export async function checkUsageLimit(userId: string, type: 'photo' | 'video') {
  const { data: usage } = await supabase
    .from('usage')
    .select('monthly_photos, monthly_videos')
    .eq('user_id', userId)
    .single();

  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('tier')
    .eq('user_id', userId)
    .single();

  const limits = TIER_LIMITS[subscription.tier];
  const current = type === 'photo' ? usage.monthly_photos : usage.monthly_videos;
  const limit = type === 'photo' ? limits.photos : limits.videos;

  return {
    canGenerate: limit === -1 || current < limit,
    remaining: limit === -1 ? -1 : limit - current
  };
}