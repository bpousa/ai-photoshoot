-- Prompt ideas table - Stores AI and human generated prompt ideas
CREATE TABLE prompt_ideas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    prompt TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    description TEXT,
    suggested_settings JSONB,
    created_by VARCHAR(10) CHECK (created_by IN ('human', 'ai')) NOT NULL,
    used_count INTEGER DEFAULT 0,
    success_rate FLOAT CHECK (success_rate >= 0 AND success_rate <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Add indexes
CREATE INDEX idx_prompt_ideas_category ON prompt_ideas(category);
CREATE INDEX idx_prompt_ideas_success_rate ON prompt_ideas(success_rate);

-- Function to update success rate
CREATE OR REPLACE FUNCTION update_idea_success_rate()
    RETURNS TRIGGER AS $$
BEGIN
    UPDATE prompt_ideas
    SET success_rate = (
        SELECT AVG(CASE WHEN score >= 4 THEN 1 ELSE 0 END)
        FROM prompt_variations
        WHERE modified_prompt LIKE '%' || prompt_ideas.prompt || '%'
    )
    WHERE id = NEW.id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update success rate when variations are added
CREATE TRIGGER update_idea_success_rate_trigger
    AFTER INSERT OR UPDATE ON prompt_variations
    FOR EACH ROW
    EXECUTE FUNCTION update_idea_success_rate();