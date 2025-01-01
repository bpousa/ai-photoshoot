export default function Features() {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          <FeatureCard 
            title="Upload Your Photos"
            description="Simply upload 10 photos of yourself and let our AI learn your features."
            icon="upload"
          />
          <FeatureCard 
            title="Choose Your Poses"
            description="Select from our collection of professional poses and settings."
            icon="gallery"
          />
          <FeatureCard 
            title="Get Your Photos"
            description="Receive professionally generated photos featuring you in minutes."
            icon="download"
          />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ title, description, icon }: { 
  title: string; 
  description: string; 
  icon: 'upload' | 'gallery' | 'download';
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
        {icon === 'upload' && (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        )}
        {icon === 'gallery' && (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        )}
        {icon === 'download' && (
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}