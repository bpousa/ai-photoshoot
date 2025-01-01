import { NextResponse } from 'next/server';
import { trainModel } from '@/services/fal';

/**
 * POST /api/train
 * Initiates training of a custom LORA model based on user photos.
 *
 * @description
 * This endpoint accepts an array of base64-encoded images and starts the training
 * process using fal.ai's Flux LORA API. The training process typically takes
 * 5-15 minutes depending on the number and complexity of images.
 *
 * @param request - Must contain a JSON body with:
 *   - images: string[] - Array of base64-encoded image strings (max 10 images)
 *
 * @returns
 * - 200: { id: string; status: string; } - Training job initiated successfully
 * - 400: { error: string } - Invalid request (missing/invalid images)
 * - 500: { error: string } - Server or training service error
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/train', {
 *   method: 'POST',
 *   body: JSON.stringify({
 *     images: ['data:image/jpeg;base64,...', ...]
 *   })
 * });
 * const { id, status } = await response.json();
 * ```
 */
export async function POST(request: Request) {
  try {
    const { images } = await request.json();

    if (!images || !Array.isArray(images)) {
      return NextResponse.json(
        { error: 'Invalid request: images array required' },
        { status: 400 }
      );
    }

    if (images.length > 10) {
      return NextResponse.json(
        { error: 'Maximum 10 images allowed' },
        { status: 400 }
      );
    }

    if (!images.every(img => typeof img === 'string' && img.startsWith('data:image'))) {
      return NextResponse.json(
        { error: 'All images must be base64 encoded data URLs' },
        { status: 400 }
      );
    }

    const response = await trainModel(images);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Training error:', error);
    return NextResponse.json(
      { error: 'Failed to train model' },
      { status: 500 }
    );
  }
}