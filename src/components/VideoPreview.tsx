import React from 'react';

interface VideoPreviewProps {
  videoUrl?: string;
  photoUrl: string; // Fallback while video generates
}

export function VideoPreview({ videoUrl, photoUrl }: VideoPreviewProps) {
  return (
    <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
      {videoUrl ? (
        <video
          src={videoUrl}
          className="w-full h-full object-cover"
          controls
          autoPlay
          loop
          muted
        />
      ) : (
        <img
          src={photoUrl}
          alt="Original photo"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}