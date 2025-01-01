import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Welcome to AI PhotoShoot</h1>
      
      <div className="max-w-2xl text-center mb-8">
        <p className="text-xl mb-4">
          Transform your photos into professional shots in any setting.
        </p>
        <p className="text-gray-600">
          Upload your photos, choose from our collection of professional poses,
          and let AI create stunning new photos featuring you.
        </p>
      </div>

      <div className="space-x-4">
        <Link
          href="/dashboard"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Get Started
        </Link>
        <Link
          href="/pricing"
          className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors"
        >
          View Pricing
        </Link>
      </div>
    </main>
  );
}