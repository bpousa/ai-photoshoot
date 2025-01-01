export type UserTier = 'basic' | 'pro' | 'studio';

export interface TierFeatures {
  photoLimit: number;
  canCustomizePrompts: boolean;
  hasAiAssistant: boolean;
  hasAdvancedSettings: boolean;
  canSavePresets: boolean;
  videoConversions: number;
  hasPriority: boolean;
}

export interface GenerationSettings {
  numInferenceSteps: number;
  guidanceScale: number;
  loraWeight: number;
  negativePrompt?: string;
}

export interface StylePreset {
  id: string;
  name: string;
  description: string;
  basePrompt: string;
  settings: GenerationSettings;
}