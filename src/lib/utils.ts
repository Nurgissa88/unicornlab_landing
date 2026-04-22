import { categories } from "@/content/categories"
import type {
  CategorySlug,
  ProductComponentType,
  ProductRole,
} from "@/lib/types"

export const PRODUCT_ROLE_LABELS: Record<ProductRole, string> = {
  "ВЭЖХ": "ВЭЖХ",
  "ГХ": "ГХ",
  "МС": "МС",
  "ВЭЖХ/МС": "ВЭЖХ/МС",
  "ГХ/МС": "ГХ/МС",
  "ICP-MS": "ICP-MS",
  "Спектрофотометрия": "Спектрофотометрия",
  "Пробоподготовка": "Пробоподготовка",
  "Вакуум": "Вакуум",
}

export const PRODUCT_COMPONENT_TYPE_LABELS: Record<ProductComponentType, string> = {
  "system": "Системы",
  "module": "Модули",
  "pump": "Насосы",
  "pump-module": "Насосные модули",
  "detector": "Детекторы",
  "autosampler": "Автосамплеры",
  "generator": "Генераторы",
  "heater": "Нагреватели",
  "degasser": "Дегазаторы",
  "lamp": "Лампы",
  "sensor": "Датчики",
  "adapter": "Адаптеры",
  "seal": "Уплотнения",
  "seal-kit": "Комплекты уплотнений",
  "valve": "Клапаны",
  "needle": "Иглы",
  "holder": "Держатели",
  "cable": "Кабели",
  "tube-assembly": "Трубки и сборки",
  "column": "Колонки",
  "liner": "Лайнеры",
  "syringe": "Шприцы",
  "vial": "Виалы",
  "filter": "Фильтры",
  "cartridge": "Картриджи",
  "septa": "Септы",
  "ferrule": "Феррулы",
  "cap": "Крышки",
  "insert": "Вставки",
}

export function getCategoryTitle(slug: CategorySlug | string) {
  return categories.find((category) => category.slug === slug)?.title ?? slug
}

export function getRoleLabel(role: ProductRole | string) {
  return PRODUCT_ROLE_LABELS[role as ProductRole] ?? role
}

export function getComponentTypeLabel(type: ProductComponentType | string) {
  return PRODUCT_COMPONENT_TYPE_LABELS[type as ProductComponentType] ?? type
}
