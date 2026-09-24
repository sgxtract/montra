import type { Account } from "../types";

type AccountCardProps = {
  account: Account;
};

export function AccountCard({ account }: AccountCardProps) {
  const isLiability = account.account_class === "liability";

  return (
    <article className="rounded-3xl bg-surface-elevated p-6 shadow-sm transition-transform duration-200 hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-wider text-muted">
            {account.type.replace("_", " ")}
          </p>

          <h2 className="mt-2 font-display text-xl font-semibold">
            {account.name}
          </h2>
        </div>

        <span
          className={[
            "rounded-full px-3 py-1 text-xs font-medium",
            isLiability
              ? "bg-danger/10 text-danger"
              : "bg-success/10 text-success",
          ].join(" ")}
        >
          {isLiability ? "Liability" : "Asset"}
        </span>
      </div>

      <div className="mt-8">
        <p className="font-mono text-sm text-muted">Currency</p>

        <p className="mt-1 font-mono text-lg">{account.currency}</p>
      </div>
    </article>
  );
}
