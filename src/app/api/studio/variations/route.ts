import { NextResponse } from 'next/server';
import { getVariationHistory } from '@/services/promptDb';

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