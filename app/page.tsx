import { ThemeSwitcher } from "@/components/shared/ThemeSwitcher";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <div className="w-full max-w-xl text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-primary">
          FinanceOS
        </p>

        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight">
          Montra
        </h1>

        <p className="mt-4 text-lg text-muted">Know your money.</p>

        <div className="mt-8 flex justify-center">
          <ThemeSwitcher />
        </div>
      </div>
    </main>
  );
}
