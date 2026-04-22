import { readFileSync } from "node:fs"
import path from "node:path"

import { getComponentTypeLabel, getRoleLabel } from "@/lib/utils"
import type {
  CategorySlug,
  Product,
  ProductComponentType,
  ProductRole,
} from "@/lib/types"

type ProductRow = {
  category: string
  role?: string
  component_type?: string
  brand?: string
  part_number: string
  name: string
  description: string
  image_url: string
}

const DATA_FILE_PATH = path.join(process.cwd(), "data", "catalog.tsv")
const DEFAULT_BRAND = "Agilent"
const VALID_CATEGORIES: CategorySlug[] = [
  "instruments",
  "spare-parts",
  "consumables",
]
const VALID_ROLES: ProductRole[] = [
  "ВЭЖХ",
  "ГХ",
  "МС",
  "ВЭЖХ/МС",
  "ГХ/МС",
  "ICP-MS",
  "Спектрофотометрия",
  "Пробоподготовка",
  "Вакуум",
]
const VALID_COMPONENT_TYPES: ProductComponentType[] = [
  "system",
  "module",
  "pump",
  "pump-module",
  "detector",
  "autosampler",
  "generator",
  "heater",
  "degasser",
  "lamp",
  "sensor",
  "adapter",
  "seal",
  "seal-kit",
  "valve",
  "needle",
  "holder",
  "cable",
  "tube-assembly",
  "column",
  "liner",
  "syringe",
  "vial",
  "filter",
  "cartridge",
  "septa",
  "ferrule",
  "cap",
  "insert",
]
const ROLE_PRIORITY: ProductRole[] = [
  "ВЭЖХ/МС",
  "ГХ/МС",
  "ICP-MS",
  "ВЭЖХ",
  "ГХ",
  "МС",
  "Спектрофотометрия",
  "Пробоподготовка",
  "Вакуум",
]

function slugify(value: string) {
  const map: Record<string, string> = {
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "e",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sch",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
  }

  return value
    .toLowerCase()
    .split("")
    .map((char) => map[char] ?? char)
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function parseDelimited(text: string, delimiter: string) {
  const rows: string[][] = []
  let currentRow: string[] = []
  let currentField = ""
  let isInsideQuotes = false

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index]
    const nextChar = text[index + 1]

    if (char === '"') {
      if (isInsideQuotes && nextChar === '"') {
        currentField += '"'
        index += 1
      } else {
        isInsideQuotes = !isInsideQuotes
      }

      continue
    }

    if (char === delimiter && !isInsideQuotes) {
      currentRow.push(currentField)
      currentField = ""
      continue
    }

    if ((char === "\n" || char === "\r") && !isInsideQuotes) {
      if (char === "\r" && nextChar === "\n") {
        index += 1
      }

      currentRow.push(currentField)
      rows.push(currentRow)
      currentRow = []
      currentField = ""
      continue
    }

    currentField += char
  }

  if (currentField.length > 0 || currentRow.length > 0) {
    currentRow.push(currentField)
    rows.push(currentRow)
  }

  return rows.filter((row) => row.some((cell) => cell.trim().length > 0))
}

function parseTsv(text: string): ProductRow[] {
  const [headerRow, ...dataRows] = parseDelimited(text, "\t")

  if (!headerRow) {
    return []
  }

  const headers = headerRow.map((cell) => cell.trim())

  return dataRows.map((row) => {
    const record = Object.fromEntries(
      headers.map((header, index) => [header, row[index] ?? ""])
    )

    return {
      category: record.category ?? "",
      role: record.role ?? "",
      component_type: record.component_type ?? "",
      brand: record.brand ?? "",
      part_number: record.part_number ?? "",
      name: record.name ?? "",
      description: record.description ?? "",
      image_url: record.image_url ?? "",
    }
  })
}

function normalizeWhitespace(value: string) {
  return value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim()
}

function normalizeImageUrl(value: string) {
  const normalized = normalizeWhitespace(value)

  if (!normalized) {
    return normalized
  }

  if (normalized.includes("/stencil/200x200/")) {
    return normalized.replace("/stencil/200x200/", "/stencil/1280x1280/")
  }

  return normalized
}

