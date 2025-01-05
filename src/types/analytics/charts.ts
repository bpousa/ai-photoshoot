export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface UsageChartData {
  photos: ChartDataPoint[];
  videos: ChartDataPoint[];
  totalCredits: ChartDataPoint[];
}

export type ChartPeriod = 'daily' | 'weekly' | 'monthly';

export interface ChartOptions {
  period: ChartPeriod;
  showTotal: boolean;
  includePending: boolean;
}