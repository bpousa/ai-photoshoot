import { DateRange } from './base';

export interface StyleOption {
  value: string;
  label: string;
  count: number;
}

export interface DateRangeOption {
  value: string;
  label: string;
  range: DateRange;
}

export interface FilterOptions {
  styles: StyleOption[];
  dateRanges: DateRangeOption[];
}