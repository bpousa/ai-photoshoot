import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-6">
            Transform Your Photos with AI
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Upload your photos and let AI create professional shots in any setting.
            Perfect for LinkedIn, social media, or business profiles.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/dashboard"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
              Get Started
            </Link>
            <Link 
              href="/pricing"
              className="border border-gray-300 hover:bg-gray-50 px-6 py-3 rounded-lg"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}