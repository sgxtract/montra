import { getAccounts } from "@/features/accounts/queries/getAccounts";
import { getCategories } from "@/features/categories/queries/getCategories";
import { TransactionList } from "@/features/transactions/components/TransactionList";
import { TransactionsPageContent } from "@/features/transactions/components/TransactionsPageContent";
import { getTransactions } from "@/features/transactions/queries/getTransactions";

export default async function TransactionsPage() {
  const [transactions, accounts, categories] = await Promise.all([
    getTransactions(),
    getAccounts(),
    getCategories(),
  ]);

  return (
    <main className="mx-auto max-w-7xl p-6 lg:p-8">
      <TransactionsPageContent accounts={accounts} categories={categories} />

      <section className="mt-8">
        <div className="mb-4">
          <h2 className="font-display text-2xl font-semibold">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-muted">
            Your latest financial activity.
          </p>
        </div>

        <TransactionList transactions={transactions} />
      </section>
    </main>
  );
}
