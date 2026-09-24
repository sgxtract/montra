create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.accounts (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  name text not null,

  type text not null,

  currency text not null default 'PHP',

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  name text not null,

  type text not null,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

create table public.transactions (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  account_id uuid not null
    references public.accounts(id)
    on delete restrict,

  category_id uuid
    references public.categories(id)
    on delete set null,

  type text not null,

  amount numeric(14, 2) not null,

  description text,

  transaction_date date not null,

  created_at timestamptz not null default now(),

  updated_at timestamptz not null default now()
);

alter table public.transactions
add constraint transactions_amount_positive
check (amount > 0);

alter table public.categories
add constraint categories_type_valid
check (type in ('income', 'expense'));

alter table public.transactions
add constraint transactions_type_valid
check (type in ('income', 'expense', 'transfer'));

alter table public.profiles enable row level security;
alter table public.accounts enable row level security;
alter table public.categories enable row level security;
alter table public.transactions enable row level security;

create policy "Users can view their own accounts"
on public.accounts
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users can create their own accounts"
on public.accounts
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users can update their own accounts"
on public.accounts
for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Users can delete their own accounts"
on public.accounts
for delete
to authenticated
using (auth.uid() = user_id);

create index accounts_user_id_idx
on public.accounts(user_id);

create index categories_user_id_idx
on public.categories(user_id);

create index transactions_user_id_idx
on public.transactions(user_id);

create index transactions_account_id_idx
on public.transactions(account_id);

create index transactions_category_id_idx
on public.transactions(category_id);

create index transactions_date_idx
on public.transactions(transaction_date);