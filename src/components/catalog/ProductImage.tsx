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
      className={`relative overflow-hidden rounded-[inherit] bg-[linear-gradient(135deg,#f8fbff_0%,#eef4fb_55%,#f6f8fb_100%)] ${aspectClassName} ${className}`.trim()}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(42,145,217,0.10),transparent_26%),radial-gradient(circle_at_bottom_left,rgba(62,84,103,0.10),transparent_26%)]" />

      <div className="absolute inset-4 rounded-[8px] bg-white/96 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.75)]" />

      <Image
        src={product.image}
        alt={product.title}
        fill
        unoptimized
        sizes={sizes}
        className="object-contain p-5 scale-[1.04]"
      />

      {showCategoryBadge ? (
        <div className="absolute bottom-4 left-4 rounded-[10px] border border-white/85 bg-white/88 px-3 py-1 text-xs font-semibold text-[var(--primary)] shadow-sm backdrop-blur-sm">
          {getCategoryTitle(product.category)}
        </div>
      ) : null}
    </div>
  )
}
