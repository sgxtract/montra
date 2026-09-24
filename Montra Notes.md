# Finance OS
**A personal finance management platform for tracking money, understanding spending, managing budgets, monitoring assets and liabilities, and eventually providing a unified financial view across web and mobile.**

                    ┌──────────────────────┐
                    │      FinanceOS       │
                    │   PostgreSQL/Supabase│
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 │                           │
        ┌────────▼────────┐         ┌────────▼────────┐
        │   Web Client    │         │  Mobile Client  │
        │ Next.js         │         │ Flutter         │
        │ Desktop/Web     │         │ iOS / Android   │
        └─────────────────┘         └─────────────────┘

```FinanceOS
│
├── Dashboard
├── Accounts
├── Transactions
├── Budgets
├── Categories
├── Goals
├── Debts
├── Assets
├── Net Worth
├── Reports
└── Settings```

# MONTRA FINAL STRUCTURE
montra/
│
├── app/
│   ├── (auth)/
│   ├── (dashboard)/
│   ├── api/
│   ├── globals.css
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   └── shared/
│
├── features/
│   ├── auth/
│   ├── dashboard/
│   ├── accounts/
│   ├── transactions/
│   ├── budgets/
│   ├── goals/
│   ├── reports/
│   ├── assets/
│   ├── liabilities/
│   └── settings/
│
├── lib/
│   ├── supabase/
│   ├── calculations/
│   ├── validations/
│   ├── constants/
│   ├── services/
│   └── utils/
│
├── types/
│   ├── database.ts
│   ├── finance.ts
│   └── api.ts
│
├── hooks/
│
├── config/
│
├── supabase/
│   ├── migrations/
│   ├── seed.sql
│   └── config.toml
│
├── tests/
│
├── public/
│
├── .env.local
├── .env.example
├── next.config.ts
├── tsconfig.json
├── package.json
└── README.md

Our actual design system is:

                 MONTRA UI
                     │
       ┌─────────────┼─────────────┐
       ↓             ↓             ↓
  Neumorphism   Glassmorphism  Skeuomorphism
   Foundation    Floating UI    Interaction
       │             │             │
     Cards        Modals        Buttons
     Inputs       Overlays      Toggles
     Surfaces     Toolbars      Controls