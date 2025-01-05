export interface ClientPortal {
  id: string;
  businessId: string;
  settings: {
    welcomeMessage: string;
    termsOfService: string;
    privacyPolicy: string;
    allowSelfRegistration: boolean;
  };
  theme: {
    layout: 'default' | 'minimal' | 'modern';
    showLogo: boolean;
    navStyle: 'top' | 'side';
    darkMode: boolean;
  };
  features: {
    gallery: boolean;
    chat: boolean;
    downloads: boolean;
    support: boolean;
  };
}

export interface ClientUser {
  id: string;
  businessId: string;
  name: string;
  email: string;
  packageId: string;
  credits: {
    photos: number;
    videos: number;
  };
  status: 'active' | 'pending' | 'suspended';
  lastLogin?: Date;
  createdAt: Date;
}