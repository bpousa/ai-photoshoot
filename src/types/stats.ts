export interface UserStats {
  dailyGenerated: number;
  dailyLimit: number;
  successRate: number;
  creditsRemaining: number;
}

export interface StyleStats {
  name: string;
  count: number;
  successRate: number;
}

export interface TimeStats {
  hour: number;
  count: number;
  successRate: number;
}

export interface GenerationStats {
  user: UserStats;
  styles: StyleStats[];
  timeDistribution: TimeStats[];
  lastUpdated: string;
}