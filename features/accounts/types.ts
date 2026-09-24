export const ACCOUNT_TYPES = [
  "cash",
  "bank",
  "e_wallet",
  "credit_card",
  "investment",
  "loan",
] as const;

export type AccountType = (typeof ACCOUNT_TYPES)[number];

export const ACCOUNT_CLASSES = ["asset", "liability"] as const;

export type AccountClass = (typeof ACCOUNT_CLASSES)[number];

export type Account = {
  id: string;
  user_id: string;
  name: string;
  type: AccountType;
  account_class: AccountClass;
  currency: string;
  created_at: string;
  updated_at: string;
};
