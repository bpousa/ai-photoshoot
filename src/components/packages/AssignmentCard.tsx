import React from 'react';
import { PackageAssignment } from '@/types/packages/assignment';

interface AssignmentCardProps {
  assignment: PackageAssignment;
  onRenew?: () => void;
  onCancel?: () => void;
}

export function AssignmentCard({
  assignment,
  onRenew,
  onCancel
}: AssignmentCardProps) {
  const isExpiring = assignment.endDate && 
    new Date(assignment.endDate).getTime() - Date.now() < 7 * 24 * 60 * 60 * 1000; // 7 days

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      {/* Status Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${assignment.status === 'active' ? 'bg-green-100 text-green-800' :
            assignment.status === 'expired' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'}
        `}>
          {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
        </span>

        {isExpiring && assignment.status === 'active' && (
          <span className="text-xs text-orange-600">
            Expiring soon
          </span>
        )}
      </div>

      {/* Credits */}
      <div className="space-y-2 mb-4">
        <div>
          <div className="flex justify-between text-sm">
            <span>Photos</span>
            <span>{assignment.creditsRemaining.photos} remaining</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full mt-1">
            <div
              className="h-1.5 bg-blue-500 rounded-full"
              style={{
                width: `${(
                  assignment.creditsRemaining.photos /
                  (assignment.creditsUsed.photos + assignment.creditsRemaining.photos)
                ) * 100}%`
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm">
            <span>Videos</span>
            <span>{assignment.creditsRemaining.videos} remaining</span>
          </div>
          <div className="h-1.5 bg-gray-200 rounded-full mt-1">
            <div
              className="h-1.5 bg-green-500 rounded-full"
              style={{
                width: `${(
                  assignment.creditsRemaining.videos /
                  (assignment.creditsUsed.videos + assignment.creditsRemaining.videos)
                ) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      {assignment.status === 'active' && (
        <div className="flex space-x-2">
          {onRenew && (
            <button
              onClick={onRenew}
              className="text-sm text-blue-600 hover:text-blue-700"
            >
              Renew
            </button>
          )}
          {onCancel && (
            <button
              onClick={onCancel}
              className="text-sm text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
          )}
        </div>
      )}
    </div>
  );
}