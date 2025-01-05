import React from 'react';
import { ChartOptions, ChartPeriod } from '@/types/analytics/charts';

interface ChartControlsProps {
  options: ChartOptions;
  onOptionsChange: (options: ChartOptions) => void;
}

export function ChartControls({ 
  options, 
  onOptionsChange 
}: ChartControlsProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Period Selection */}
      <div className="space-x-2">
        {(['daily', 'weekly', 'monthly'] as ChartPeriod[]).map((period) => (
          <button
            key={period}
            onClick={() => onOptionsChange({ ...options, period })}
            className={`
              px-3 py-1 text-sm rounded-md
              ${options.period === period 
                ? 'bg-blue-50 text-blue-600' 
                : 'text-gray-600 hover:bg-gray-100'}
            `}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Display Options */}
      <div className="flex items-center space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.showTotal}
            onChange={(e) => onOptionsChange({
              ...options,
              showTotal: e.target.checked
            })}
            className="rounded text-blue-500"
          />
          <span className="text-sm text-gray-600">
            Show Total
          </span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={options.includePending}
            onChange={(e) => onOptionsChange({
              ...options,
              includePending: e.target.checked
            })}
            className="rounded text-blue-500"
          />
          <span className="text-sm text-gray-600">
            Include Pending
          </span>
        </label>
      </div>
    </div>
  );
}