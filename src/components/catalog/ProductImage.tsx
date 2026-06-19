import Image from "next/image"

import type { Product } from "@/lib/types"
import { getCategoryTitle } from "@/lib/utils"

interface ProductImageProps {
  product: Product
  aspectClassName?: string
  className?: string
  showCategoryBadge?: boolean
  sizes?: string
}

export default function ProductImage({
  product,
  aspectClassName = "aspect-[5/3]",
  className = "",
  showCategoryBadge = false,
  sizes = "(min-width: 1280px) 22vw, (min-width: 768px) 32vw, 100vw",
}: ProductImageProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[inherit] bg-white ${aspectClassName} ${className}`.trim()}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,12,26,0.07),transparent_30%)]" />

      <div className="absolute inset-4 rounded-[8px] bg-white shadow-[inset_0_0_0_1px_rgba(6,12,26,0.08)]" />

      <Image
        src={product.image}
        alt={product.title}
        fill
        unoptimized
        sizes={sizes}
        className="object-contain p-5 scale-[1.04]"
      />

      {showCategoryBadge ? (
        <div className="absolute bottom-4 left-4 rounded-[10px] border border-[#060C1A]/15 bg-white px-3 py-1 text-xs font-semibold text-[#060C1A] shadow-sm">
          {getCategoryTitle(product.category)}
        </div>
      ) : null}
    </div>
  )
}
