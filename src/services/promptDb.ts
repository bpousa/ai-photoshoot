import { createClient } from '@supabase/supabase-js';
import { 
  PhotoPrompt,
  PromptVariation,
  PromptIdea,
  PhotoSettings 
} from '@/types/photographer';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function createPrompt(prompt: Omit<PhotoPrompt, 'id' | 'createdAt' | 'updatedAt'>) {
  const { data, error } = await supabase
    .from('photo_prompts')
    .insert([
      {
        name: prompt.name,
        base_prompt: prompt.basePrompt,
        category: prompt.category,
        settings: prompt.settings
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function saveVariation(variation: Omit<PromptVariation, 'id' | 'createdAt'>) {
  const { data, error } = await supabase
    .from('prompt_variations')
    .insert([
      {
        prompt_id: variation.promptId,
        modified_prompt: variation.modifiedPrompt,
        settings: variation.settings,
        result_url: variation.resultUrl,
        score: variation.score,
        notes: variation.notes
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getPromptsByCategory(category: string) {
  const { data, error } = await supabase
    .from('photo_prompts')
    .select(`
      *,
      variations:prompt_variations(*)
    `)
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function getVariationHistory(promptId: string) {
  const { data, error } = await supabase
    .from('prompt_variations')
    .select('*')
    .eq('prompt_id', promptId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function savePromptIdea(idea: Omit<PromptIdea, 'id' | 'createdAt'>) {
  const { data, error } = await supabase
    .from('prompt_ideas')
    .insert([
      {
        prompt: idea.prompt,
        category: idea.category,
        description: idea.description,
        suggested_settings: idea.suggestedSettings,
        created_by: idea.createdBy
      }
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getTopPerformingSettings(category: string): Promise<PhotoSettings> {
  const { data, error } = await supabase
    .from('prompt_variations')
    .select(`
      settings,
      score
    `)
    .eq('category', category)
    .gte('score', 4)
    .order('score', { ascending: false })
    .limit(10);

  if (error) throw error;

  // Aggregate settings to find optimal values
  return calculateOptimalSettings(data);
}

function calculateOptimalSettings(variations: any[]): PhotoSettings {
  // Implementation to average out successful settings
  // This is a placeholder that we'll implement based on data analysis
  return {
    numInferenceSteps: 30,
    guidanceScale: 7.5,
    loraWeight: 0.75
  };
}