"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  transactionSchema,
  type TransactionFormValues,
} from "../schemas/transactionSchema";

type CreateTransactionResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function createTransaction(
  values: TransactionFormValues,
): Promise<CreateTransactionResult> {
  const parsed = transactionSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the transaction information.",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      success: false,
      error: "You must be signed in.",
    };
  }

  const { error } = await supabase.from("transactions").insert({
    user_id: user.id,
    type: parsed.data.type,
    account_id: parsed.data.accountId,
    category_id: parsed.data.categoryId,
    transfer_account_id: parsed.data.transferAccountId,
    amount: parsed.data.amount,
    transaction_date: parsed.data.transactionDate,
    description: parsed.data.description,
  });

  if (error) {
    if (error.code === "23503") {
      return {
        success: false,
        error:
          "One of the selected accounts or categories is no longer available.",
      };
    }

    return {
      success: false,
      error: "Unable to create the transaction. Please try again.",
    };
  }

  revalidatePath("/transactions");

  return {
    success: true,
  };
}
