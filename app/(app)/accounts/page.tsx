import { AccountCard } from "@/features/accounts/components/AccountCard";
import { AccountsPageContent } from "@/features/accounts/components/AccountsPageContent";
import { getAccounts } from "@/features/accounts/queries/getAccounts";

export default async function AccountsPage() {
  const accounts = await getAccounts();

  return (
    <main className="mx-auto max-w-7xl p-6 lg:p-8">
      <AccountsPageContent />

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => (
          <AccountCard key={account.id} account={account} />
        ))}
      </div>
    </main>
  );
}
