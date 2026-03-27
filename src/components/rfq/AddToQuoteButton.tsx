"use client"

import { ShoppingCart } from "lucide-react"

import Button from "@/components/ui/Button"
import { useCartStore } from "@/lib/cartStore"
import type { Product } from "@/lib/types"

interface AddToQuoteButtonProps {
  product: Product
  className?: string
}

export default function AddToQuoteButton({
  product,
  className,
}: AddToQuoteButtonProps) {
  const items = useCartStore((state) => state.items)
  const incrementItem = useCartStore((state) => state.incrementItem)
  const decrementItem = useCartStore((state) => state.decrementItem)

  const cartItem = items.find((item) => item.productId === product.id)
  const quantity = cartItem?.quantity ?? 0

  if (quantity > 0) {
    return (
      <div className={`flex min-h-11 items-center gap-1.5 ${className ?? ""}`}>
        <Button
          type="button"
          variant="secondary"
          onClick={() => decrementItem(product.id)}
          className="min-h-11 w-10 px-0 text-lg"
          aria-label="Уменьшить количество"
        >
          −
        </Button>

        <div className="flex min-h-11 min-w-[44px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] px-2.5 text-sm font-semibold">
          {quantity}
        </div>

        <Button
          type="button"
          onClick={() => incrementItem(product)}
          className="min-h-11 w-10 px-0 text-lg"
          aria-label="Увеличить количество"
        >
          +
        </Button>
      </div>
    )
  }

  return (
    <Button
      type="button"
      onClick={() => incrementItem(product)}
      className={className}
      aria-label="Добавить в запрос"
    >
      <ShoppingCart className="h-4 w-4" />
    </Button>
  )
}