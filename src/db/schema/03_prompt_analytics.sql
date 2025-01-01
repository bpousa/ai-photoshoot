CREATE TABLE prompt_analytics (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    prompt_id UUID REFERENCES photo_prompts(id) ON DELETE CASCADE,
    total_uses INTEGER DEFAULT 0,
    avg_score FLOAT,
    success_rate FLOAT,
    last_used_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE INDEX idx_prompt_analytics_success ON prompt_analytics(success_rate DESC);

-- Auto-update analytics when variations are added/updated
CREATE OR REPLACE FUNCTION update_prompt_analytics()
    RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO prompt_analytics (prompt_id)
    VALUES (NEW.prompt_id)
    ON CONFLICT (prompt_id) DO UPDATE
    SET 
        total_uses = prompt_analytics.total_uses + 1,
        avg_score = (
            SELECT AVG(score)
            FROM prompt_variations
            WHERE prompt_id = NEW.prompt_id
            AND score IS NOT NULL
        ),
        success_rate = (
            SELECT COUNT(*)::float / NULLIF(COUNT(*), 0)
            FROM prompt_variations
            WHERE prompt_id = NEW.prompt_id
            AND score >= 4
        ),
        last_used_at = NOW(),
        updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;