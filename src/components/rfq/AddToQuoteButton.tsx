"use client"

import { useCartStore } from "@/lib/cartStore"
import type { Product } from "@/lib/types"
import Button from "@/components/ui/Button"

interface AddToQuoteButtonProps {
  product: Product
  className?: string
}

export default function AddToQuoteButton({
  product,
  className,
}: AddToQuoteButtonProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <Button
      type="button"
      onClick={() => addItem(product)}
      className={className}
    >
      В запрос КП
    </Button>
  )
}