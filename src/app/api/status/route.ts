import { NextResponse } from 'next/server';
import { createClient } from '@fal-ai/serverless-client';

const falClient = createClient({
  credentials: process.env.FAL_AI_API_KEY!,
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const modelId = searchParams.get('modelId');

    if (!modelId) {
      return NextResponse.json(
        { error: 'Model ID is required' },
        { status: 400 }
      );
    }

    const status = await falClient.status(modelId);

    return NextResponse.json(status);
  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { error: 'Failed to check model status' },
      { status: 500 }
    );
  }
}