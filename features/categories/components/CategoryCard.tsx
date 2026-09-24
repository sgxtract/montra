import type { CategoryType } from "../types";

type CategoryCardProps = {
  name: string;
  type: CategoryType;
};

export function CategoryCard({ name, type }: CategoryCardProps) {
  const isIncome = type === "income";

  return (
    <article className="rounded-3xl bg-surface-elevated p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            Category
          </p>

          <h2 className="mt-2 font-display text-xl font-semibold">{name}</h2>
        </div>

        <span
          className={[
            "rounded-full px-3 py-1 text-xs font-medium",
            isIncome
              ? "bg-success/10 text-success"
              : "bg-danger/10 text-danger",
          ].join(" ")}
        >
          {isIncome ? "Income" : "Expense"}
        </span>
      </div>

      <div className="mt-8">
        <p className="font-mono text-sm text-muted">Type</p>

        <p className="mt-1 font-mono text-lg capitalize">{type}</p>
      </div>
    </article>
  );
}
