import { NextResponse } from 'next/server';
import { createPrompt, getPromptsByCategory } from '@/services/promptDb';

/**
 * GET /api/studio/prompts
 * Retrieves photo prompts, optionally filtered by category
 */
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const prompts = await getPromptsByCategory(category || 'all');
    return NextResponse.json(prompts);
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch prompts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/studio/prompts
 * Creates a new photo prompt template
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.basePrompt || !body.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const prompt = await createPrompt({
      name: body.name,
      basePrompt: body.basePrompt,
      category: body.category,
      settings: body.settings || {
        numInferenceSteps: 30,
        guidanceScale: 7.5,
        loraWeight: 0.75
      }
    });

    return NextResponse.json(prompt);
  } catch (error) {
    console.error('Error creating prompt:', error);
    return NextResponse.json(
      { error: 'Failed to create prompt' },
      { status: 500 }
    );
  }
}