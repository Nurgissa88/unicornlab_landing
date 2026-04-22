"use client"

import Button from "@/components/ui/Button"
import type { ProductComponentType, ProductRole } from "@/lib/types"
import { getComponentTypeLabel, getRoleLabel } from "@/lib/utils"

interface FiltersSidebarProps {
  brands: string[]
  roles: ProductRole[]
  componentTypes: ProductComponentType[]
  selectedBrands: string[]
  selectedRoles: ProductRole[]
  selectedComponentTypes: ProductComponentType[]
  featuredOnly: boolean
  documentsOnly: boolean
  onToggleBrand: (brand: string) => void
  onToggleRole: (role: ProductRole) => void
  onToggleComponentType: (type: ProductComponentType) => void
  onFeaturedChange: (value: boolean) => void
  onDocumentsChange: (value: boolean) => void
  onReset: () => void
}

function FilterCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}) {
  return (
    <label className="group flex cursor-pointer items-center justify-between gap-3 rounded-[var(--radius-md)] border border-transparent px-3 py-2 transition hover:border-[var(--border)] hover:bg-[var(--surface-soft)]">
      <span className="text-sm text-[var(--foreground)]">{label}</span>

      <span
        className={`flex h-5 w-5 items-center justify-center rounded-md border text-xs font-bold transition ${
          checked
            ? "border-[var(--primary)] bg-[var(--primary)] text-white"
            : "border-[var(--border)] bg-white text-transparent"
        }`}
      >
        ✓
      </span>

      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="sr-only"
      />
    </label>
  )
}

export default function FiltersSidebar({
  brands,
  roles,
  componentTypes,
  selectedBrands,
  selectedRoles,
  selectedComponentTypes,
  featuredOnly,
  documentsOnly,
  onToggleBrand,
  onToggleRole,
  onToggleComponentType,
  onFeaturedChange,
  onDocumentsChange,
  onReset,
}: FiltersSidebarProps) {
  return (
    <aside className="surface-card h-fit p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.08em] muted-text">
            Фильтры
          </p>
          <h2 className="mt-2 text-xl font-semibold tracking-[-0.02em]">
            Уточните подбор
          </h2>
        </div>

        <Button
          variant="secondary"
          onClick={onReset}
          className="min-h-10 px-4"
        >
          Сбросить
        </Button>
      </div>

      <div
        className="mt-6 border-t pt-6"
        style={{ borderColor: "var(--border)" }}
      >
        <h3 className="text-sm font-semibold">Направление</h3>

        <div className="mt-4 space-y-2">
          {roles.length === 0 ? (
            <p className="text-sm muted-text">Направления не найдены</p>
          ) : (
            roles.map((role) => {
              const checked = selectedRoles.includes(role)

              return (
                <FilterCheckbox
                  key={role}
                  label={getRoleLabel(role)}
                  checked={checked}
                  onChange={() => onToggleRole(role)}
                />
              )
            })
          )}
        </div>
      </div>

      <div
        className="mt-6 border-t pt-6"
        style={{ borderColor: "var(--border)" }}
      >
        <h3 className="text-sm font-semibold">Тип позиции</h3>

        <div className="mt-4 space-y-2">
          {componentTypes.length === 0 ? (
            <p className="text-sm muted-text">Типы не найдены</p>
          ) : (
            componentTypes.map((componentType) => {
              const checked = selectedComponentTypes.includes(componentType)

              return (
                <FilterCheckbox
                  key={componentType}
                  label={getComponentTypeLabel(componentType)}
                  checked={checked}
                  onChange={() => onToggleComponentType(componentType)}
                />
              )
            })
          )}
        </div>
      </div>

      <div
        className="mt-6 border-t pt-6"
        style={{ borderColor: "var(--border)" }}
      >
        <h3 className="text-sm font-semibold">Бренд</h3>

        <div className="mt-4 space-y-2">
          {brands.length === 0 ? (
            <p className="text-sm muted-text">Бренды не найдены</p>
          ) : (
            brands.map((brand) => {
              const checked = selectedBrands.includes(brand)

              return (
                <FilterCheckbox
                  key={brand}
                  label={brand}
                  checked={checked}
                  onChange={() => onToggleBrand(brand)}
                />
              )
            })
          )}
        </div>
      </div>

      {/*
        <div
          className="mt-6 border-t pt-6"
          style={{ borderColor: "var(--border)" }}
        >
          <h3 className="text-sm font-semibold">Дополнительно</h3>

          <div className="mt-4 space-y-2">
            <FilterCheckbox
              label="Только рекомендуемые"
              checked={featuredOnly}
              onChange={onFeaturedChange}
            />

            <FilterCheckbox
              label="Только с документами"
              checked={documentsOnly}
              onChange={onDocumentsChange}
            />
          </div>
        </div>
      */}
    </aside>
  )
}
