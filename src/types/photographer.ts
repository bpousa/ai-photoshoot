export interface PhotoPrompt {
  id: string;
  name: string;
  basePrompt: string;
  category: 'professional' | 'casual' | 'travel' | 'lifestyle';
  settings: PhotoSettings;
  variations: PromptVariation[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PhotoSettings {
  seed?: number;
  numInferenceSteps: number;
  guidanceScale: number;
  loraWeight: number;
  negativePrompt?: string;
}

export interface PromptVariation {
  id: string;
  promptId: string;
  modifiedPrompt: string;
  settings: PhotoSettings;
  resultUrl?: string;
  score?: number; // 1-5 rating
  notes?: string;
  createdAt: Date;
}

export interface PromptIdea {
  id: string;
  prompt: string;
  category: string;
  description: string;
  suggestedSettings?: PhotoSettings;
  createdBy: 'human' | 'ai';
  createdAt: Date;
}