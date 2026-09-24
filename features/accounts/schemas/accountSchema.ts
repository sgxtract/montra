import { z } from "zod";

import { ACCOUNT_CLASSES, ACCOUNT_TYPES } from "../types";

export const accountSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Account name is required")
    .max(100, "Account name is too long"),

  type: z.enum(ACCOUNT_TYPES),

  accountClass: z.enum(ACCOUNT_CLASSES),

  currency: z.string().trim().length(3, "Currency must be a 3-letter code"),
});

export type AccountFormValues = z.infer<typeof accountSchema>;
