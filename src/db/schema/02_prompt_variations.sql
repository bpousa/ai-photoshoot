-- Prompt variations table - Stores experimental variations and results
CREATE TABLE prompt_variations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    prompt_id UUID REFERENCES photo_prompts(id) ON DELETE CASCADE,
    modified_prompt TEXT NOT NULL,
    settings JSONB NOT NULL,
    result_url TEXT,
    score INTEGER CHECK (score >= 1 AND score <= 5),
    notes TEXT,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add indexes
CREATE INDEX idx_prompt_variations_prompt_id ON prompt_variations(prompt_id);
CREATE INDEX idx_prompt_variations_score ON prompt_variations(score);

-- Add RLS policies
ALTER TABLE prompt_variations ENABLE ROW LEVEL SECURITY;

-- Users can read variations of public prompts or their own prompts
CREATE POLICY "Read public or own variations" ON prompt_variations
    FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM photo_prompts
            WHERE photo_prompts.id = prompt_variations.prompt_id
            AND (photo_prompts.is_public OR photo_prompts.created_by = auth.uid())
        )
    );

-- Users can only insert variations for their own prompts
CREATE POLICY "Insert own variations" ON prompt_variations
    FOR INSERT
    WITH CHECK (
        EXISTS (
            SELECT 1 FROM photo_prompts
            WHERE photo_prompts.id = prompt_variations.prompt_id
            AND photo_prompts.created_by = auth.uid()
        )
    );