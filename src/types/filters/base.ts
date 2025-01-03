export interface DateRange {
  start: Date | null;
  end: Date | null;
}

export interface HistoryFilters {
  dateRange: DateRange;
  styles: string[];
  status: 'all' | 'success' | 'failed';
  aiAssisted: boolean | null;
  search: string;
}