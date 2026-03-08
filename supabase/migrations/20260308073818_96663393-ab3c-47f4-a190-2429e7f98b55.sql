-- Fix search_path to include extensions for vector operators
CREATE OR REPLACE FUNCTION public.match_knowledge_entries(
  query_embedding extensions.vector(1536),
  match_threshold FLOAT DEFAULT 0.5,
  match_count INT DEFAULT 3
)
RETURNS TABLE (
  id UUID,
  content TEXT,
  metadata JSONB,
  similarity FLOAT
)
LANGUAGE sql
STABLE
SET search_path = public, extensions
AS $$
  SELECT
    ke.id,
    ke.content,
    ke.metadata,
    1 - (ke.embedding <=> query_embedding) AS similarity
  FROM public.knowledge_entries ke
  WHERE 1 - (ke.embedding <=> query_embedding) > match_threshold
  ORDER BY ke.embedding <=> query_embedding
  LIMIT match_count;
$$;

-- Fix permissive INSERT policy on chat_logs
DROP POLICY IF EXISTS "Anyone can insert chat logs" ON public.chat_logs;
CREATE POLICY "Anyone can insert chat logs"
  ON public.chat_logs FOR INSERT
  TO anon, authenticated
  WITH CHECK (session_id IS NOT NULL AND content IS NOT NULL);