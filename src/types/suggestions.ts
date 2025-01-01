export interface PromptSuggestion {
  prompt: string;
  reason: string;
  confidence: number;
}

export interface SuggestionRequest {
  basePrompt: string;
  style: string;
  count?: number;
}

export interface SuggestionResponse {
  suggestions: PromptSuggestion[];
  basePromptScore?: number;
  improvements?: string[];
}

export const STYLE_KEYWORDS = {
  professional: [
    'corporate',
    'business casual',
    'executive',
    'formal',
    'polished'
  ],
  casual: [
    'relaxed',
    'natural',
    'candid',
    'lifestyle',
    'spontaneous'
  ],
  creative: [
    'artistic',
    'experimental',
    'unique',
    'dramatic',
    'conceptual'
  ]
};