create policy "Users can insert their own categories"
on public.categories
for insert
to authenticated
with check (auth.uid() = user_id);