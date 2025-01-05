import React from 'react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
    label: string;
  };
  description?: string;
}

export function MetricsCard({
  title,
  value,
  trend,
  description
}: MetricsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <h3 className="text-sm font-medium text-gray-500 mb-1">
        {title}
      </h3>

      <div className="flex items-baseline">
        <p className="text-2xl font-semibold text-gray-900">
          {value}
        </p>
        {trend && (
          <span className={`
            ml-2 text-sm font-medium
            ${trend.isPositive ? 'text-green-600' : 'text-red-600'}
          `}>
            {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
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