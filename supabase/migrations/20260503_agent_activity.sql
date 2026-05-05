-- Track all autonomous agent actions for monitoring and self-healing

CREATE TABLE IF NOT EXISTS agent_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agent TEXT NOT NULL,
  action TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('success', 'failed', 'skipped', 'retrying')),
  details JSONB,
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,
  duration_ms INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_agent_activity_created ON agent_activity (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_agent_activity_agent ON agent_activity (agent, status);

-- Service role only — agents use admin client
ALTER TABLE agent_activity ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access activity"
  ON agent_activity FOR ALL
  USING (auth.role() = 'service_role');

-- Track inbound support emails for the auto-responder
CREATE TABLE IF NOT EXISTS support_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  from_email TEXT NOT NULL,
  subject TEXT,
  body TEXT,
  ai_reply TEXT,
  reply_sent_at TIMESTAMPTZ,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'replied', 'escalated', 'failed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_support_messages_status ON support_messages (status, created_at DESC);

ALTER TABLE support_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access support"
  ON support_messages FOR ALL
  USING (auth.role() = 'service_role');

-- Track which blog posts have been published to which channels
CREATE TABLE IF NOT EXISTS social_publishing (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_slug TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('twitter', 'linkedin', 'facebook', 'reddit')),
  external_post_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'posted', 'failed')),
  error_message TEXT,
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blog_slug, platform)
);

CREATE INDEX IF NOT EXISTS idx_social_publishing_status ON social_publishing (status, blog_slug);

ALTER TABLE social_publishing ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Service role full access social"
  ON social_publishing FOR ALL
  USING (auth.role() = 'service_role');
