interface VideoUpgradeCardProps {
  onUpgrade: () => void;
  price: number;
  videoCount: number;
}

export function VideoUpgradeCard({ onUpgrade, price, videoCount }: VideoUpgradeCardProps) {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 p-6">
      <h3 className="text-xl font-semibold text-center mb-4">
        Transform Photos into Videos
      </h3>
      
      <p className="text-gray-600 text-center mb-4">
        Add cinematic motion to {videoCount} of your photos
      </p>

      <div className="text-center mb-6">
        <span className="text-3xl font-bold">${price}</span>
      </div>

      <button
        onClick={onUpgrade}
        className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Upgrade Now
      </button>
    </div>
  );
}