-- Photo prompts table - Stores base prompt templates
CREATE TABLE photo_prompts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    base_prompt TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    settings JSONB NOT NULL DEFAULT '{
        "numInferenceSteps": 30,
        "guidanceScale": 7.5,
        "loraWeight": 0.75
    }',
    is_public BOOLEAN DEFAULT false,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add indexes for common queries
CREATE INDEX idx_photo_prompts_category ON photo_prompts(category);
CREATE INDEX idx_photo_prompts_created_by ON photo_prompts(created_by);

-- Add RLS policies
ALTER TABLE photo_prompts ENABLE ROW LEVEL SECURITY;

-- Users can read public prompts or their own
CREATE POLICY "Read public or own prompts" ON photo_prompts
    FOR SELECT
    USING (is_public OR created_by = auth.uid());

-- Users can only insert their own prompts
CREATE POLICY "Insert own prompts" ON photo_prompts
    FOR INSERT
    WITH CHECK (created_by = auth.uid());

-- Users can only update their own prompts
CREATE POLICY "Update own prompts" ON photo_prompts
    FOR UPDATE
    USING (created_by = auth.uid());