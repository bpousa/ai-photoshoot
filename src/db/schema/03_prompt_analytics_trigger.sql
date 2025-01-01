-- Create trigger to update analytics
CREATE TRIGGER update_prompt_analytics_trigger
    AFTER INSERT OR UPDATE OF score
    ON prompt_variations
    FOR EACH ROW
    EXECUTE FUNCTION update_prompt_analytics();

-- Create trigger to cleanup analytics when prompt is deleted
CREATE OR REPLACE FUNCTION cleanup_prompt_analytics()
    RETURNS TRIGGER AS $$
BEGIN
    DELETE FROM prompt_analytics WHERE prompt_id = OLD.id;
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER cleanup_prompt_analytics_trigger
    BEFORE DELETE ON photo_prompts
    FOR EACH ROW
    EXECUTE FUNCTION cleanup_prompt_analytics();