import type { CategorySlug, Product } from "@/lib/types"

type ProductSeed = {
  title: string
  brand: string
  shortDescription: string
  description: string
  attributes: Array<{ label: string; value: string }>
  documentLabel?: string
}

const VARIANT_SUFFIXES = ["Basic", "Standard", "Plus", "Pro", "X"]

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

function makeProducts(
  category: CategorySlug,
  prefix: string,
  seeds: ProductSeed[]
): Product[] {
  const items: Product[] = []

  seeds.forEach((seed, seedIndex) => {
    VARIANT_SUFFIXES.forEach((variant, variantIndex) => {
      const serial = seedIndex * VARIANT_SUFFIXES.length + variantIndex + 1
      const padded = String(serial).padStart(3, "0")

      items.push({
        id: `${prefix}-${padded}`,
        slug: slugify(`${seed.title}-${variant}`),
        category,
        title: `${seed.title} ${variant}`,
        brand: seed.brand,
        sku: `${prefix.toUpperCase()}-${padded}-${variant.toUpperCase()}`,
        shortDescription: seed.shortDescription,
        description: `${seed.description} Версия ${variant} подходит для задач категории "${category}" и может использоваться как демонстрационная позиция каталога.`,
        image: `/images/products/${category}-${((seedIndex % 6) + 1)}.jpg`,
        attributes: [
          ...seed.attributes,
          { label: "Версия", value: variant },
          { label: "Серия", value: `${seed.brand} ${202 + seedIndex}` },
        ],
        documents: seed.documentLabel
          ? [
              {
                label: seed.documentLabel,
                href: `/docs/${slugify(seed.title)}-${variant.toLowerCase()}.pdf`,
              },
            ]
          : undefined,
        featured: serial % 7 === 0,
      })
    })
  })

  return items
}

