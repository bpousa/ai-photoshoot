import { PhotoPrompt, PromptIdea, PhotoSettings } from '@/types/photographer';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY!;

interface GenerateIdeasParams {
  category: string;
  style?: string;
  count?: number;
  existingPrompts?: string[];
}

export async function generatePromptIdeas({ 
  category,
  style = 'professional',
  count = 3,
  existingPrompts = []
}: GenerateIdeasParams): Promise<PromptIdea[]> {
  const systemPrompt = `You are an expert AI photographer who specializes in creating prompts for AI image generation.
    You understand composition, lighting, and how to craft prompts that work well with Stable Diffusion-based models.
    Generate ${count} unique photo prompt ideas for the category: ${category}.
    They should be different from these existing prompts: ${existingPrompts.join(', ')}`;

  const userMessage = `Create ${count} detailed photo prompts for ${style} ${category} photos.
    Each prompt should include:
    - Main subject and pose
    - Setting and background
    - Lighting description
    - Camera angle
    - Style keywords (cinematic, editorial, etc)
    - Technical details (focal length, etc)`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ]
      })
    });

    const data = await response.json();
    
    // Parse Claude's response and convert to PromptIdea[]
    return parseClaudeResponse(data.content);
  } catch (error) {
    console.error('Error generating prompt ideas:', error);
    throw error;
  }
}

export async function improvePrompt(prompt: string, feedback: string): Promise<string> {
  const systemPrompt = 'You are an expert AI photographer who helps improve image generation prompts.';
  const userMessage = `Please improve this photo prompt based on the feedback:\n\nPrompt: ${prompt}\n\nFeedback: ${feedback}`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 500,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ]
      })
    });

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('Error improving prompt:', error);
    throw error;
  }
}

function parseClaudeResponse(response: string): PromptIdea[] {
  // Implementation will depend on Claude's response format
  // This is a placeholder that we'll need to implement based on testing
  return [];
}