import React from 'react';

interface VideoErrorProps {
  error: string;
  onRetry: () => void;
}

export function VideoError({ error, onRetry }: VideoErrorProps) {
  return (
    <div className="rounded-lg border border-red-100 bg-red-50 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
      <button
        onClick={onRetry}
        className="mt-3 w-full py-2 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
      >
        Try Again
      </button>
    </div>
  );
}