const equipmentSeeds: ProductSeed[] = [
  {
    title: "qPCR система QuantGene X",
    brand: "QuantGene",
    shortDescription:
      "Компактная система для ПЦР в реальном времени с высокой чувствительностью.",
    description:
      "Система предназначена для молекулярно-биологических и диагностических лабораторий, обеспечивает стабильный температурный контроль и удобное программное управление.",
    attributes: [
      { label: "Формат", value: "96 лунок" },
      { label: "Тип детекции", value: "Real-time PCR" },
      { label: "Применение", value: "Молекулярная биология" },
    ],
    documentLabel: "Datasheet",
  },
  {
    title: "Микроцентрифуга SpinMax",
    brand: "SpinMax",
    shortDescription:
      "Настольная микроцентрифуга для рутинной подготовки образцов.",
    description:
      "Подходит для ежедневной работы с пробирками малого объёма и стандартных протоколов подготовки образцов.",
    attributes: [
      { label: "Макс. скорость", value: "16 000 rpm" },
      { label: "Вместимость", value: "24 × 1.5/2.0 мл" },
      { label: "Тип", value: "Настольная" },
    ],
    documentLabel: "Datasheet",
  },
  {
    title: "Спектрофотометр NanoSpec",
    brand: "NanoSpec",
    shortDescription:
      "Прибор для быстрого измерения концентрации ДНК, РНК и белка.",
    description:
      "Компактный спектрофотометр с малым объёмом пробы для оценки чистоты и концентрации нуклеиновых кислот и белков.",
    attributes: [
      { label: "Диапазон", value: "190–840 нм" },
      { label: "Объём пробы", value: "1–2 µL" },
      { label: "Применение", value: "DNA/RNA/Protein" },
    ],
    documentLabel: "Datasheet",
  },
  {
    title: "Вортекс V-Mix",
    brand: "LabMix",
    shortDescription:
      "Надёжный вортекс для перемешивания образцов в пробирках.",
    description:
      "Прибор предназначен для быстрого перемешивания жидкостей в лабораторной посуде и повседневной рутинной работы.",
    attributes: [
      { label: "Скорость", value: "Переменная" },
      { label: "Режим", value: "Непрерывный / касанием" },
      { label: "Тип", value: "Компактный" },
    ],
    documentLabel: "Datasheet",
  },
  {
    title: "Термошейкер HeatMix",
    brand: "BioShake",
    shortDescription:
      "Комбинированный термошейкер для микропланшетов и пробирок.",
    description:
      "Позволяет одновременно нагревать и перемешивать образцы в рамках различных лабораторных протоколов.",
    attributes: [
      { label: "Температура", value: "До 100 °C" },
      { label: "Скорость", value: "300–1500 rpm" },
      { label: "Формат", value: "Планшеты / пробирки" },
    ],
    documentLabel: "Datasheet",
  },
  {
    title: "Ламинарный бокс CleanAir",
    brand: "CleanAir",
    shortDescription:
      "Рабочая станция для защиты образцов при чувствительных манипуляциях.",
    description:
      "Используется для создания контролируемой рабочей зоны при операциях, чувствительных к контаминации.",
    attributes: [
      { label: "Класс", value: "II" },
      { label: "Ширина", value: "1200 мм" },
      { label: "Применение", value: "Асептическая работа" },
    ],
    documentLabel: "Specification",
  },
  {
    title: "CO2 инкубатор CellGrow",
    brand: "CellGrow",
    shortDescription:
      "Инкубатор для клеточных культур с контролем температуры и CO2.",
    description:
      "Поддерживает стабильные условия культивирования клеток и удобен для лабораторий клеточной биологии.",
    attributes: [
      { label: "Объём", value: "170 л" },
      { label: "CO2", value: "0–20%" },
      { label: "Температура", value: "До 60 °C" },
    ],
    documentLabel: "Datasheet",
  },
  {
    title: "Гомогенизатор TissuePrep",
    brand: "TissuePrep",
    shortDescription:
      "Система для механической подготовки тканей и биологических образцов.",
    description:
      "Используется для быстрой гомогенизации образцов перед экстракцией нуклеиновых кислот и белков.",
    attributes: [
      { label: "Формат", value: "Пробирки 2 мл" },
      { label: "Режим", value: "Импульсный" },
      { label: "Применение", value: "Подготовка тканей" },
    ],
    documentLabel: "Datasheet",
  },
  {
    title: "Электрофорезная камера GelRun",
    brand: "GelRun",
    shortDescription:
      "Компактная камера для горизонтального электрофореза.",
    description:
      "Предназначена для разделения ДНК- и РНК-фрагментов в агарозном геле в рутинных лабораторных задачах.",
    attributes: [
      { label: "Формат", value: "Горизонтальный" },
      { label: "Тип геля", value: "Агарозный" },
      { label: "Применение", value: "Электрофорез нуклеиновых кислот" },
    ],
    documentLabel: "Specification",
  },
  {
    title: "Автоматический дозатор Pipetron",
    brand: "Pipetron",
    shortDescription:
      "Электронный дозатор для точного и повторяемого отбора проб.",
    description:
      "Подходит для серийных операций дозирования и повышает воспроизводимость лабораторных процессов.",
    attributes: [
      { label: "Диапазон", value: "0.5–1000 µL" },
      { label: "Тип", value: "Электронный" },
      { label: "Применение", value: "Рутинное дозирование" },
    ],
    documentLabel: "Datasheet",
  },
]

