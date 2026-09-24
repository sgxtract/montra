import { createClient } from "@/lib/supabase/server";
import { LogoutButton } from "@/features/auth/components/LogoutButton";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-background p-6 text-foreground">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-sm text-primary">MONTRA</p>

        <h1 className="mt-2 font-display text-4xl font-semibold">Dashboard</h1>

        <p className="mt-3 text-muted">Signed in as {user?.email}</p>

        <LogoutButton />
      </div>
    </main>
  );
}
