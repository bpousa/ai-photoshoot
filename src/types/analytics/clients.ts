export interface ClientMetrics {
  id: string;
  name: string;
  stats: {
    totalPhotos: number;
    totalVideos: number;
    lastGenerated: Date;
    lastLogin: Date;
    averagePhotosPerMonth: number;
    subscriptionStatus: 'active' | 'inactive' | 'pending';
  };
  usage: {
    currentPeriod: {
      photos: number;
      videos: number;
    };
    remaining: {
      photos: number;
      videos: number;
    };
  };
}

export interface ClientActivityLog {
  clientId: string;
  action: 'generate' | 'login' | 'download' | 'package_change';
  timestamp: Date;
  details?: Record<string, any>;
}