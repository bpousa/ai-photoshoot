import React from 'react';

interface VideoSettingsProps {
  onGenerateVideo: (settings: {
    motionType: 'zoom' | 'pan' | 'dolly';
  }) => void;
}

export function VideoSettings({ onGenerateVideo }: VideoSettingsProps) {
  const [motionType, setMotionType] = React.useState<'zoom' | 'pan' | 'dolly'>('zoom');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">
          Motion Type
        </label>
        <select
          value={motionType}
          onChange={(e) => setMotionType(e.target.value as any)}
          className="w-full p-2 border rounded-lg"
        >
          <option value="zoom">Cinematic Zoom</option>
          <option value="pan">Smooth Pan</option>
          <option value="dolly">Dolly Effect</option>
        </select>
      </div>

      <button
        onClick={() => onGenerateVideo({ motionType })}
        className="w-full py-2 bg-blue-500 text-white rounded-lg"
      >
        Generate Video
      </button>
    </div>
  );
}