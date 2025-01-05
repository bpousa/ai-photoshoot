import React from 'react';
import { ClientUser } from '@/types/clientPortal';

interface MediaItem {
  id: string;
  type: 'photo' | 'video';
  url: string;
  thumbnail: string;
  createdAt: Date;
  status: 'processing' | 'completed' | 'failed';
}

interface ClientGalleryProps {
  user: ClientUser;
  items: MediaItem[];
  onDownload: (itemId: string) => void;
}

export function ClientGallery({ 
  user, 
  items,
  onDownload 
}: ClientGalleryProps) {
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(new Set());
  const [view, setView] = React.useState<'grid' | 'list'>('grid');

  const toggleItem = (id: string) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedItems(newSelected);
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="space-x-2">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded ${view === 'grid' ? 'bg-blue-50 text-blue-600' : ''}`}
          >
            Grid
          </button>
          <button
            onClick={() => setView('list')}
            className={`p-2 rounded ${view === 'list' ? 'bg-blue-50 text-blue-600' : ''}`}
          >
            List
          </button>
        </div>

        {selectedItems.size > 0 && (
          <button
            onClick={() => {
              selectedItems.forEach(id => onDownload(id));
              setSelectedItems(new Set());
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Download Selected ({selectedItems.size})
          </button>
        )}
      </div>

      {/* Gallery */}
      {view === 'grid' ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div 
              key={item.id}
              className="relative group cursor-pointer"
              onClick={() => toggleItem(item.id)}
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={item.thumbnail}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              {selectedItems.has(item.id) && (
                <div className="absolute top-2 right-2 bg-blue-500 rounded-full p-1">
                  ✓
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div 
              key={item.id}
              className="flex items-center p-2 hover:bg-gray-50 rounded"
            >
              <input
                type="checkbox"
                checked={selectedItems.has(item.id)}
                onChange={() => toggleItem(item.id)}
                className="mr-4"
              />
              <img
                src={item.thumbnail}
                alt=""
                className="w-16 h-16 object-cover rounded mr-4"
              />
              <div>
                <p className="font-medium">
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(item.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}