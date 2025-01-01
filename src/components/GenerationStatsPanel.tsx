import React from 'react';
import { GenerationStats } from '@/types/stats';
import { StatsCard } from './StatsCard';

interface GenerationStatsPanelProps {
  stats: GenerationStats;
}

export function GenerationStatsPanel({ stats }: GenerationStatsPanelProps) {
  return (
    <div className="space-y-6">
      {/* Daily Usage */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Today's Generations"
          value={`${stats.user.dailyGenerated}/${stats.user.dailyLimit}`}
          description="Daily limit resets at midnight UTC"
        />
        
        <StatsCard
          title="Success Rate"
          value={`${(stats.user.successRate * 100).toFixed(1)}%`}
          trend={{
            value: 5.2, // Would calculate this from historical data
            label: 'vs last week'
          }}
        />

        <StatsCard
          title="Credits Remaining"
          value={stats.user.creditsRemaining}
          description="Purchase more in settings"
        />
        
        <StatsCard
          title="Most Used Style"
          value={stats.styles[0]?.name || 'N/A'}
          description={`${stats.styles[0]?.count || 0} generations`}
        />
      </div>

      <p className="text-sm text-gray-500 text-right">
        Last updated: {new Date(stats.lastUpdated).toLocaleTimeString()}
      </p>
    </div>
  );
}