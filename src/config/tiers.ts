import { UserTier, TierFeatures } from '@/types/creator';

export const TIER_FEATURES: Record<UserTier, TierFeatures> = {
  basic: {
    photoLimit: 20,
    canCustomizePrompts: false,
    hasAiAssistant: false,
    hasAdvancedSettings: false,
    canSavePresets: false,
    videoConversions: 0,
    hasPriority: false
  },
  pro: {
    photoLimit: 50,
    canCustomizePrompts: true,
    hasAiAssistant: true,
    hasAdvancedSettings: true,
    canSavePresets: true,
    videoConversions: 5,
    hasPriority: false
  },
  studio: {
    photoLimit: -1, // unlimited
    canCustomizePrompts: true,
    hasAiAssistant: true,
    hasAdvancedSettings: true,
    canSavePresets: true,
    videoConversions: 15,
    hasPriority: true
  }
};

export const TIER_PRICES = {
  basic: 20,
  pro: 49,
  studio: 99
};

export function getFeatures(tier: UserTier): TierFeatures {
  return TIER_FEATURES[tier];
}