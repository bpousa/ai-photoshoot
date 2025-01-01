export async function checkVideoStatus(videoId: string) {
  try {
    const response = await fetch(
      `https://api.fal.ai/video/status/${videoId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.FAL_AI_KEY}`,
        },
      }
    );

    return await response.json();
  } catch (error) {
    throw error;
  }
}