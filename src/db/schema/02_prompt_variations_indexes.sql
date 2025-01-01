-- Add indexes
CREATE INDEX idx_prompt_variations_prompt_id ON prompt_variations(prompt_id);
CREATE INDEX idx_prompt_variations_score ON prompt_variations(score);

-- Add RLS policies
ALTER TABLE prompt_variations ENABLE ROW LEVEL SECURITY;

-- Users can read variations of public prompts or their own prompts
CREATE POLICY "Read variations policy" ON prompt_variations
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM photo_prompts
            WHERE photo_prompts.id = prompt_variations.prompt_id
            AND (photo_prompts.is_public OR photo_prompts.created_by = auth.uid())
        )
    );