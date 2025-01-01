export async function checkVideoStatus(videoId: string): Promise<{
  status: 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  error?: string;
}> {
  try {
    const response = await fetch(
      `https://api.fal.ai/video/status/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FAL_AI_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Status check failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Video status check error:', error);
    throw error;
  }
}

export async function waitForVideoCompletion(
  videoId: string,
  maxAttempts = 30, // 5 minutes max with 10s intervals
  interval = 10000 // 10 seconds
) {
  let attempts = 0;

  while (attempts < maxAttempts) {
    const status = await checkVideoStatus(videoId);

    if (status.status === 'completed') {
      return status;
    }

    if (status.status === 'failed') {
      throw new Error(status.error || 'Video generation failed');
    }

    await new Promise(resolve => setTimeout(resolve, interval));
    attempts++;
  }

  throw new Error('Video generation timed out');
}