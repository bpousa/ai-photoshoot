import { NextResponse } from 'next/server';
import { improvePrompt } from '@/services/claude';

/**
 * POST /api/studio/ai/improve-prompt
 * Gets AI suggestions for improving a prompt
 */
export async function POST(request: Request) {
  try {
    const { prompt, feedback } = await request.json();

    if (!prompt || !feedback) {
      return NextResponse.json(
        { error: 'Prompt and feedback are required' },
        { status: 400 }
      );
    }

    const improvedPrompt = await improvePrompt(prompt, feedback);
    return NextResponse.json({ improvedPrompt });
  } catch (error) {
    console.error('Error improving prompt:', error);
    return NextResponse.json(
      { error: 'Failed to improve prompt' },
      { status: 500 }
    );
  }
}