const reagentSeeds: ProductSeed[] = [
  {
    title: "PCR Master Mix Probe",
    brand: "BioAssay",
    shortDescription:
      "Готовая мастер-смесь для постановки qPCR с зондами.",
    description:
      "Предназначена для высокочувствительной амплификации с использованием зондов в исследовательских и прикладных лабораториях.",
    attributes: [
      { label: "Формат", value: "2× Master Mix" },
      { label: "Объём", value: "1 мл" },
      { label: "Хранение", value: "-20 °C" },
    ],
    documentLabel: "SDS",
  },
  {
    title: "RNA Extraction Kit Column",
    brand: "GenePure",
    shortDescription:
      "Набор для выделения РНК на колонках из биологических образцов.",
    description:
      "Обеспечивает воспроизводимое выделение РНК и подходит для downstream-анализа.",
    attributes: [
      { label: "Формат", value: "Spin columns" },
      { label: "Выход", value: "50 prep" },
      { label: "Хранение", value: "Комнатная температура" },
    ],
    documentLabel: "SDS",
  },
  {
    title: "DNA Cleanup Buffer Set",
    brand: "CleanSeq",
    shortDescription:
      "Буферы для очистки ДНК после ферментативных реакций.",
    description:
      "Используются в рутинных молекулярно-биологических протоколах для подготовки образцов к следующему этапу анализа.",
    attributes: [
      { label: "Формат", value: "Buffer set" },
      { label: "Применение", value: "Очистка ДНК" },
      { label: "Хранение", value: "Комнатная температура" },
    ],
    documentLabel: "SDS",
  },
  {
    title: "Reverse Transcription Kit",
    brand: "cDNA First",
    shortDescription:
      "Набор для синтеза кДНК из РНК-матрицы.",
    description:
      "Используется для подготовки образцов к дальнейшему анализу экспрессии генов и постановке qPCR.",
    attributes: [
      { label: "Формат", value: "Complete kit" },
      { label: "Применение", value: "Синтез кДНК" },
      { label: "Хранение", value: "-20 °C" },
    ],
    documentLabel: "SDS",
  },
  {
    title: "Protein Lysis Buffer",
    brand: "ProteoLab",
    shortDescription:
      "Лизирующий буфер для подготовки белковых образцов.",
    description:
      "Применяется для экстракции белков из клеток и тканей перед downstream-анализом.",
    attributes: [
      { label: "Формат", value: "Ready-to-use" },
      { label: "Объём", value: "250 мл" },
      { label: "Хранение", value: "4 °C" },
    ],
    documentLabel: "SDS",
  },
  {
    title: "Cell Culture Medium Base",
    brand: "CellBase",
    shortDescription:
      "Базовая культуральная среда для клеточных линий.",
    description:
      "Используется как основа для поддержания клеточных культур в лабораторных условиях.",
    attributes: [
      { label: "Формат", value: "Liquid medium" },
      { label: "Объём", value: "500 мл" },
      { label: "Хранение", value: "2–8 °C" },
    ],
    documentLabel: "SDS",
  },
  {
    title: "ELISA Wash Buffer",
    brand: "ImmunoLab",
    shortDescription:
      "Буфер для промывки планшетов в иммунологических тестах.",
    description:
      "Подходит для стандартных ELISA-протоколов и рутинной иммунологической аналитики.",
    attributes: [
      { label: "Формат", value: "Concentrate" },
      { label: "Объём", value: "100 мл" },
      { label: "Хранение", value: "Комнатная температура" },
    ],
    documentLabel: "SDS",
  },
  {
    title: "NGS Library Prep Mix",
    brand: "SeqNova",
    shortDescription:
      "Реагенты для подготовки библиотек к секвенированию.",
    description:
      "Используются при подготовке образцов для NGS в исследовательских лабораториях.",
    attributes: [
      { label: "Формат", value: "Complete mix" },
      { label: "Применение", value: "NGS" },
      { label: "Хранение", value: "-20 °C" },
    ],
    documentLabel: "SDS",
  },
  {
    title: "Staining Solution BlueGel",
    brand: "BlueGel",
    shortDescription:
      "Раствор для окрашивания нуклеиновых кислот в геле.",
    description:
      "Подходит для визуализации продуктов амплификации и фрагментов ДНК после электрофореза.",
    attributes: [
      { label: "Формат", value: "Ready-to-use" },
      { label: "Применение", value: "Окрашивание гелей" },
      { label: "Хранение", value: "Комнатная температура" },
    ],
    documentLabel: "SDS",
  },
  {
    title: "Antibody Diluent Buffer",
    brand: "ImmunoLab",
    shortDescription:
      "Буфер для разведения антител в иммунологических протоколах.",
    description:
      "Используется в ELISA, иммуноцитохимии и других методах, требующих контролируемого разведения антител.",
    attributes: [
      { label: "Формат", value: "Buffer" },
      { label: "Объём", value: "100 мл" },
      { label: "Хранение", value: "2–8 °C" },
    ],
    documentLabel: "SDS",
  },
]

