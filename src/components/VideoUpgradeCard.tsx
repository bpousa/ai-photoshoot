import React from 'react';
import { motion } from 'framer-motion';

interface VideoUpgradeCardProps {
  onUpgrade: () => void;
  price: number;
  videoCount: number;
}

export function VideoUpgradeCard({ onUpgrade, price, videoCount }: VideoUpgradeCardProps) {
  return (
    <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="space-y-4">
        <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto">
          <svg
            className="w-6 h-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-center text-gray-900">
          Transform Photos into Videos
        </h3>

        <p className="text-gray-600 text-center">
          Add cinematic motion to {videoCount} of your photos with professional effects.
        </p>

        <div className="text-center">
          <span className="text-3xl font-bold text-gray-900">${price}</span>
        </div>

        <ul className="space-y-2">
          <li className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Cinematic zoom effects
          </li>
          <li className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Professional motion
          </li>
          <li className="flex items-center">
            <svg
              className="w-5 h-5 text-blue-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            HD 1080p quality
          </li>
        </ul>

        <button
          onClick={onUpgrade}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Upgrade Now
        </button>
      </div>
    </div>
  );
}