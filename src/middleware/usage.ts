import { NextResponse } from 'next/server';
import { checkUsageLimit } from '@/utils/usage';

export async function withUsageLimit(req: Request, userId: string, type: 'photo' | 'video') {
  try {
    const { canGenerate, remaining } = await checkUsageLimit(userId, type);

    if (!canGenerate) {
      return NextResponse.json(
        { 
          error: 'Usage limit reached',
          details: {
            type,
            remaining
          }
        },
        { status: 403 }
      );
    }

    return null; // Continue with request
  } catch (error) {
    console.error('Usage check error:', error);
    return NextResponse.json(
      { error: 'Failed to check usage limits' },
      { status: 500 }
    );
  }
}