import React from 'react';

interface PhotoExampleProps {
  title: string;
  goodImageUrl: string;
  badImageUrl: string;
  goodCaption: string;
  badCaption: string;
}

export function PhotoExample({
  title,
  goodImageUrl,
  badImageUrl,
  goodCaption,
  badCaption
}: PhotoExampleProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4">
        <h3 className="font-medium text-lg mb-4">{title}</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          {/* Good Example */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img
                src={goodImageUrl}
                alt={`Good example - ${title}`}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-green-600">
              ✓ {goodCaption}
            </p>
          </div>

          {/* Bad Example */}
          <div>
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-50">
              <img
                src={badImageUrl}
                alt={`Bad example - ${title}`}
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-2 text-sm text-red-600">
              ✗ {badCaption}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}