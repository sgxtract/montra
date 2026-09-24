import { LoginForm } from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="font-mono text-sm uppercase tracking-widest text-primary">
            Montra
          </p>

          <h1 className="mt-3 font-display text-4xl font-semibold">
            Welcome back
          </h1>

          <p className="mt-3 text-muted">Sign in to manage your money.</p>
        </div>

        <div className="rounded-3xl bg-surface-elevated p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
