export type BusinessTier = 'starter' | 'professional' | 'agency';

export interface BusinessProfile {
  id: string;
  userId: string;
  businessName: string;
  slug: string; // for default subdomain
  customDomain?: string;
  customSubdomain?: string;
  domainVerified: boolean;
  branding: {
    logo?: string;
    favicon?: string;
    colors: {
      primary: string;
      secondary: string;
      accent: string;
    };
    fonts: {
      heading: string;
      body: string;
    };
  };
  subscription: {
    tier: BusinessTier;
    clientLimit: number;
    monthlyPhotoCredits: number;
    monthlyVideoCredits: number;
    features: string[];
  };
  settings: {
    allowClientUploads: boolean;
    requireApproval: boolean;
    watermark?: string;
    defaultPackages: BusinessPackage[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface BusinessPackage {
  id: string;
  name: string;
  description: string;
  photoCredits: number;
  videoCredits: number;
  validityDays: number;
  price: number;
  features: string[];
  active: boolean;
}