"use client";

import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const themes = [
  {
    value: "light",
    label: "Light",
  },
  {
    value: "dark",
    label: "Dark",
  },
  {
    value: "system",
    label: "System",
  },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) {
    return <div className="h-10 w-56 rounded-xl bg-surface-elevated" />;
  }

  return (
    <div className="flex items-center gap-1 rounded-xl bg-surface-elevated p-1 shadow-sm">
      {themes.map((item) => {
        const isActive = theme === item.value;

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setTheme(item.value)}
            className={[
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted hover:text-foreground",
            ].join(" ")}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
