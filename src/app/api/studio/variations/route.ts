import { NextResponse } from 'next/server';
import { saveVariation, getVariationHistory } from '@/services/promptDb';
import { generateImage } from '@/services/fal';

/**
 * GET /api/studio/variations
 * Retrieves variation history for a prompt
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const promptId = searchParams.get('promptId');

    if (!promptId) {
      return NextResponse.json(
        { error: 'Prompt ID is required' },
        { status: 400 }
      );
    }

    const variations = await getVariationHistory(promptId);
    return NextResponse.json(variations);
  } catch (error) {
    console.error('Error fetching variations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch variations' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/studio/variations
 * Creates and tests a new prompt variation
 */
export async function POST(request: Request) {
  try {
    const {
      promptId,
      modifiedPrompt,
      settings,
      loraId
    } = await request.json();

    // Validate required fields
    if (!promptId || !modifiedPrompt || !settings || !loraId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate test image with the variation
    const resultUrl = await generateImage(loraId, modifiedPrompt);

    // Save the variation and its result
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