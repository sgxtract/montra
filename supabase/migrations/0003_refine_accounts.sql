alter table public.accounts
add column account_class text not null default 'asset';

alter table public.accounts
add constraint accounts_type_valid
check (
  type in (
    'cash',
    'bank',
    'e_wallet',
    'credit_card',
    'investment',
    'loan'
  )
);

alter table public.accounts
add constraint accounts_class_valid
check (
  account_class in ('asset', 'liability')
);

create unique index accounts_user_name_unique
on public.accounts (user_id, lower(name));

create unique index categories_user_type_name_unique
on public.categories (
  user_id,
  type,
  lower(name)
);