import { NextResponse } from 'next/server';
import { generateImage } from '@/services/fal';

/**
 * POST /api/generate
 * Generates a new image using a trained LORA model and a prompt.
 *
 * @description
 * This endpoint generates a new image by combining a trained LORA model
 * (representing the user's likeness) with a specific prompt describing
 * the desired pose and setting. The generation typically takes 5-10 seconds.
 *
 * @param request - Must contain a JSON body with:
 *   - loraId: string - The ID of the trained LORA model
 *   - prompt: string - Description of the desired image (pose/setting)
 *
 * @returns
 * - 200: { imageUrl: string } - URL of the generated image
 * - 400: { error: string } - Invalid request (missing loraId/prompt)
 * - 500: { error: string } - Server or generation service error
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/generate', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     loraId: 'abc123',
 *     prompt: 'a person sitting at a Parisian cafe...'
 *   })
 * });
 * const { imageUrl } = await response.json();
 * ```
 *
 * @note
 * The prompt should be carefully crafted to work with the LORA model.
 * It should start with 'a person' or similar neutral descriptor and
 * include details about the setting, lighting, and photo style.
 */
export async function POST(request: Request) {
  try {
    const { loraId, prompt } = await request.json();

    if (!loraId || !prompt) {
      return NextResponse.json(
        { error: 'Invalid request: loraId and prompt required' },
        { status: 400 }
      );
    }

    if (typeof prompt !== 'string' || prompt.length > 500) {
      return NextResponse.json(
        { error: 'Prompt must be a string under 500 characters' },
        { status: 400 }
      );
    }

    const imageUrl = await generateImage(loraId, prompt);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}