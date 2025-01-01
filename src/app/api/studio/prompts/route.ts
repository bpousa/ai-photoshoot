import { NextResponse } from 'next/server';
import { createPrompt, getPromptsByCategory } from '@/services/promptDb';

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