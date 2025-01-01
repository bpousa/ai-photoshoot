import { createClient } from '@fal-ai/serverless-client';

const falClient = createClient({
  credentials: process.env.FAL_AI_API_KEY!,
});

interface TrainModelResponse {
  id: string;
  status: 'running' | 'completed' | 'failed';
  lora_url?: string;
}

interface GenerateImageResponse {
  images: {
    url: string;
  }[];
}

export async function trainModel(images: string[]) {
  try {
    const response = await falClient.submit('fal-ai/flux-lora-fast-training', {
      input: {
        images,
        num_steps: 100,
        face_crop_augmentation: true,
        mask_target_prompts: true,
      },
    }) as TrainModelResponse;

    return response;
  } catch (error) {
    console.error('Error training model:', error);
    throw error;
  }
}

export async function generateImage(loraId: string, basePrompt: string) {
  try {
    const response = await falClient.submit('fal-ai/flux-lora', {
      input: {
        prompt: basePrompt,
        loras: [{
          model_name: loraId,
          weight: 0.75
        }],
        seed: Math.floor(Math.random() * 1000000),
        num_inference_steps: 30,
        guidance_scale: 7.5
      },
    }) as GenerateImageResponse;

    return response.images[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

export const POSE_PROMPTS = {
  CAFE_PARIS: "a person sitting at an outdoor Parisian cafe, Eiffel Tower in background, professional photography, natural lighting, 8k",
  TEXAS_BBQ: "a person at a backyard BBQ in Texas, rustic wooden fence, golden hour lighting, candid shot, professional photography",
  OFFICE_PROFESSIONAL: "a person in a modern office setting, wearing business attire, natural window lighting, professional headshot",
  BEACH_VACATION: "a person on a tropical beach at sunset, palm trees, ocean waves, golden hour, professional travel photography",
};