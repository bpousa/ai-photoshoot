export interface PackageAnalytics {
  packageId: string;
  metrics: {
    totalSales: number;
    activeSubscriptions: number;
    revenue: number;
    averageClientLifetime: number; // in days
  };
  usage: {
    totalPhotosGenerated: number;
    totalVideosGenerated: number;
    averagePhotoUsage: number; // per client
    averageVideoUsage: number; // per client
  };
  trends: {
    salesByMonth: Array<{
      month: string;
      sales: number;
      revenue: number;
    }>;
    churnRate: number;
    renewalRate: number;
  };
}