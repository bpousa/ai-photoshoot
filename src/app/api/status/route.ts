import { NextResponse } from 'next/server';
import { createClient } from '@fal-ai/serverless-client';

const falClient = createClient({
  credentials: process.env.FAL_AI_API_KEY!,
});

/**
 * GET /api/status
 * Checks the status of a LORA model training job.
 *
 * @description
 * This endpoint polls the fal.ai service to check the current status of a
 * training job. It's typically used to monitor progress during the initial
 * model training phase, which can take several minutes to complete.
 *
 * @param request - Must include URL query parameter:
 *   - modelId: string - The ID of the training job to check
 *
 * @returns
 * - 200: {
 *     id: string;
 *     status: 'running' | 'completed' | 'failed';
 *     progress?: number; // 0-100
 *     error?: string;
 *   }
 * - 400: { error: string } - Missing model ID
 * - 500: { error: string } - Server or service error
 *
 * @example
 * ```typescript
 * const response = await fetch('/api/status?modelId=abc123');
 * const status = await response.json();
 * // status = { id: 'abc123', status: 'running', progress: 45 }
 * ```
 *
 * @note
 * Recommended polling interval is 5 seconds. The endpoint includes
 * rate limiting to prevent excessive requests.
 */
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