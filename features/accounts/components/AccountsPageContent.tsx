"use client";

import { useState } from "react";

import { AccountForm } from "./AccountForm";
import { AddAccountButton } from "./AddAccountButton";

export function AccountsPageContent() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary">
            Finances
          </p>

          <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">
            Accounts
          </h1>

          <p className="mt-2 max-w-2xl text-muted">
            Manage the places where your money and financial obligations live.
          </p>
        </div>

        <AddAccountButton onClick={() => setIsFormOpen(true)} />
      </div>

      {isFormOpen && (
        <div className="mt-8 rounded-3xl bg-surface-elevated p-6 shadow-sm">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-semibold">
                Add Account
              </h2>

              <p className="mt-1 text-sm text-muted">
                Add a bank account, wallet, credit card, or other financial
                account.
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
            <AccountForm />
          </div>
        </div>
      )}
    </>
  );
}
