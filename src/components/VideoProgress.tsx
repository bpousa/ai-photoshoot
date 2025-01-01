import React from 'react';

interface VideoProgressProps {
  status: 'processing' | 'completed' | 'failed';
  progress?: number;
}

export function VideoProgress({ status, progress = 0 }: VideoProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="capitalize">{status}</span>
        <span>{Math.round(progress)}%</span>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}