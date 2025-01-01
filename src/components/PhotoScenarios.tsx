interface Scenario {
  title: string;
  description: string;
  examples: {
    good: { image: string; caption: string }[];
    bad: { image: string; caption: string }[];
  };
}

const PHOTO_SCENARIOS: Scenario[] = [
  {
    title: 'Professional Headshot',
    description: 'Perfect for LinkedIn and business profiles',
    examples: {
      good: [
        {
          image: '/api/placeholder/400/400',
          caption: 'Natural lighting, neutral background, professional attire'
        },
        {
          image: '/api/placeholder/400/400',
          caption: 'Slight angle, confident smile, clean background'
        }
      ],
      bad: [
        {
          image: '/api/placeholder/400/400',
          caption: 'Busy background, harsh shadows'
        },
        {
          image: '/api/placeholder/400/400',
          caption: 'Too casual, distracting elements'
        }
      ]
    }
  },
  {
    title: 'Casual Portrait',
    description: 'Great for social media and personal branding',
    examples: {
      good: [
        {
          image: '/api/placeholder/400/400',
          caption: 'Natural pose, outdoor setting, soft lighting'
        },
        {
          image: '/api/placeholder/400/400',
          caption: 'Candid style, good composition'
        }
      ],
      bad: [
        {
          image: '/api/placeholder/400/400',
          caption: 'Unflattering angle, poor lighting'
        },
        {
          image: '/api/placeholder/400/400',
          caption: 'Too posed, unnatural expression'
        }
      ]
    }
  }
];

export function PhotoScenarios() {
  return (
    <div className="space-y-8">
      {PHOTO_SCENARIOS.map((scenario, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-2">{scenario.title}</h3>
            <p className="text-gray-600 mb-6">{scenario.description}</p>
            
            <div className="space-y-6">
              <div>
                <h4 className="text-green-600 font-medium mb-4">Good Examples:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {scenario.examples.good.map((example, i) => (
                    <div key={i}>
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
                        <img
                          src={example.image}
                          alt={`Good example ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{example.caption}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-red-600 font-medium mb-4">What to Avoid:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {scenario.examples.bad.map((example, i) => (
                    <div key={i}>
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
                        <img
                          src={example.image}
                          alt={`Bad example ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <p className="mt-2 text-sm text-gray-600">{example.caption}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}