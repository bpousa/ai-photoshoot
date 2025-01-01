import React, { useState } from 'react';
import { POSE_PROMPTS } from '@/services/fal';

interface Pose {
  id: string;
  name: string;
  prompt: string;
  previewUrl: string;
}

const POSES: Pose[] = [
  {
    id: 'cafe-paris',
    name: 'Paris Cafe',
    prompt: POSE_PROMPTS.CAFE_PARIS,
    previewUrl: '/poses/cafe-paris.jpg'
  },
  {
    id: 'texas-bbq',
    name: 'Texas BBQ',
    prompt: POSE_PROMPTS.TEXAS_BBQ,
    previewUrl: '/poses/texas-bbq.jpg'
  },
  // Add more poses here
];

export function PoseGallery() {
  const [selectedPoses, setSelectedPoses] = useState<Set<string>>(new Set());

  const togglePose = (poseId: string) => {
    setSelectedPoses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(poseId)) {
        newSet.delete(poseId);
      } else if (newSet.size < 20) {
        newSet.add(poseId);
      }
      return newSet;
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {POSES.map(pose => (
          <div
            key={pose.id}
            className={`relative cursor-pointer border-2 rounded-lg overflow-hidden
              ${selectedPoses.has(pose.id) ? 'border-blue-500' : 'border-transparent'}`}
            onClick={() => togglePose(pose.id)}
          >
            <img
              src={pose.previewUrl}
              alt={pose.name}
              className="w-full aspect-square object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2">
              <p className="text-sm font-medium">{pose.name}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p>{selectedPoses.size} poses selected (max 20)</p>
        <button
          disabled={selectedPoses.size === 0}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Generate Selected Poses
        </button>
      </div>
    </div>
  );
}