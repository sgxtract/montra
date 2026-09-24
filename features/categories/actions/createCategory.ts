"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import {
  categorySchema,
  type CategoryFormValues,
} from "../schemas/categorySchema";

type CreateCategoryResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function createCategory(
  values: CategoryFormValues,
): Promise<CreateCategoryResult> {
  const parsed = categorySchema.safeParse(values);

  if (!parsed.success) {
    return {
      success: false,
      error: "Please check the category information.",
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

  const { error } = await supabase.from("categories").insert({
    user_id: user.id,
    name: parsed.data.name,
    type: parsed.data.type,
  });

  if (error) {
    if (error.code === "23505") {
      return {
        success: false,
        error: "A category with this name and type already exists.",
      };
    }

    return {
      success: false,
      error: "Unable to create the category. Please try again.",
    };
  }

  revalidatePath("/categories");

  return {
    success: true,
  };
}
