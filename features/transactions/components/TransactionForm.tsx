"use client";

import { useState } from "react";
import { createTransaction } from "../actions/createTransaction";
import { TRANSACTION_TYPES, type TransactionType } from "../types";

type TransactionFormProps = {
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

export function TransactionForm({
  accounts,
  categories,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>("expense");
  const [accountId, setAccountId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [transferAccountId, setTransferAccountId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState(
    new Date().toISOString().slice(0, 10),
  );
  const [description, setDescription] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const filteredCategories =
    type === "transfer"
      ? []
      : categories.filter((category) => category.type === type);

  const availableTransferAccounts = accounts.filter(
    (account) => account.id !== accountId,
  );

  function handleTypeChange(nextType: TransactionType) {
    setType(nextType);
    setCategoryId("");
    setTransferAccountId("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    const result = await createTransaction({
      type,
      accountId,
      categoryId: type === "transfer" ? null : categoryId || null,
      transferAccountId: type === "transfer" ? transferAccountId || null : null,
      amount: Number(amount),
      transactionDate,
      description: description.trim() || null,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccess(true);

    setAccountId("");
    setCategoryId("");
    setTransferAccountId("");
    setAmount("");
    setTransactionDate(new Date().toISOString().slice(0, 10));
    setDescription("");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Transaction Type */}
      <div>
        <label
          htmlFor="transaction-type"
          className="mb-2 block text-sm font-medium"
        >
          Transaction type
        </label>

        <select
          id="transaction-type"
          value={type}
          onChange={(event) =>
            handleTypeChange(event.target.value as TransactionType)
          }
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 capitalize outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {TRANSACTION_TYPES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Account */}
      <div>
        <label
          htmlFor="transaction-account"
          className="mb-2 block text-sm font-medium"
        >
          {type === "transfer" ? "From account" : "Account"}
        </label>

        <select
          id="transaction-account"
          value={accountId}
          onChange={(event) => setAccountId(event.target.value)}
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          <option value="">Select an account</option>

          {accounts.map((account) => (
            <option key={account.id} value={account.id}>
              {account.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      {type !== "transfer" && (
        <div>
          <label
            htmlFor="transaction-category"
            className="mb-2 block text-sm font-medium"
          >
            Category
          </label>

          <select
            id="transaction-category"
            value={categoryId}
            onChange={(event) => setCategoryId(event.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">Select a category</option>

            {filteredCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Transfer destination */}
      {type === "transfer" && (
        <div>
          <label
            htmlFor="transaction-transfer-account"
            className="mb-2 block text-sm font-medium"
          >
            To account
          </label>

          <select
            id="transaction-transfer-account"
            value={transferAccountId}
            onChange={(event) => setTransferAccountId(event.target.value)}
            disabled={isSubmitting}
            className="w-full rounded-2xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
          >
            <option value="">Select destination</option>

            {availableTransferAccounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Amount */}
      <div>
        <label
          htmlFor="transaction-amount"
          className="mb-2 block text-sm font-medium"
        >
          Amount
        </label>

        <input
          id="transaction-amount"
          type="number"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="0.00"
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 font-mono outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* Date */}
      <div>
        <label
          htmlFor="transaction-date"
          className="mb-2 block text-sm font-medium"
        >
          Transaction date
        </label>

        <input
          id="transaction-date"
          type="date"
          value={transactionDate}
          onChange={(event) => setTransactionDate(event.target.value)}
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="transaction-description"
          className="mb-2 block text-sm font-medium"
        >
          Description
          <span className="ml-2 font-normal text-muted">Optional</span>
        </label>

        <textarea
          id="transaction-description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="e.g. Monthly salary"
          rows={3}
          disabled={isSubmitting}
          className="w-full resize-none rounded-2xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {/* Messages */}
      {error && (
        <div className="rounded-2xl bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl bg-success/10 px-4 py-3 text-sm text-success">
          Transaction created successfully.
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-primary px-5 py-3 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {isSubmitting ? "Creating Transaction..." : "Create Transaction"}
      </button>
    </form>
  );
}
