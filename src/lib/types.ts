export type CategorySlug = "equipment" | "reagents" | "consumables"

export interface Category {
  slug: CategorySlug
  title: string
  description: string
}

export interface ProductAttribute {
  label: string
  value: string
}

export interface ProductDocument {
  label: string
  href: string
}

export interface Product {
  id: string
  slug: string
  category: CategorySlug
  title: string
  brand: string
  sku: string
  shortDescription: string
  description: string
  image: string
  attributes: ProductAttribute[]
  documents?: ProductDocument[]
  featured?: boolean
}

export interface CartItem {
  productId: string
  title: string
  sku: string
  category: CategorySlug
  quantity: number
}

export interface RfqFormValues {
  fullName: string
  company?: string
  email: string
  phone?: string
  comment?: string
}

export interface RfqPayload {
  customer: RfqFormValues
  items: CartItem[]
}