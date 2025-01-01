import { useState, useEffect } from 'react';
import { checkVideoStatus } from '@/services/video-status';

export function useVideoProgress(videoId: string | null) {
  const [status, setStatus] = useState<'processing' | 'completed' | 'failed'>('processing');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!videoId) return;

    const checkProgress = async () => {
      try {
        const result = await checkVideoStatus(videoId);
        setStatus(result.status);
        
        // Simulate progress while processing
        if (result.status === 'processing') {
          setProgress(prev => Math.min(prev + 5, 90));
        } else if (result.status === 'completed') {
          setProgress(100);
        }
      } catch (error) {
        setStatus('failed');
      }
    };

    const interval = setInterval(checkProgress, 2000);
    return () => clearInterval(interval);
  }, [videoId]);

  return { status, progress };
}