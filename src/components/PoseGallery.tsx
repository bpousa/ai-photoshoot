import React, { useState } from 'react';
import { POSE_PROMPTS } from '@/services/fal';

interface Pose {
  id: string;
  name: string;
  prompt: string;
  previewUrl: string;
  category: 'professional' | 'casual' | 'travel' | 'lifestyle';
}

const POSES: Pose[] = [
  {
    id: 'cafe-paris',
    name: 'Paris Cafe',
    prompt: POSE_PROMPTS.CAFE_PARIS,
    previewUrl: '/placeholders/cafe-paris.jpg',
    category: 'travel'
  },
  {
    id: 'texas-bbq',
    name: 'Texas BBQ',
    prompt: POSE_PROMPTS.TEXAS_BBQ,
    previewUrl: '/placeholders/bbq.jpg',
    category: 'lifestyle'
  },
  {
    id: 'office',
    name: 'Professional Headshot',
    prompt: POSE_PROMPTS.OFFICE_PROFESSIONAL,
    previewUrl: '/placeholders/office.jpg',
    category: 'professional'
  },
  {
    id: 'beach',
    name: 'Beach Sunset',
    prompt: POSE_PROMPTS.BEACH_VACATION,
    previewUrl: '/placeholders/beach.jpg',
    category: 'travel'
  }
];

export function PoseGallery() {
  const [selectedPoses, setSelectedPoses] = useState<Set<string>>(new Set());
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'professional', 'casual', 'travel', 'lifestyle'];

  const filteredPoses = POSES.filter(pose => {
    const matchesCategory = activeCategory === 'all' || pose.category === activeCategory;
    const matchesSearch = pose.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const togglePose = (poseId: string) => {
    setSelectedPoses(prev => {
      const newSet = new Set(prev);
      if (newSet.has(poseId)) {
        newSet.delete(poseId);
      } else if (newSet.size < 20) {
        newSet.add(poseId);
      } else {
        alert('Maximum 20 poses can be selected');
      }
      return newSet;
    });
  };

  const handleGenerate = async () => {
    const selectedPoseData = Array.from(selectedPoses).map(id => 
      POSES.find(pose => pose.id === id)
    ).filter(Boolean);

    // TODO: Implement generation logic
    console.log('Generating images for poses:', selectedPoseData);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <input
          type="text"
          placeholder="Search poses..."
          className="px-4 py-2 border rounded-lg flex-grow"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap
                ${activeCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'}`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredPoses.map(pose => (
          <div
            key={pose.id}
            className={`relative cursor-pointer group rounded-lg overflow-hidden
              ${selectedPoses.has(pose.id) ? 'ring-2 ring-blue-500' : ''}`}
            onClick={() => togglePose(pose.id)}
          >
            <img
              src={pose.previewUrl}
              alt={pose.name}
              className="w-full aspect-square object-cover group-hover:opacity-90 transition-opacity"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-white font-medium">{pose.name}</p>
              <p className="text-white/80 text-sm">{pose.category}</p>
            </div>
            {selectedPoses.has(pose.id) && (
              <div className="absolute top-2 right-2 bg-blue-500 text-white rounded-full p-1">
                ✓
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="sticky bottom-4 bg-white p-4 border rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <p className="text-gray-600">
            {selectedPoses.size} of 20 poses selected
          </p>
          <button
            onClick={handleGenerate}
            disabled={selectedPoses.size === 0}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Generate Selected Poses
          </button>
        </div>
      </div>
    </div>
  );
}