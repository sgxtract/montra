"use client";

type AddCategoryButtonProps = {
  onClick?: () => void;
};

export function AddCategoryButton({ onClick }: AddCategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-2xl bg-primary px-5 py-3 font-medium text-primary-foreground shadow-sm transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
    >
      + Add Category
    </button>
  );
}
