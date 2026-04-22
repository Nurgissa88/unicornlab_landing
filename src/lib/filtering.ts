import type { Product, ProductComponentType, ProductRole } from "@/lib/types"

export interface ProductFilters {
  query: string
  brands: string[]
  roles: ProductRole[]
  componentTypes: ProductComponentType[]
  featuredOnly: boolean
  documentsOnly: boolean
}

export function normalizeText(value: string) {
  return value.trim().toLowerCase()
}

export function matchesSearch(product: Product, query: string) {
  const normalizedQuery = normalizeText(query)

  if (!normalizedQuery) {
    return true
  }

  const searchableParts = [
    product.title,
    product.brand,
    product.sku,
    product.shortDescription,
    product.description,
    ...product.attributes.map(
      (attribute) => `${attribute.label} ${attribute.value}`
    ),
  ]

  return searchableParts.some((part) =>
    normalizeText(part).includes(normalizedQuery)
  )
}

export function getAvailableBrands(products: Product[]) {
  return [...new Set(products.map((product) => product.brand))].sort((a, b) =>
    a.localeCompare(b, "ru")
  )
}

export function getAvailableRoles(products: Product[]) {
  return [...new Set(products.flatMap((product) => product.roles))].sort((a, b) =>
    a.localeCompare(b, "ru")
  )
}

export function getAvailableComponentTypes(products: Product[]) {
  return [
    ...new Set(products.flatMap((product) => product.componentTypes)),
  ].sort((a, b) => a.localeCompare(b, "ru"))
}

export function filterProducts(
  products: Product[],
  filters: ProductFilters
) {
  return products.filter((product) => {
    if (!matchesSearch(product, filters.query)) {
      return false
    }

    if (
      filters.brands.length > 0 &&
      !filters.brands.includes(product.brand)
    ) {
      return false
    }

    if (
      filters.roles.length > 0 &&
      !filters.roles.some((role) => product.roles.includes(role))
    ) {
      return false
    }

    if (
      filters.componentTypes.length > 0 &&
      !filters.componentTypes.some((type) =>
        product.componentTypes.includes(type)
      )
    ) {
      return false
    }

    if (filters.featuredOnly && !product.featured) {
      return false
    }

    if (filters.documentsOnly && (!product.documents || product.documents.length === 0)) {
      return false
    }

    return true
  })
}
