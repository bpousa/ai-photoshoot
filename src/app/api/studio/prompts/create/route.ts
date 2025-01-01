import { NextResponse } from 'next/server';
import { createPrompt } from '@/services/promptDb';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
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