import { TransactionCard } from "./TransactionCard";
import type { TransactionType } from "../types";

type TransactionListProps = {
  transactions: {
    id: string;
    type: TransactionType;
    amount: number;
    transaction_date: string;
    description: string | null;
    account: {
      name: string;
    } | null;
    category: {
      name: string;
    } | null;
    transfer_account: {
      name: string;
    } | null;
  }[];
};

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-3xl bg-surface-elevated p-10 text-center shadow-sm">
        <p className="font-display text-lg font-semibold">
          No transactions yet
        </p>

        <p className="mt-2 text-sm text-muted">
          Add your first income, expense, or transfer.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          type={transaction.type}
          amount={transaction.amount}
          transactionDate={transaction.transaction_date}
          description={transaction.description}
          account={transaction.account}
          category={transaction.category}
          transferAccount={transaction.transfer_account}
        />
      ))}
    </div>
  );
}