function normalizeBrand(
  rawBrand: string,
  name: string,
  description: string
) {
  const explicitBrand = normalizeWhitespace(rawBrand)

  if (explicitBrand) {
    return explicitBrand
  }

  const haystack = `${name} ${description}`.toLowerCase()

  const watersKeywords = [
    "waters",
    "acquity",
    "alliance",
    "xevo",
    "synapt",
    "vion",
    "patrol",
    "ionkey",
    "nanoacquity",
    "empower",
  ]

  const agilentKeywords = [
    "agilent",
    "intuvo",
    "infinity",
    "1260",
    "1290",
    "8890",
    "8860",
    "5977",
    "5975",
    "q-tof",
  ]

  if (watersKeywords.some((keyword) => haystack.includes(keyword))) {
    return "Waters"
  }

  if (agilentKeywords.some((keyword) => haystack.includes(keyword))) {
    return "Agilent"
  }

  return DEFAULT_BRAND
}

function stripMarketingTail(value: string) {
  const tailMarkers = [
    "Technical References",
    "Brochures",
    "Download Manuals",
    "Download Blogs",
    "Blogs",
    "Manuals",
  ]

  let result = value

  tailMarkers.forEach((marker) => {
    const markerIndex = result.indexOf(marker)

    if (markerIndex !== -1) {
      result = result.slice(0, markerIndex).trim()
    }
  })

  return result
}

function makeShortDescription(value: string) {
  const sentences = value
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter(Boolean)

  const firstSentence = sentences[0] ?? value

  if (firstSentence.length <= 165) {
    return firstSentence
  }

  return `${firstSentence.slice(0, 162).trimEnd()}...`
}

function normalizeDescription(value: string) {
  const cleaned = stripMarketingTail(normalizeWhitespace(value))

  if (cleaned.length <= 900) {
    return cleaned
  }

  return `${cleaned.slice(0, 897).trimEnd()}...`
}

function normalizeCategory(rawCategory: string, name: string, description: string): CategorySlug {
  const normalizedRawCategory = normalizeWhitespace(rawCategory).toLowerCase() as CategorySlug

  if (VALID_CATEGORIES.includes(normalizedRawCategory)) {
    return normalizedRawCategory
  }

  const haystack = `${rawCategory} ${name} ${description}`.toLowerCase()

  const sparePartKeywords = [
    "replacement",
    "rebuild",
    "repair",
    "spare",
    "seal",
    "piston",
    "valve",
    "capsule",
    "assembly",
    "filter element",
    "module",
    "kit",
    "degasser",
    "part",
  ]

  const equipmentKeywords = [
    "system",
    "instrumentation",
    "heater",
    "oven",
    "generator",
    "technology",
    "pump",
    "station",
    "degasser",
  ]

  if (sparePartKeywords.some((keyword) => haystack.includes(keyword))) {
    return "spare-parts"
  }

  if (equipmentKeywords.some((keyword) => haystack.includes(keyword))) {
    return "instruments"
  }

  return "consumables"
}

