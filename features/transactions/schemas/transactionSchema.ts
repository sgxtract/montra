import { z } from "zod";
import { TRANSACTION_TYPES } from "../types";

export const transactionSchema = z
  .object({
    type: z.enum(TRANSACTION_TYPES),

    accountId: z.string().uuid("Please select an account."),

    categoryId: z.string().uuid("Please select a category.").nullable(),

    transferAccountId: z
      .string()
      .uuid("Please select a destination account.")
      .nullable(),

    amount: z.number().positive("Amount must be greater than zero."),

    transactionDate: z.string().date(),

    description: z
      .string()
      .trim()
      .max(500, "Description is too long.")
      .nullable(),
  })
  .superRefine((data, context) => {
    if (data.type === "income" || data.type === "expense") {
      if (!data.categoryId) {
        context.addIssue({
          code: "custom",
          path: ["categoryId"],
          message: "Category is required.",
        });
      }

      if (data.transferAccountId) {
        context.addIssue({
          code: "custom",
          path: ["transferAccountId"],
          message: "Transfer account must be empty.",
        });
      }
    }

    if (data.type === "transfer") {
      if (!data.transferAccountId) {
        context.addIssue({
          code: "custom",
          path: ["transferAccountId"],
          message: "Destination account is required.",
        });
      }

      if (data.categoryId) {
        context.addIssue({
          code: "custom",
          path: ["categoryId"],
          message: "Category must be empty for transfers.",
        });
      }

      if (data.transferAccountId && data.accountId === data.transferAccountId) {
        context.addIssue({
          code: "custom",
          path: ["transferAccountId"],
          message: "Destination account must be different.",
        });
      }
    }
  });

export type TransactionFormValues = z.infer<typeof transactionSchema>;
