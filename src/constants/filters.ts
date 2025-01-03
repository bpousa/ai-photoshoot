import { HistoryFilters } from '@/types/filters/base';

export const DEFAULT_FILTERS: HistoryFilters = {
  dateRange: {
    start: null,
    end: null
  },
  styles: [],
  status: 'all',
  aiAssisted: null,
  search: ''
};

export const QUICK_DATE_RANGES = [
  {
    value: 'today',
    label: 'Today',
    range: {
      start: new Date(),
      end: new Date()
    }
  },
  {
    value: 'week',
    label: 'Last 7 days',
    range: {
      start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      end: new Date()
    }
  }
];