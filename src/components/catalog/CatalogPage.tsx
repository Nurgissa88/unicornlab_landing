"use client"

import { useMemo, useState } from "react"
import { Link } from "next-view-transitions"

import FiltersSidebar from "@/components/catalog/FiltersSidebar"
import SearchBar from "@/components/catalog/SearchBar"
import { categories } from "@/content/categories"
import {
  filterProducts,
  getAvailableBrands,
  type ProductFilters,
} from "@/lib/filtering"
import type { Category, Product } from "@/lib/types"

import Badge from "@/components/ui/Badge"
import ProductGrid from "@/components/catalog/ProductGrid"

interface CatalogPageProps {
  currentCategory: Category
  products: Product[]
}

const initialFilters: ProductFilters = {
  query: "",
  brands: [],
  featuredOnly: false,
  documentsOnly: false,
}

function ActiveFilterChip({
  label,
  onRemove,
}: {
  label: string
  onRemove: () => void
}) {
  return (
    <button
      type="button"
      onClick={onRemove}
      className="inline-flex min-h-10 items-center gap-2 rounded-full border border-[var(--border)] bg-white px-4 text-sm font-medium text-[var(--foreground)] shadow-[0_6px_20px_rgba(15,23,42,0.05)] transition hover:-translate-y-0.5 hover:border-[var(--primary)]/30 hover:bg-[var(--surface-soft)]"
    >
      <span>{label}</span>
      <span className="text-[var(--primary)]">×</span>
    </button>
  )
}

export default function CatalogPage({
  currentCategory,
  products,
}: CatalogPageProps) {
  const [filters, setFilters] = useState<ProductFilters>(initialFilters)

  const availableBrands = useMemo(() => {
    return getAvailableBrands(products)
  }, [products])

  const filteredProducts = useMemo(() => {
    return filterProducts(products, filters)
  }, [products, filters])

  const handleToggleBrand = (brand: string) => {
    setFilters((prev) => {
      const alreadySelected = prev.brands.includes(brand)

      return {
        ...prev,
        brands: alreadySelected
          ? prev.brands.filter((item) => item !== brand)
          : [...prev.brands, brand],
      }
    })
  }

  const handleResetFilters = () => {
    setFilters(initialFilters)
  }

  const hasActiveFilters =
    filters.query.trim().length > 0 ||
    filters.brands.length > 0 ||
    filters.featuredOnly ||
    filters.documentsOnly

  return (
    <>
      <section className="section-shell">
        <div className="app-container">
          <div className="section-panel px-8 py-10 md:px-10 md:py-12">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <Link
                  href="/"
                  className="text-sm font-medium text-[var(--primary)] transition hover:opacity-80"
                >
                  ← На главную
                </Link>

                <p className="mt-5 text-sm font-medium uppercase tracking-[0.08em] muted-text">
                  Каталог
                </p>

                <h1 className="mt-2 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
                  {currentCategory.title}
                </h1>

                <p className="mt-4 max-w-2xl text-base leading-7 muted-text">
                  {currentCategory.description}
                </p>
              </div>

              <Badge className="w-fit">
                {filteredProducts.length} позиций
              </Badge>
            </div>

            <div className="mt-8">
              <SearchBar
                value={filters.query}
                onChange={(value) =>
                  setFilters((prev) => ({ ...prev, query: value }))
                }
                placeholder="Поиск по названию, бренду, артикулу или характеристикам"
              />
            </div>

            {hasActiveFilters ? (
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {filters.query.trim() ? (
                  <ActiveFilterChip
                    label={`Поиск: ${filters.query}`}
                    onRemove={() =>
                      setFilters((prev) => ({ ...prev, query: "" }))
                    }
                  />
                ) : null}

                {filters.brands.map((brand) => (
                  <ActiveFilterChip
                    key={brand}
                    label={brand}
                    onRemove={() => handleToggleBrand(brand)}
                  />
                ))}

                {filters.featuredOnly ? (
                  <ActiveFilterChip
                    label="Рекомендуемые"
                    onRemove={() =>
                      setFilters((prev) => ({
                        ...prev,
                        featuredOnly: false,
                      }))
                    }
                  />
                ) : null}

                {filters.documentsOnly ? (
                  <ActiveFilterChip
                    label="С документами"
                    onRemove={() =>
                      setFilters((prev) => ({
                        ...prev,
                        documentsOnly: false,
                      }))
                    }
                  />
                ) : null}

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="ml-1 text-sm font-medium text-[var(--primary)] transition hover:opacity-80"
                >
                  Сбросить всё
                </button>
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="app-container">
          <div className="mb-8 flex flex-wrap gap-3">
            {categories.map((item) => {
              const isActive = item.slug === currentCategory.slug

              return (
                <Link
                  key={item.slug}
                  href={`/catalog/${item.slug}`}
                  className={`ui-button ${
                    isActive ? "ui-button-primary" : "ui-button-secondary"
                  }`}
                >
                  {item.title}
                </Link>
              )
            })}
          </div>

          <div className="grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
            <FiltersSidebar
              brands={availableBrands}
              selectedBrands={filters.brands}
              featuredOnly={filters.featuredOnly}
              documentsOnly={filters.documentsOnly}
              onToggleBrand={handleToggleBrand}
              onFeaturedChange={(value) =>
                setFilters((prev) => ({ ...prev, featuredOnly: value }))
              }
              onDocumentsChange={(value) =>
                setFilters((prev) => ({ ...prev, documentsOnly: value }))
              }
              onReset={handleResetFilters}
            />

            {filteredProducts.length === 0 ? (
              <div className="surface-card p-8">
                <h2 className="text-2xl font-semibold tracking-[-0.02em]">
                  Ничего не найдено
                </h2>
                <p className="mt-3 text-sm leading-6 muted-text">
                  Попробуйте изменить поисковый запрос, снять часть фильтров
                  или сбросить их полностью.
                </p>

                {hasActiveFilters ? (
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="ui-button ui-button-secondary mt-6"
                  >
                    Сбросить фильтры
                  </button>
                ) : null}
              </div>
            ) : (
              <ProductGrid products={filteredProducts} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}