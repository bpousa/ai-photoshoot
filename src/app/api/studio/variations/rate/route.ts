import { NextResponse } from 'next/server';
import { updateVariationRating } from '@/services/promptDb';

/**
 * POST /api/studio/variations/rate
 * Updates the rating and notes for a variation
 */
export async function POST(request: Request) {
  try {
    const { variationId, score, notes } = await request.json();

    if (!variationId || !score || score < 1 || score > 5) {
      return NextResponse.json(
        { error: 'Invalid rating data' },
        { status: 400 }
      );
    }

    const updated = await updateVariationRating(variationId, score, notes);
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error rating variation:', error);
    return NextResponse.json(
      { error: 'Failed to update rating' },
      { status: 500 }
    );
  }
}