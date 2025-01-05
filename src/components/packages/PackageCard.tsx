import React from 'react';
import { Package } from '@/types/packages';

interface PackageCardProps {
  package: Package;
  onEdit?: () => void;
}

export function PackageCard({ package: pkg, onEdit }: PackageCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-medium">{pkg.name}</h3>
            <p className="text-sm text-gray-500">{pkg.description}</p>
          </div>
          <div>
            <span className={`
              px-2 py-1 rounded-full text-xs font-medium
              ${pkg.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
            `}>
              {pkg.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>

        {/* Price */}
        <div className="mt-2">
          <span className="text-2xl font-bold">${pkg.price}</span>
        </div>

        {/* Credits */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-sm">Photos:</span>
            <span className="text-sm font-medium">{pkg.credits.photos}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm">Videos:</span>
            <span className="text-sm font-medium">{pkg.credits.videos}</span>
          </div>
        </div>
      </div>
    </div>
  );
}