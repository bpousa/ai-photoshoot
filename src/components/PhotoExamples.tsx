interface PhotoExample {
  title: string;
  goodExample: string;
  badExample: string;
  description: string;
}

const PHOTO_EXAMPLES: PhotoExample[] = [
  {
    title: 'Lighting Example',
    goodExample: '/api/placeholder/400/300',  // In production, use real example images
    badExample: '/api/placeholder/400/300',
    description: 'Good lighting (left) shows clear features. Poor lighting (right) creates harsh shadows.'
  },
  {
    title: 'Angle Example',
    goodExample: '/api/placeholder/400/300',
    badExample: '/api/placeholder/400/300',
    description: '3/4 view angle (left) is ideal. Extreme angles (right) can distort features.'
  },
  {
    title: 'Background Example',
    goodExample: '/api/placeholder/400/300',
    badExample: '/api/placeholder/400/300',
    description: 'Clean background (left) keeps focus on you. Busy background (right) distracts.'
  }
];

export function PhotoExamples() {
  return (
    <div className="space-y-8">
      {PHOTO_EXAMPLES.map((example, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold mb-4">{example.title}</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={example.goodExample}
                  alt={`Good ${example.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm text-green-600 font-medium">Good Example</p>
            </div>

            <div>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={example.badExample}
                  alt={`Bad ${example.title}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm text-red-600 font-medium">Bad Example</p>
            </div>
          </div>

          <p className="mt-4 text-gray-600 text-sm">
            {example.description}
          </p>
        </div>
      ))}
    </div>
  );
}