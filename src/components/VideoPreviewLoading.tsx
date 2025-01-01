import React from 'react';

export function VideoPreviewLoading() {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent" />
      </div>
      <div className="absolute bottom-4 left-0 right-0 text-center text-gray-500">
        Generating video preview...
      </div>
    </div>
  );
}