export interface Package {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  type: 'one_time' | 'subscription';
  duration?: number; // in days, for subscriptions
  credits: {
    photos: number;
    videos: number;
  };
  features: string[];
  settings?: {
    allowRollover: boolean;
    priority: boolean;
    customPrompts: boolean;
    downloadFormat: string[];
  };
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface PackageStats {
  totalSold: number;
  activeSubscriptions: number;
  revenue: number;
  avgClientLifetime: number;
}