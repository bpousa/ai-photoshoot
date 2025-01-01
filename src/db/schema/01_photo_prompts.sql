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