create policy "Users can view their own categories"
on public.categories
for select
to authenticated
using (auth.uid() = user_id);