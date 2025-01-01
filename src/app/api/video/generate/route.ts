import { NextResponse } from 'next/server';
import { generateVideo } from '@/services/video';

export async function POST(request: Request) {
  try {
    const { photoUrl, motionType } = await request.json();

    if (!photoUrl || !motionType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await generateVideo({
      photoUrl,
      motionType,
      duration: 3,
    });

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to generate video' },
      { status: 500 }
    );
  }
}