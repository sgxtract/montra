import type { TransactionType } from "../types";

type TransactionCardProps = {
  type: TransactionType;
  amount: number;
  transactionDate: string;
  description: string | null;
  account: {
    name: string;
  } | null;
  category: {
    name: string;
  } | null;
  transferAccount: {
    name: string;
  } | null;
};

function formatAmount(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(amount);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-PH", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}

export function TransactionCard({
  type,
  amount,
  transactionDate,
  description,
  account,
  category,
  transferAccount,
}: TransactionCardProps) {
  const isIncome = type === "income";
  const isExpense = type === "expense";

  const amountPrefix = isIncome ? "+" : isExpense ? "-" : "";

  return (
    <article className="rounded-3xl bg-surface-elevated p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {formatDate(transactionDate)}
          </p>

          <h3 className="mt-2 truncate font-display text-lg font-semibold">
            {description || category?.name || "Transaction"}
          </h3>

          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-muted">
            {type === "transfer" ? (
              <>
                <span>{account?.name ?? "Unknown account"}</span>
                <span>→</span>
                <span>{transferAccount?.name ?? "Unknown account"}</span>
              </>
            ) : (
              <>
                <span>{account?.name ?? "Unknown account"}</span>
                <span>•</span>
                <span>{category?.name ?? "Uncategorized"}</span>
              </>
            )}
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p
            className={[
              "font-mono text-lg font-semibold",
              isIncome && "text-success",
              isExpense && "text-danger",
              type === "transfer" && "text-foreground",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            {amountPrefix}
            {formatAmount(amount)}
          </p>

          <span className="mt-1 inline-block text-xs capitalize text-muted">
            {type}
          </span>
        </div>
      </div>
    </article>
  );
}
