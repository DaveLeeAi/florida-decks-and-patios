CREATE POLICY "Allow insert on knowledge_entries" ON public.knowledge_entries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on knowledge_entries" ON public.knowledge_entries FOR UPDATE USING (true) WITH CHECK (true);
CREATE POLICY "Allow delete on knowledge_entries" ON public.knowledge_entries FOR DELETE USING (true);