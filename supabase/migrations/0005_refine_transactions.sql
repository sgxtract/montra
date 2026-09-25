-- Add transfer destination

alter table public.transactions
add column transfer_account_id uuid
references public.accounts(id)
on delete restrict;

-- Prevent Transfer from the same account

alter table public.transactions
add constraint transactions_transfer_accounts_different
check (
  transfer_account_id is null
  or account_id <> transfer_account_id
);

-- Enforce Transfer Rules

alter table public.transactions
add constraint transactions_category_rules
check (
  (
    type in ('income', 'expense')
    and category_id is not null
    and transfer_account_id is null
  )
  or
  (
    type = 'transfer'
    and category_id is null
    and transfer_account_id is not null
  )
);

-- Add RLS

alter table public.transactions enable row level security;

-- Create policy

create policy "Users can view their own transactions"
on public.transactions
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
on public.transactions
for insert
to authenticated
with check (auth.uid() = user_id);

-- Add useful indexes

create index transactions_transfer_account_id_idx
on public.transactions(transfer_account_id);

create index transactions_date_idx
on public.transactions(transaction_date);