import { NextResponse } from 'next/server';
import { generatePromptIdeas } from '@/services/claude';

/**
 * POST /api/studio/ai/generate-prompts
 * Generates new prompt ideas using Claude
 */
export async function POST(request: Request) {
  try {
    const { category, style, count } = await request.json();

    if (!category) {
      return NextResponse.json(
        { error: 'Category is required' },
        { status: 400 }
      );
    }

    const ideas = await generatePromptIdeas({
      category,
      style: style || 'professional',
      count: count || 3
    });

    return NextResponse.json({ ideas });
  } catch (error) {
    console.error('Error generating ideas:', error);
    return NextResponse.json(
      { error: 'Failed to generate ideas' },
      { status: 500 }
    );
  }
}