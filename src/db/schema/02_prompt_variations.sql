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