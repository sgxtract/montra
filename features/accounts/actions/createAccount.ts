"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  accountSchema,
  type AccountFormValues,
} from "../schemas/accountSchema";

type CreateAccountResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function createAccount(
  values: AccountFormValues,
): Promise<CreateAccountResult> {
  const parsed = accountSchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the account information.",
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

  const { error } = await supabase.from("accounts").insert({
    user_id: user.id,
    name: parsed.data.name,
    type: parsed.data.type,
    account_class: parsed.data.accountClass,
    currency: parsed.data.currency,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        error: "An account with this name already exists.",
      };
    }

    return {
      success: false,
      error: "Unable to create the account. Please try again.",
    };
  }

  revalidatePath("/accounts");

  return {
    success: true,
  };
}
