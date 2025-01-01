import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  trend?: {
    value: number;
    label: string;
  };
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  trend 
}: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="text-sm font-medium text-gray-500">
        {title}
      </h3>
      
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {value}
        </p>
        {trend && (
          <span className={`
            ml-2 text-sm font-medium
            ${trend.value >= 0 ? 'text-green-600' : 'text-red-600'}
          `}>
            {trend.value >= 0 ? '↑' : '↓'} {Math.abs(trend.value)}%
          </span>
        )}
      </div>

      {description && (
        <p className="mt-1 text-sm text-gray-500">
          {description}
        </p>
      )}
    </div>
  );
}