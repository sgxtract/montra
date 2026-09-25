export const TRANSACTION_TYPES = ["income", "expense", "transfer"] as const;

export type TransactionType = (typeof TRANSACTION_TYPES)[number];

export type Transaction = {
  id: string;
  user_id: string;
  account_id: string;
  category_id: string | null;
  transfer_account_id: string | null;
  type: TransactionType;
  amount: number;
  description: string | null;
  transaction_date: string;
  created_at: string;
  updated_at: string;
};
