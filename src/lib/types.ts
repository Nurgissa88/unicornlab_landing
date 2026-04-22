export type CategorySlug = "instruments" | "spare-parts" | "consumables"
export type ProductRole =
  | "ВЭЖХ"
  | "ГХ"
  | "МС"
  | "ВЭЖХ/МС"
  | "ГХ/МС"
  | "ICP-MS"
  | "Спектрофотометрия"
  | "Пробоподготовка"
  | "Вакуум"

export type ProductComponentType =
  | "system"
  | "module"
  | "pump"
  | "pump-module"
  | "detector"
  | "autosampler"
  | "generator"
  | "heater"
  | "degasser"
  | "lamp"
  | "sensor"
  | "adapter"
  | "seal"
  | "seal-kit"
  | "valve"
  | "needle"
  | "holder"
  | "cable"
  | "tube-assembly"
  | "column"
  | "liner"
  | "syringe"
  | "vial"
  | "filter"
  | "cartridge"
  | "septa"
  | "ferrule"
  | "cap"
  | "insert"

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
  roles: ProductRole[]
  componentTypes: ProductComponentType[]
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
