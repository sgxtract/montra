import { createClient } from "@/lib/supabase/server";
import type { TransactionType } from "../types";

type TransactionRow = {
  id: string;
  user_id: string;
  type: TransactionType;
  amount: number;
  transaction_date: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  account: {
    id: string;
    name: string;
    type: string;
    account_class: string;
  } | null;
  category: {
    id: string;
    name: string;
    type: string;
  } | null;
  transfer_account: {
    id: string;
    name: string;
    type: string;
    account_class: string;
  } | null;
};

export async function getTransactions() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("transactions")
    .select(
      `
        id,
        user_id,
        type,
        amount,
        transaction_date,
        description,
        created_at,
        updated_at,
        account:accounts!transactions_account_id_fkey (
          id,
          name,
          type,
          account_class
        ),
        category:categories!transactions_category_id_fkey (
          id,
          name,
          type
        ),
        transfer_account:accounts!transactions_transfer_account_id_fkey (
          id,
          name,
          type,
          account_class
        )
      `,
    )
    .order("transaction_date", { ascending: false })
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error("Failed to load transactions.");
  }

  return (data ?? []) as unknown as TransactionRow[];
}
