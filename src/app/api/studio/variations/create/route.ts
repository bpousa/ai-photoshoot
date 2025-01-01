import { NextResponse } from 'next/server';
import { saveVariation } from '@/services/promptDb';
import { generateImage } from '@/services/fal';

/**
 * POST /api/studio/variations/create
 * Creates and tests a new prompt variation
 */
export async function POST(request: Request) {
  try {
    const { promptId, modifiedPrompt, settings, loraId } = await request.json();

    if (!promptId || !modifiedPrompt || !settings || !loraId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate test image
    const resultUrl = await generateImage(loraId, modifiedPrompt);

    // Save variation
    const variation = await saveVariation({
      promptId,
      modifiedPrompt,
      settings,
      resultUrl
    });

    return NextResponse.json(variation);
  } catch (error) {
    console.error('Error creating variation:', error);
    return NextResponse.json(
      { error: 'Failed to create variation' },
      { status: 500 }
    );
  }
}