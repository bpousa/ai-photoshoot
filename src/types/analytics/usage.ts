export interface UsageMetrics {
  photos: {
    generated: number;
    creditsUsed: number;
    creditsRemaining: number;
  };
  videos: {
    generated: number;
    creditsUsed: number;
    creditsRemaining: number;
  };
}

export interface UsageByClient {
  clientId: string;
  clientName: string;
  photos: number;
  videos: number;
  lastGenerated: Date;
}