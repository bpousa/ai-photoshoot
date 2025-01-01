import React from 'react';
import { GenerationHistory as History } from '@/types/history';

interface GenerationHistoryProps {
  items: History[];
  onSelect?: (item: History) => void;
}

export function GenerationHistory({ items, onSelect }: GenerationHistoryProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Recent Generations</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelect?.(item)}
            className="cursor-pointer group"
          >
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 relative">
              <img
                src={item.imageUrl}
                alt={item.prompt}
                className="w-full h-full object-cover"
              />
              
              {/* Overlay with prompt */}
              <div className="
                absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100
                transition-opacity duration-200 p-3 flex flex-col justify-end
              ">
                <p className="text-sm text-white line-clamp-3">
                  {item.prompt}
                </p>
                <p className="text-xs text-gray-300 mt-1">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Status indicator */}
              {item.status === 'failed' && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  Failed
                </div>
              )}
              
              {item.metadata?.aiSuggested && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                  AI Enhanced
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No generations yet. Start creating!
        </div>
      )}
    </div>
  );
}