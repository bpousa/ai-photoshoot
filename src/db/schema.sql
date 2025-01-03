-- Enable RLS
ALTER DATABASE photoshoot SET row_level_security = on;

-- Subscriptions table
CREATE TABLE subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    stripe_customer_id TEXT,
    stripe_subscription_id TEXT,
    tier TEXT NOT NULL CHECK (tier IN ('basic', 'pro', 'studio')),
    status TEXT NOT NULL CHECK (status IN ('active', 'past_due', 'canceled')),
    current_period_end TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_customer ON subscriptions(stripe_customer_id);

-- Usage tracking
CREATE TABLE usage (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    total_photos INTEGER DEFAULT 0,
    total_videos INTEGER DEFAULT 0,
    monthly_photos INTEGER DEFAULT 0,
    monthly_videos INTEGER DEFAULT 0,
    last_reset TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now())
);

CREATE INDEX idx_usage_user ON usage(user_id);

-- Reset monthly usage function
CREATE OR REPLACE FUNCTION reset_monthly_usage()
RETURNS void AS $$
BEGIN
    UPDATE usage
    SET 
        monthly_photos = 0,
        monthly_videos = 0,
        last_reset = timezone('utc', now())
    WHERE
        EXTRACT(month FROM last_reset) != EXTRACT(month FROM timezone('utc', now()));
END;
$$ LANGUAGE plpgsql;