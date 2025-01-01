import React from 'react';
import { TierFeatures } from '@/types/creator';

interface PromptCreatorProps {
  features: TierFeatures;
  onPromptChange: (prompt: string) => void;
  onStyleChange: (style: string) => void;
}

export function PromptCreator({
  features,
  onPromptChange,
  onStyleChange
}: PromptCreatorProps) {
  const [selectedStyle, setSelectedStyle] = React.useState('professional');
  const [customPrompt, setCustomPrompt] = React.useState('');

  const handleStyleChange = (style: string) => {
    setSelectedStyle(style);
    onStyleChange(style);
  };

  const handlePromptChange = (prompt: string) => {
    setCustomPrompt(prompt);
    onPromptChange(prompt);
  };

  return (
    <div className="space-y-6">
      {/* Style Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Photo Style
        </label>
        <div className="grid grid-cols-3 gap-3">
          {['professional', 'casual', 'creative'].map((style) => (
            <button
              key={style}
              onClick={() => handleStyleChange(style)}
              className={`
                py-2 px-4 rounded-lg text-sm font-medium
                ${selectedStyle === style
                  ? 'bg-blue-50 text-blue-700 border-blue-200'
                  : 'bg-gray-50 text-gray-700 border-gray-200'}
                border hover:bg-opacity-75 transition-colors
              `}
            >
              {style.charAt(0).toUpperCase() + style.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Prompt */}
      {features.canCustomizePrompts ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Customize Prompt
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            className="w-full h-32 px-3 py-2 border rounded-lg"
            placeholder="Describe your ideal photo..."
          />
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
          Upgrade to Pro to customize prompts and get better results!
        </div>
      )}
    </div>
  );
}