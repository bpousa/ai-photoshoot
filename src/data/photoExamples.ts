export interface PhotoScenario {
  id: string;
  title: string;
  description: string;
  goodExample: {
    imageUrl: string;
    caption: string;
    tips: string[];
  };
  badExample: {
    imageUrl: string;
    caption: string;
    mistakes: string[];
  };
}

export const PHOTO_EXAMPLES: PhotoScenario[] = [
  {
    id: 'headshot',
    title: 'Professional Headshot',
    description: 'Perfect for LinkedIn and business profiles',
    goodExample: {
      imageUrl: '/api/placeholder/400/400',
      caption: 'Clean, professional headshot with natural lighting',
      tips: [
        'Natural, diffused lighting from a window',
        'Simple, non-distracting background',
        'Professional attire',
        'Neutral expression with slight smile'
      ]
    },
    badExample: {
      imageUrl: '/api/placeholder/400/400',
      caption: 'Poor lighting and distracting background',
      mistakes: [
        'Harsh overhead lighting creates shadows',
        'Busy background with clutter',
        'Too casual attire',
        'Unflattering angle'
      ]
    }
  },
  {
    id: 'portrait',
    title: 'Casual Portrait',
    description: 'Great for social media and personal branding',
    goodExample: {
      imageUrl: '/api/placeholder/400/400',
      caption: 'Natural outdoor portrait with good composition',
      tips: [
        'Soft, natural outdoor lighting',
        'Relaxed but confident pose',
        'Engaging eye contact',
        'Clean background with depth'
      ]
    },
    badExample: {
      imageUrl: '/api/placeholder/400/400',
      caption: 'Poor composition and lighting',
      mistakes: [
        'Harsh midday sun creating squinting',
        'Awkward, forced pose',
        'Distracting elements in frame',
        'Poor image quality'
      ]
    }
  }
];