function inferRoles(
  name: string,
  description: string
): ProductRole[] {
  const haystack = `${name} ${description}`.toLowerCase()
  const roles = new Set<ProductRole>()

  const hasAny = (keywords: string[]) =>
    keywords.some((keyword) => haystack.includes(keyword))

  if (
    hasAny([
      "lc/ms",
      "lc-ms",
      "вэжх/мс",
      "q-tof",
      "qtof",
      "triple quadrupole lc",
      "quadrupole time-of-flight lc",
      "6495",
      "6545",
      "6550",
    ])
  ) {
    roles.add("ВЭЖХ/МС")
  }

  if (
    hasAny([
      "gc/ms",
      "gc-ms",
      "гх/мс",
      "msd",
      "mass selective detector",
      "5975",
      "5977",
      "7000",
      "7010",
    ])
  ) {
    roles.add("ГХ/МС")
  }

  if (
    hasAny([
      "icp-ms",
      "icp ms",
      "ипмс",
      "7850",
      "7900",
      "8800",
      "8900",
    ])
  ) {
    roles.add("ICP-MS")
  }

  if (
    hasAny([
      "вэжх",
      "hplc",
      "uhplc",
      "lc ",
      "lc-",
      "liquid chromat",
      "infinity",
      "1260",
      "1290",
      "zorbax",
      "poroshell",
    ])
  ) {
    roles.add("ВЭЖХ")
  }

  if (
    hasAny([
      "гх",
      "gc ",
      "gc-",
      "micro gc",
      "газов",
      "газовая хромат",
      "8890",
      "8860",
      "990 micro gc",
    ])
  ) {
    roles.add("ГХ")
  }

  if (
    hasAny([
      " масс",
      "mass spect",
      "масс-спект",
      "triple quad",
      "quadrupole",
      "tof",
      "orbitrap",
    ])
  ) {
    roles.add("МС")
  }

  if (
    hasAny([
      "spectrophot",
      "uv-vis",
      "uv vis",
      "fluorescence",
      "dad detector",
      "vwd",
      "спектрофот",
      "детектор диодно-матричный",
    ])
  ) {
    roles.add("Спектрофотометрия")
  }

  if (
    hasAny([
      "bond elut",
      "sample prep",
      "quechers",
      "captiva",
      "solid phase extraction",
      "spex",
      "пробоподготов",
    ])
  ) {
    roles.add("Пробоподготовка")
  }

  if (
    hasAny([
      "vacuum",
      "вакуум",
      "pump",
      "насос",
      "foreline",
      "turbo",
      "roughing",
    ])
  ) {
    roles.add("Вакуум")
  }

  if (roles.size === 0) {
    return []
  }

  return [...roles].sort((a, b) => {
    const aIndex = ROLE_PRIORITY.indexOf(a)
    const bIndex = ROLE_PRIORITY.indexOf(b)

    if (aIndex === -1) {
      return 1
    }

    if (bIndex === -1) {
      return -1
    }

    return aIndex - bIndex
  })
}

function inferComponentTypes(
  name: string,
  description: string,
  category: CategorySlug
): ProductComponentType[] {
  const haystack = `${name} ${description}`.toLowerCase()
  const types = new Set<ProductComponentType>()

  const hasAny = (keywords: string[]) =>
    keywords.some((keyword) => haystack.includes(keyword))

  if (hasAny(["system", "система", "instrument"])) {
    types.add("system")
  }
  if (hasAny(["pump module", "pump-module", "насосн"])) {
    types.add("pump-module")
  }
  if (hasAny(["pump", "насос"])) {
    types.add("pump")
  }
  if (hasAny(["module", "модул"])) {
    types.add("module")
  }
  if (hasAny(["detector", "детектор", "dad", "fid", "msd"])) {
    types.add("detector")
  }
  if (hasAny(["autosampler", "автосамплер", "sampler"])) {
    types.add("autosampler")
  }
  if (hasAny(["generator", "генератор"])) {
    types.add("generator")
  }
  if (hasAny(["heater", "нагрев", "oven", "печь"])) {
    types.add("heater")
  }
  if (hasAny(["degasser", "дегаз"])) {
    types.add("degasser")
  }
  if (hasAny(["lamp", "лампа", "flash lamp", "tungsten"])) {
    types.add("lamp")
  }
  if (hasAny(["sensor", "датчик"])) {
    types.add("sensor")
  }
  if (hasAny(["adapter", "адаптер"])) {
    types.add("adapter")
  }
  if (hasAny(["seal kit", "seal-kit", "комплект уплотн"])) {
    types.add("seal-kit")
  }
  if (hasAny(["seal", "уплотнен"])) {
    types.add("seal")
  }
  if (hasAny(["valve", "клапан"])) {
    types.add("valve")
  }
  if (hasAny(["needle", "игла"])) {
    types.add("needle")
  }
  if (hasAny(["holder", "держател"])) {
    types.add("holder")
  }
  if (hasAny(["cable", "кабель"])) {
    types.add("cable")
  }
  if (hasAny(["tube assembly", "assembly", "сборка труб", "tube"])) {
    types.add("tube-assembly")
  }
  if (hasAny(["column", "колонк"])) {
    types.add("column")
  }
  if (hasAny(["liner", "лайнер"])) {
    types.add("liner")
  }
  if (hasAny(["syringe", "шприц"])) {
    types.add("syringe")
  }
  if (hasAny(["vial", "виал"])) {
    types.add("vial")
  }
  if (hasAny(["filter", "фильтр"])) {
    types.add("filter")
  }
  if (hasAny(["cartridge", "картридж", "bond elut"])) {
    types.add("cartridge")
  }
  if (hasAny(["septa", "septa", "септ"])) {
    types.add("septa")
  }
  if (hasAny(["ferrule", "феррул"])) {
    types.add("ferrule")
  }
  if (hasAny([" cap", "крышк"])) {
    types.add("cap")
  }
  if (hasAny(["insert", "вставк"])) {
    types.add("insert")
  }

  if (types.size === 0) {
    if (category === "instruments") {
      return ["system"]
    }

    if (category === "spare-parts") {
      return ["module"]
    }

    return ["cartridge"]
  }

  return [...types]
}

