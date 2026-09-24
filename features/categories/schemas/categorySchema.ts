import { z } from "zod";

import { CATEGORY_TYPES } from "../types";

export const categorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(100, "Category name is too long"),

  type: z.enum(CATEGORY_TYPES),
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
