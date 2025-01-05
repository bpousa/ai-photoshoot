export interface Package {
  id: string;
  businessId: string;
  name: string;
  description: string;
  price: number;
  type: 'one_time' | 'subscription';
  credits: {
    photos: number;
    videos: number;
  };
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}