export interface SettingOption {
  value: number;
  label: string;
  description: string;
}

export interface PresetSettings {
  name: string;
  numInferenceSteps: number;
  guidanceScale: number;
  loraWeight: number;
  description: string;
}

export const QUALITY_PRESETS: Record<string, PresetSettings> = {
  balanced: {
    name: 'Balanced',
    numInferenceSteps: 30,
    guidanceScale: 7.5,
    loraWeight: 0.75,
    description: 'Good balance of quality and speed'
  },
  quality: {
    name: 'High Quality',
    numInferenceSteps: 50,
    guidanceScale: 8.5,
    loraWeight: 0.8,
    description: 'Best quality, slower generation'
  },
  speed: {
    name: 'Fast',
    numInferenceSteps: 20,
    guidanceScale: 7.0,
    loraWeight: 0.7,
    description: 'Faster generation, good quality'
  }
};