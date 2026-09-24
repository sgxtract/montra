"use client";

import { useState } from "react";
import { AddCategoryButton } from "./AddCategoryButton";
import { CategoryForm } from "./CategoryForm";

export function CategoriesPageContent() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Finances
          </p>

          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            Categories
          </h1>

          <p className="mt-2 max-w-2xl text-muted">
            Organize your income and expenses so your financial activity stays
            meaningful and easy to understand.
          </p>
        </div>

        <AddCategoryButton onClick={() => setIsFormOpen(true)} />
      </div>

      {isFormOpen && (
        <div className="mt-8 rounded-3xl bg-surface-elevated p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Add Category
              </h2>

              <p className="mt-1 text-sm text-muted">
                Create an income or expense category.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="rounded-xl px-3 py-2 text-sm text-muted transition hover:bg-surface hover:text-foreground"
            >
              Cancel
            </button>
          </div>

          <div className="max-w-xl">
            <CategoryForm />
          </div>
        </div>
      )}
    </>
  );
}
