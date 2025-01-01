import React from 'react';
import { GenerationDetails } from '@/types/promptDetails';

interface PromptDetailsProps {
  details: GenerationDetails;
  onClose: () => void;
  onRegen?: () => void;
}

export function PromptDetails({ 
  details,
  onClose,
  onRegen 
}: PromptDetailsProps) {
  return (
    <div className="space-y-6">
      {/* Image Preview */}
      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
        <img
          src={details.imageUrl}
          alt={details.prompt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Prompt Info */}
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-1">Prompt</h4>
          <p className="text-gray-900">{details.prompt}</p>
        </div>

        {details.metadata.basePrompt && (
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-1">Original Prompt</h4>
            <p className="text-gray-500">{details.metadata.basePrompt}</p>
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Style:</span>{' '}
            <span className="font-medium">{details.metadata.style}</span>
          </div>
          <div>
            <span className="text-gray-500">Created:</span>{' '}
            <span className="font-medium">
              {new Date(details.createdAt).toLocaleString()}
            </span>
          </div>
          {details.metadata.processingTime && (
            <div>
              <span className="text-gray-500">Processing Time:</span>{' '}
              <span className="font-medium">
                {details.metadata.processingTime.toFixed(1)}s
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3 pt-4 border-t">
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-700 hover:text-gray-900"
        >
          Close
        </button>
        {onRegen && (
          <button
            onClick={onRegen}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Regenerate
          </button>
        )}
      </div>
    </div>
  );
}