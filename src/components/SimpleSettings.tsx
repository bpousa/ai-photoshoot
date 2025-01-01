import React from 'react';
import { PresetSettings, QUALITY_PRESETS } from '@/types/settings';

interface SimpleSettingsProps {
  onChange: (settings: PresetSettings) => void;
}

export function SimpleSettings({ onChange }: SimpleSettingsProps) {
  const [selectedPreset, setSelectedPreset] = React.useState('balanced');

  const handlePresetChange = (presetKey: string) => {
    setSelectedPreset(presetKey);
    onChange(QUALITY_PRESETS[presetKey]);
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quality Preset
        </label>
        <div className="grid gap-3">
          {Object.entries(QUALITY_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => handlePresetChange(key)}
              className={`
                p-4 rounded-lg text-left transition-colors
                ${selectedPreset === key
                  ? 'bg-blue-50 border-blue-200'
                  : 'bg-gray-50 border-gray-200'}
                border
              `}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-medium">{preset.name}</span>
                {selectedPreset === key && (
                  <span className="text-blue-600">
                    ✓
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600">
                {preset.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}