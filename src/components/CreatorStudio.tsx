import React from 'react';
import { UserTier, GenerationSettings } from '@/types/creator';
import { getFeatures } from '@/config/tiers';

interface CreatorStudioProps {
  userTier: UserTier;
  onGenerate: (settings: GenerationSettings) => Promise<void>;
}

export function CreatorStudio({ userTier, onGenerate }: CreatorStudioProps) {
  const features = getFeatures(userTier);
  const [activeTab, setActiveTab] = React.useState<'prompt' | 'settings'>('prompt');

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('prompt')}
            className={`
              py-4 px-6 text-sm font-medium
              ${activeTab === 'prompt'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'}
            `}
          >
            Create Prompt
          </button>
          {features.hasAdvancedSettings && (
            <button
              onClick={() => setActiveTab('settings')}
              className={`
                py-4 px-6 text-sm font-medium
                ${activeTab === 'settings'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'}
              `}
            >
              Advanced Settings
            </button>
          )}
        </nav>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'prompt' ? (
          <div>
            <h2 className="text-lg font-medium mb-4">Create Your Photo</h2>
            {/* Prompt content will go here */}
          </div>
        ) : (
          <div>
            <h2 className="text-lg font-medium mb-4">Advanced Settings</h2>
            {/* Settings content will go here */}
          </div>
        )}
      </div>
    </div>
  );
}