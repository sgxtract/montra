"use client";

import { useState } from "react";
import { createAccount } from "../actions/createAccount";
import {
  ACCOUNT_CLASSES,
  ACCOUNT_TYPES,
  type AccountClass,
  type AccountType,
} from "../types";

export function AccountForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState<AccountType>("bank");
  const [accountClass, setAccountClass] = useState<AccountClass>("asset");
  const [currency, setCurrency] = useState("PHP");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    const result = await createAccount({
      name,
      type,
      accountClass,
      currency,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    setName("");
    setType("bank");
    setAccountClass("asset");
    setCurrency("PHP");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="account-name"
          className="mb-2 block text-sm font-medium"
        >
          Account name
        </label>

        <input
          id="account-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. BDO Savings"
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="account-type"
          className="mb-2 block text-sm font-medium"
        >
          Account type
        </label>

        <select
          id="account-type"
          value={type}
          onChange={(event) => setType(event.target.value as AccountType)}
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {ACCOUNT_TYPES.map((item) => (
            <option key={item} value={item}>
              {item.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="account-class"
          className="mb-2 block text-sm font-medium"
        >
          Financial class
        </label>

        <select
          id="account-class"
          value={accountClass}
          onChange={(event) =>
            setAccountClass(event.target.value as AccountClass)
          }
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {ACCOUNT_CLASSES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          htmlFor="account-currency"
          className="mb-2 block text-sm font-medium"
        >
          Currency
        </label>

        <input
          id="account-currency"
          value={currency}
          onChange={(event) => setCurrency(event.target.value.toUpperCase())}
          maxLength={3}
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 font-mono uppercase outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      {error && (
        <div className="rounded-2xl bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl bg-success/10 px-4 py-3 text-sm text-success">
          Account created successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-primary px-5 py-3 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {isSubmitting ? "Creating Account..." : "Create Account"}
      </button>
    </form>
  );
}
