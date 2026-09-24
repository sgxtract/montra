import { CategoryCard } from "@/features/categories/components/CategoryCard";
import { CategoriesPageContent } from "@/features/categories/components/CategoriesPageContent";
import { getCategories } from "@/features/categories/queries/getCategories";
import type { CategoryType } from "@/features/categories/types";

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <main className="mx-auto max-w-7xl p-6 lg:p-8">
      <CategoriesPageContent />

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            name={category.name}
            type={category.type as CategoryType}
          />
        ))}
      </div>
    </main>
  );
}
