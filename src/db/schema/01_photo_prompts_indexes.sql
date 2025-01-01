-- Add indexes for common queries
CREATE INDEX idx_photo_prompts_category ON photo_prompts(category);
CREATE INDEX idx_photo_prompts_created_by ON photo_prompts(created_by);

-- Add RLS policies
ALTER TABLE photo_prompts ENABLE ROW LEVEL SECURITY;

-- Users can read public prompts or their own
CREATE POLICY "Read public or own prompts" ON photo_prompts
    FOR SELECT
    USING (is_public OR created_by = auth.uid());