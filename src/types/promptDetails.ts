import { GenerationSettings } from './settings';

export interface PromptAnalysis {
  strengths: string[];
  suggestions: string[];
  styleMatch: number;
  quality: number;
}

export interface GenerationDetails {
  id: string;
  prompt: string;
  settings: GenerationSettings;
  imageUrl: string;
  createdAt: string;
  analysis?: PromptAnalysis;
  metadata: {
    style: string;
    basePrompt?: string;
    iterationCount?: number;
    processingTime?: number;
    aiAssisted: boolean;
  };
}