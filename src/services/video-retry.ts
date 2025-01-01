import { generateVideo } from './video';

interface RetryConfig {
  maxAttempts?: number;
  delayMs?: number;
}

export async function generateVideoWithRetry(
  params: Parameters<typeof generateVideo>[0],
  { maxAttempts = 3, delayMs = 1000 }: RetryConfig = {}
) {
  let lastError: any;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await generateVideo(params);
    } catch (error) {
      lastError = error;
      
      if (attempt < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, delayMs));
      }
    }
  }

  throw new Error(
    `Failed after ${maxAttempts} attempts. Last error: ${lastError?.message}`
  );
}