import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartDataPoint } from '@/types/analytics/charts';

interface UsageLineChartProps {
  data: {
    photos: ChartDataPoint[];
    videos: ChartDataPoint[];
  };
  height?: number;
}

export function UsageLineChart({ 
  data,
  height = 300 
}: UsageLineChartProps) {
  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-sm">
      <LineChart
        width={800}
        height={height}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="date" 
          tickFormatter={(date) => new Date(date).toLocaleDateString()}
        />
        <YAxis />
        <Tooltip 
          labelFormatter={(date) => new Date(date).toLocaleDateString()}
        />
        <Legend />
        
        <Line
          type="monotone"
          dataKey="value"
          data={data.photos}
          name="Photos"
          stroke="#3B82F6"
          strokeWidth={2}
          dot={false}
        />
        
        <Line
          type="monotone"
          dataKey="value"
          data={data.videos}
          name="Videos"
          stroke="#10B981"
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </div>
  );
}