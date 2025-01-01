export interface GenerationHistory {
  id: string;
  prompt: string;
  style: string;
  settings: {
    numInferenceSteps: number;
    guidanceScale: number;
    loraWeight: number;
  };
  imageUrl: string;
  createdAt: string;
  status: 'success' | 'failed';
  metadata?: {
    aiSuggested?: boolean;
    basePrompt?: string;
    improvements?: string[];
  };
}

export interface HistoryFilters {
  style?: string;
  status?: 'success' | 'failed';
  startDate?: string;
  endDate?: string;
  aiSuggested?: boolean;
}

export interface GenerationStats {
  totalGenerated: number;
  successRate: number;
  averageQualityScore?: number;
  mostUsedStyle: string;
  remainingCredits: number;
}