import { NextResponse } from 'next/server';
import { trainModel } from '@/services/fal';

export async function POST(request: Request) {
  try {
    const { images } = await request.json();

    if (!images || !Array.isArray(images)) {
      return NextResponse.json(
        { error: 'Invalid request: images array required' },
        { status: 400 }
      );
    }

    const response = await trainModel(images);

    return NextResponse.json(response);
  } catch (error) {
    console.error('Training error:', error);
    return NextResponse.json(
      { error: 'Failed to train model' },
      { status: 500 }
    );
  }
}