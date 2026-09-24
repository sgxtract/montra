"use client";

import { useState } from "react";
import { createCategory } from "../actions/createCategory";
import { CATEGORY_TYPES, type CategoryType } from "../types";

export function CategoryForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState<CategoryType>("expense");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    const result = await createCategory({
      name,
      type,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setError(result.error);
      return;
    }

    setSuccess(true);
    setName("");
    setType("expense");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label
          htmlFor="category-name"
          className="mb-2 block text-sm font-medium"
        >
          Category name
        </label>

        <input
          id="category-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Groceries"
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 outline-none transition focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>

      <div>
        <label
          htmlFor="category-type"
          className="mb-2 block text-sm font-medium"
        >
          Category type
        </label>

        <select
          id="category-type"
          value={type}
          onChange={(event) => setType(event.target.value as CategoryType)}
          disabled={isSubmitting}
          className="w-full rounded-2xl border border-border bg-surface px-4 py-3 outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-60"
        >
          {CATEGORY_TYPES.map((item) => (
            <option key={item} value={item}>
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="rounded-2xl bg-danger/10 px-4 py-3 text-sm text-danger">
          {error}
        </div>
      )}

      {success && (
        <div className="rounded-2xl bg-success/10 px-4 py-3 text-sm text-success">
          Category created successfully.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-2xl bg-primary px-5 py-3 font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
      >
        {isSubmitting ? "Creating Category..." : "Create Category"}
      </button>
    </form>
  );
}