function parseListValue(value: string) {
  return normalizeWhitespace(value)
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean)
}

function normalizeRoles(rawRole: string, name: string, description: string): ProductRole[] {
  const explicitRoles = parseListValue(rawRole).filter((item): item is ProductRole =>
    VALID_ROLES.includes(item as ProductRole)
  )

  if (explicitRoles.length > 0) {
    return explicitRoles.sort(
      (a, b) => ROLE_PRIORITY.indexOf(a) - ROLE_PRIORITY.indexOf(b)
    )
  }

  return inferRoles(name, description)
}

function normalizeComponentTypes(
  rawComponentType: string,
  name: string,
  description: string,
  category: CategorySlug
): ProductComponentType[] {
  const explicitTypes = parseListValue(rawComponentType).filter(
    (item): item is ProductComponentType =>
      VALID_COMPONENT_TYPES.includes(item as ProductComponentType)
  )

  if (explicitTypes.length > 0) {
    return explicitTypes
  }

  return inferComponentTypes(name, description, category)
}

function buildProducts(rows: ProductRow[]): Product[] {
  const idUsage = new Map<string, number>()
  const slugUsage = new Map<string, number>()

  return rows
    .filter((row) => row.name.trim())
    .map((row, index) => {
      const cleanedName = normalizeWhitespace(row.name)
      const cleanedDescription = normalizeDescription(row.description)
      const category = normalizeCategory(
        row.category,
        cleanedName,
        cleanedDescription
      )
      const roles = normalizeRoles(
        row.role ?? "",
        cleanedName,
        cleanedDescription
      )
      const componentTypes = normalizeComponentTypes(
        row.component_type ?? "",
        cleanedName,
        cleanedDescription,
        category
      )
      const partNumber = normalizeWhitespace(row.part_number)
      const brand = normalizeBrand(
        row.brand ?? "",
        cleanedName,
        cleanedDescription
      )
      const partSlug = slugify(partNumber)
      const shortNameSlug = slugify(cleanedName).slice(0, 48)
      const slugBase =
        [partSlug, shortNameSlug].filter(Boolean).join("-") ||
        `${shortNameSlug || "product"}-${index + 1}`
      const idBase = partSlug || shortNameSlug || `product-${index + 1}`
      const nextIdCount = (idUsage.get(idBase) ?? 0) + 1
      const nextSlugCount = (slugUsage.get(slugBase) ?? 0) + 1

      idUsage.set(idBase, nextIdCount)
      slugUsage.set(slugBase, nextSlugCount)

      const uniqueId =
        nextIdCount === 1 ? idBase : `${idBase}-${nextIdCount}`
      const uniqueSlug =
        nextSlugCount === 1 ? slugBase : `${slugBase}-${nextSlugCount}`

      return {
        id: uniqueId,
        slug: uniqueSlug,
        category,
        roles,
        componentTypes,
        title: cleanedName,
        brand,
        sku: partNumber,
        shortDescription: makeShortDescription(cleanedDescription || cleanedName),
        description: cleanedDescription || cleanedName,
        image: normalizeImageUrl(row.image_url),
        attributes: [
          ...(roles.length > 0
            ? [{ label: "Направление", value: roles.map(getRoleLabel).join(", ") }]
            : []),
          {
            label: "Тип позиции",
            value: componentTypes.map(getComponentTypeLabel).join(", "),
          },
          { label: "Исходная категория", value: normalizeWhitespace(row.category) },
          { label: "Бренд", value: brand },
        ],
        documents: undefined,
        featured: false,
      }
    })
}

const rawTsv = readFileSync(DATA_FILE_PATH, "utf8")
const rows = parseTsv(rawTsv)

export const products: Product[] = buildProducts(rows)
