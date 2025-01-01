interface VideoGenerationParams {
  photoUrl: string;
  motionType: 'zoom' | 'pan' | 'dolly';
  duration: number;
  fps?: number;
}

interface VideoResponse {
  id: string;
  status: 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  error?: string;
}

export async function generateVideo({
  photoUrl,
  motionType,
  duration = 3,
  fps = 24
}: VideoGenerationParams): Promise<VideoResponse> {
  try {
    const response = await fetch('https://api.fal.ai/video/generate', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.FAL_AI_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'kling-1.5',
        input_image: photoUrl,
        motion_type: motionType,
        duration_seconds: duration,
        fps,
      }),
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
}