import React from 'react';

interface OverviewCardProps {
  title: string;
  value: string | number;
  change?: number; // percentage change
  icon?: React.ReactNode;
}

export function OverviewCard({ 
  title, 
  value, 
  change, 
  icon 
}: OverviewCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 mb-1">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
        {icon && (
          <div className="text-gray-400">
            {icon}
          </div>
        )}
      </div>

      {typeof change !== 'undefined' && (
        <div className="mt-2">
          <span className={`
            text-sm font-medium
            ${change >= 0 ? 'text-green-600' : 'text-red-600'}
          `}>
            {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
          </span>
          <span className="text-sm text-gray-500 ml-1">
            vs last period
          </span>
        </div>
      )}
    </div>
  );
}