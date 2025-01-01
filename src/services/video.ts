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

const DEFAULT_FPS = 24;
const DEFAULT_DURATION = 3; // seconds

export async function generateVideo({
  photoUrl,
  motionType,
  duration = DEFAULT_DURATION,
  fps = DEFAULT_FPS
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

    if (!response.ok) {
      throw new Error(`Video generation failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Video generation error:', error);
    throw error;
  }
}