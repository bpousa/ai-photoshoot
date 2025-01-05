import { Package } from '../packages';

export interface PackageFormData {
  name: string;
  description: string;
  price: number;
  type: 'one_time' | 'subscription';
  credits: {
    photos: number;
    videos: number;
  };
  active: boolean;
}

export type PackageFormErrors = {
  [K in keyof PackageFormData]?: string;
} & {
  credits?: {
    photos?: string;
    videos?: string;
  };
};