import { NextResponse } from 'next/server';
import { generateImage } from '@/services/fal';

export async function POST(request: Request) {
  try {
    const { loraId, prompt } = await request.json();

    if (!loraId || !prompt) {
      return NextResponse.json(
        { error: 'Invalid request: loraId and prompt required' },
        { status: 400 }
      );
    }

    const imageUrl = await generateImage(loraId, prompt);

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate image' },
      { status: 500 }
    );
  }
}