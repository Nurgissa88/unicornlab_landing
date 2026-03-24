import { categories } from "@/content/categories"
import type { CategorySlug } from "@/lib/types"

export function getCategoryTitle(slug: CategorySlug | string) {
  return categories.find((category) => category.slug === slug)?.title ?? slug
}