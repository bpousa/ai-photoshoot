interface PhotoTip {
  title: string;
  description: string;
  do: string[];
  dont: string[];
}

const PHOTO_TIPS: PhotoTip[] = [
  {
    title: 'Lighting',
    description: 'Good lighting is crucial for high-quality results',
    do: [
      'Use natural daylight when possible',
      'Face towards light source',
      'Ensure even lighting on face'
    ],
    dont: [
      'Avoid harsh shadows',
      'Skip photos in dim lighting',
      'Avoid direct sunlight'
    ]
  },
  {
    title: 'Angles',
    description: 'Variety in angles helps create better results',
    do: [
      'Include front-facing shots',
      'Add 3/4 view angles',
      'Include some profile shots'
    ],
    dont: [
      'Skip extreme angles',
      'Avoid tilted head poses',
      'Skip looking down shots'
    ]
  },
  {
    title: 'Backgrounds',
    description: 'Clean backgrounds help focus on you',
    do: [
      'Use simple, solid backgrounds',
      'Include both indoor/outdoor',
      'Keep background uncluttered'
    ],
    dont: [
      'Avoid busy patterns',
      'Skip crowded backgrounds',
      'Avoid dark shadows'
    ]
  }
];

export function PhotoTips() {
  return (
    <div className="space-y-6">
      {PHOTO_TIPS.map((tip, index) => (
        <div key={index} className="bg-white rounded-lg p-4 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{tip.title}</h3>
          <p className="text-gray-600 mb-4">{tip.description}</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-green-600 mb-2">Do:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {tip.do.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-red-600 mb-2">Don't:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {tip.dont.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}