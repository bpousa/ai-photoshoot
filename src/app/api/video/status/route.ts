import { NextResponse } from 'next/server';
import { checkVideoStatus } from '@/services/video-status';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoId = searchParams.get('id');

    if (!videoId) {
      return NextResponse.json(
        { error: 'Video ID is required' },
        { status: 400 }
      );
    }

    const status = await checkVideoStatus(videoId);
    return NextResponse.json(status);
  } catch (error) {
    console.error('Video status API error:', error);
    return NextResponse.json(
      { error: 'Failed to check video status' },
      { status: 500 }
    );
  }
}