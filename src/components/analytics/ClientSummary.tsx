import React from 'react';
import { ClientMetrics } from '@/types/analytics/clients';

interface ClientSummaryProps {
  client: ClientMetrics;
  onClick?: () => void;
}

export function ClientSummary({ client, onClick }: ClientSummaryProps) {
  return (
    <div 
      className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-medium text-lg">{client.name}</h3>
          <p className="text-sm text-gray-500">
            Last active: {new Date(client.stats.lastLogin).toLocaleDateString()}
          </p>
        </div>
        <span className={`
          px-2 py-1 rounded-full text-xs font-medium
          ${client.stats.subscriptionStatus === 'active' 
            ? 'bg-green-100 text-green-800'
            : client.stats.subscriptionStatus === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'}
        `}>
          {client.stats.subscriptionStatus}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500 mb-1">Photos</p>
          <div className="flex justify-between">
            <span className="font-medium">
              {client.usage.currentPeriod.photos}
            </span>
            <span className="text-sm text-gray-500">
              / {client.usage.currentPeriod.photos + client.usage.remaining.photos}
            </span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full mt-1">
            <div 
              className="h-1 bg-blue-500 rounded-full"
              style={{
                width: `${(client.usage.currentPeriod.photos / 
                  (client.usage.currentPeriod.photos + client.usage.remaining.photos)) * 100}%`
              }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-1">Videos</p>
          <div className="flex justify-between">
            <span className="font-medium">
              {client.usage.currentPeriod.videos}
            </span>
            <span className="text-sm text-gray-500">
              / {client.usage.currentPeriod.videos + client.usage.remaining.videos}
            </span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full mt-1">
            <div 
              className="h-1 bg-green-500 rounded-full"
              style={{
                width: `${(client.usage.currentPeriod.videos / 
                  (client.usage.currentPeriod.videos + client.usage.remaining.videos)) * 100}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}