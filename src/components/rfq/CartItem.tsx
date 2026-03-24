"use client"

import Button from "@/components/ui/Button"
import type { CartItem as CartItemType } from "@/lib/types"
import { getCategoryTitle } from "@/lib/utils"

interface CartItemProps {
  item: CartItemType
  onRemove: (productId: string) => void
  onDecrease: (productId: string, quantity: number) => void
  onIncrease: (productId: string, quantity: number) => void
}

export default function CartItem({
  item,
  onRemove,
  onDecrease,
  onIncrease,
}: CartItemProps) {
  return (
    <div className="surface-card px-5 py-5">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-[0.08em] muted-text">
            {getCategoryTitle(item.category)}
          </p>
          <h3 className="mt-1 text-base font-semibold">{item.title}</h3>
          <p className="mt-1 text-sm muted-text">Артикул: {item.sku}</p>
        </div>

        <button
          type="button"
          onClick={() => onRemove(item.productId)}
          className="text-sm font-medium muted-text transition hover:opacity-70"
        >
          Удалить
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button
          variant="secondary"
          onClick={() => onDecrease(item.productId, item.quantity - 1)}
          className="min-h-10 w-10 px-0"
        >
          −
        </Button>

        <div
          className="flex min-h-10 min-w-12 items-center justify-center rounded-[var(--radius-md)] border px-3 text-sm font-semibold"
          style={{ borderColor: "var(--border)" }}
        >
          {item.quantity}
        </div>

        <Button
          variant="secondary"
          onClick={() => onIncrease(item.productId, item.quantity + 1)}
          className="min-h-10 w-10 px-0"
        >
          +
        </Button>
      </div>
    </div>
  )
}