const consumableSeeds: ProductSeed[] = [
  {
    title: "Наконечники с фильтром 200 µL",
    brand: "LabCore",
    shortDescription:
      "Одноразовые наконечники с фильтром для работы с микропипетками.",
    description:
      "Подходят для точного дозирования и снижения риска контаминации при рутинной лабораторной работе.",
    attributes: [
      { label: "Объём", value: "200 µL" },
      { label: "Стерильность", value: "Стерильные" },
      { label: "Упаковка", value: "960 шт." },
    ],
    documentLabel: "Specification",
  },
  {
    title: "Криопробирки 2 мл",
    brand: "CryoSafe",
    shortDescription:
      "Криопробирки для хранения биологических образцов при низких температурах.",
    description:
      "Используются для долгосрочного хранения образцов в морозильных системах и криохранилищах.",
    attributes: [
      { label: "Объём", value: "2 мл" },
      { label: "Резьба", value: "Внешняя" },
      { label: "Температура", value: "До -196 °C" },
    ],
    documentLabel: "Specification",
  },
  {
    title: "ПЦР-планшет 96 лунок",
    brand: "PCRware",
    shortDescription:
      "Планшет для амплификации и постановки qPCR.",
    description:
      "Предназначен для стандартных ПЦР-протоколов и совместим с большинством термоциклеров.",
    attributes: [
      { label: "Формат", value: "96 лунок" },
      { label: "Материал", value: "Полипропилен" },
      { label: "Стерильность", value: "Да" },
    ],
    documentLabel: "Specification",
  },
  {
    title: "Пробирки микроцентрифужные 1.5 мл",
    brand: "TubeLab",
    shortDescription:
      "Пробирки для хранения и обработки образцов малого объёма.",
    description:
      "Широко используются в молекулярно-биологических и аналитических протоколах.",
    attributes: [
      { label: "Объём", value: "1.5 мл" },
      { label: "Тип", value: "С защёлкой" },
      { label: "Стерильность", value: "Нет" },
    ],
    documentLabel: "Specification",
  },
  {
    title: "Предметные стёкла Microlab",
    brand: "Microlab",
    shortDescription:
      "Стёкла для микроскопии и рутинной лабораторной диагностики.",
    description:
      "Подходят для подготовки препаратов и повседневной работы в лаборатории.",
    attributes: [
      { label: "Размер", value: "76 × 26 мм" },
      { label: "Материал", value: "Стекло" },
      { label: "Упаковка", value: "50 шт." },
    ],
    documentLabel: "Specification",
  },
  {
    title: "Покровные стёкла CoverSafe",
    brand: "CoverSafe",
    shortDescription:
      "Покровные стёкла для микроскопии и окрашивания.",
    description:
      "Применяются совместно с предметными стёклами при работе с препаратами.",
    attributes: [
      { label: "Размер", value: "24 × 24 мм" },
      { label: "Материал", value: "Стекло" },
      { label: "Упаковка", value: "100 шт." },
    ],
    documentLabel: "Specification",
  },
  {
    title: "Флаконы для культуры клеток",
    brand: "CellFlask",
    shortDescription:
      "Флаконы для адгезивных клеточных культур.",
    description:
      "Используются для культивирования клеток в CO2-инкубаторах.",
    attributes: [
      { label: "Формат", value: "T-75" },
      { label: "Стерильность", value: "Стерильные" },
      { label: "Упаковка", value: "100 шт." },
    ],
    documentLabel: "Specification",
  },
  {
    title: "Серологические пипетки",
    brand: "PipettePro",
    shortDescription:
      "Одноразовые серологические пипетки для работы с клеточными культурами.",
    description:
      "Подходят для дозирования сред, буферов и других лабораторных жидкостей.",
    attributes: [
      { label: "Объём", value: "10 мл" },
      { label: "Стерильность", value: "Стерильные" },
      { label: "Упаковка", value: "200 шт." },
    ],
    documentLabel: "Specification",
  },
  {
    title: "Штатив для пробирок RackPro",
    brand: "RackPro",
    shortDescription:
      "Универсальный штатив для пробирок малого и среднего объёма.",
    description:
      "Подходит для организации рабочего места и хранения пробирок во время эксперимента.",
    attributes: [
      { label: "Формат", value: "24 места" },
      { label: "Материал", value: "Пластик" },
      { label: "Цвет", value: "Нейтральный" },
    ],
    documentLabel: "Specification",
  },
  {
    title: "Контейнер для отходов BioWaste",
    brand: "BioWaste",
    shortDescription:
      "Контейнер для безопасного сбора лабораторных отходов.",
    description:
      "Используется для организации безопасного обращения с расходными материалами и лабораторным мусором.",
    attributes: [
      { label: "Объём", value: "5 л" },
      { label: "Материал", value: "Пластик" },
      { label: "Назначение", value: "Лабораторные отходы" },
    ],
    documentLabel: "Specification",
  },
]

export const products: Product[] = [
  ...makeProducts("equipment", "eq", equipmentSeeds),
  ...makeProducts("reagents", "rea", reagentSeeds),
  ...makeProducts("consumables", "con", consumableSeeds),
]