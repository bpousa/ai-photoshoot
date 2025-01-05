export interface AnalyticsOverview {
  totalClients: number;
  activeClients: number;
  totalRevenue: number;
  monthlyRevenue: number;
}

export interface TimeRange {
  start: Date;
  end: Date;
}

export interface AnalyticsFilter {
  timeRange: TimeRange;
  clients?: string[];
  packages?: string[];
}