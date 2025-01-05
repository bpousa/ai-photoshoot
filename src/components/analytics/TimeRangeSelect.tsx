import React from 'react';
import { TimeRange } from '@/types/analytics/base';

interface TimeRangeSelectProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

const PRESET_RANGES = [
  { label: 'Last 7 days', days: 7 },
  { label: 'Last 30 days', days: 30 },
  { label: 'Last 90 days', days: 90 }
];

export function TimeRangeSelect({ value, onChange }: TimeRangeSelectProps) {
  const handlePresetClick = (days: number) => {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    onChange({ start, end });
  };

  return (
    <div className="flex items-center space-x-4">
      {/* Preset buttons */}
      <div className="space-x-2">
        {PRESET_RANGES.map(({ label, days }) => (
          <button
            key={days}
            onClick={() => handlePresetClick(days)}
            className="px-3 py-1 text-sm rounded-md
              hover:bg-gray-100 focus:outline-none focus:ring-2"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Custom date inputs */}
      <div className="flex items-center space-x-2">
        <input
          type="date"
          value={value.start.toISOString().split('T')[0]}
          onChange={(e) => onChange({
            ...value,
            start: new Date(e.target.value)
          })}
          className="px-2 py-1 border rounded-md"
        />
        <span className="text-gray-500">to</span>
        <input
          type="date"
          value={value.end.toISOString().split('T')[0]}
          onChange={(e) => onChange({
            ...value,
            end: new Date(e.target.value)
          })}
          className="px-2 py-1 border rounded-md"
        />
      </div>
    </div>
  );
}