import { NextResponse } from 'next/server';
import {
  SuggestionRequest,
  SuggestionResponse,
  STYLE_KEYWORDS
} from '@/types/suggestions';

export async function POST(request: Request) {
  try {
    const { basePrompt, style, count = 3 } = await request.json() as SuggestionRequest;

    // Get style-specific keywords
    const styleWords = STYLE_KEYWORDS[style as keyof typeof STYLE_KEYWORDS] || [];

    // Claude system prompt
    const systemPrompt = `You are an expert photo prompt engineer. 
      Generate ${count} variations of the given prompt that would work well 
      with Flux LORA. Focus on ${style} style photos.`;

    // Call Claude API (simplified)
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: `Base prompt: ${basePrompt}\nStyle keywords: ${styleWords.join(', ')}` }
        ]
      })
    });

    const suggestions = await response.json();
    
    // Process Claude's response into suggestions
    // This is a simplified version - would need more robust parsing
    const result: SuggestionResponse = {
      suggestions: suggestions.content.split('\n')
        .filter(Boolean)
        .slice(0, count)
        .map(prompt => ({
          prompt,
          reason: 'AI-enhanced version of your prompt',
          confidence: 0.85
        }))
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Suggestion generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate suggestions' },
      { status: 500 }
    );
  }
}