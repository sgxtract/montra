"use client";

import { useState } from "react";
import { TransactionForm } from "./TransactionForm";

type TransactionsPageContentProps = {
  accounts: {
    id: string;
    name: string;
    type: string;
    account_class: string;
  }[];
  categories: {
    id: string;
    name: string;
    type: "income" | "expense";
  }[];
};

export function TransactionsPageContent({
  accounts,
  categories,
}: TransactionsPageContentProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Finances
          </p>

          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            Transactions
          </h1>

          <p className="mt-2 max-w-2xl text-muted">
            Track your income, expenses, and transfers.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsFormOpen(true)}
          className="rounded-2xl bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
        >
          + Add Transaction
        </button>
      </div>

      {isFormOpen && (
        <div className="mt-8 rounded-3xl bg-surface-elevated p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Add Transaction
              </h2>

              <p className="mt-1 text-sm text-muted">
                Record income, expenses, or transfers.
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
            <TransactionForm accounts={accounts} categories={categories} />
          </div>
        </div>
      )}
    </>
  );
}
