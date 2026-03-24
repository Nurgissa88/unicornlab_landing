"use client"

import { Link } from "next-view-transitions"
import { motion } from "motion/react"

import AddToQuoteButton from "@/components/rfq/AddToQuoteButton"
import type { Product } from "@/lib/types"
import { getCategoryTitle } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

function ProductVisual({ product }: { product: Product }) {
  if (product.category === "equipment") {
    return (
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#eef6ff_0%,#f8fbff_55%,#eefaf8_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.14),transparent_28%)]" />
        <div className="relative flex h-32 w-40 items-center justify-center rounded-[22px] border border-white/70 bg-white/80 shadow-[0_18px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm">
          <div className="absolute left-4 top-4 h-2.5 w-2.5 rounded-full bg-[var(--primary)]/70" />
          <div className="absolute right-4 top-4 h-2 w-10 rounded-full bg-slate-200" />
          <div className="h-16 w-24 rounded-[16px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#e8eef7_100%)] shadow-inner" />
        </div>
        <div className="absolute bottom-5 left-5 rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--primary)] shadow-sm">
          Equipment
        </div>
      </div>
    )
  }

  if (product.category === "reagents") {
    return (
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#f3fbfa_0%,#eef7ff_50%,#f7fcfb_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(15,118,110,0.14),transparent_18%),radial-gradient(circle_at_70%_40%,rgba(56,189,248,0.14),transparent_22%),radial-gradient(circle_at_50%_75%,rgba(16,185,129,0.10),transparent_20%)]" />
        <div className="relative flex gap-4">
          <div className="h-24 w-12 rounded-full border border-white/80 bg-white/75 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm" />
          <div className="mt-6 h-20 w-12 rounded-full border border-white/80 bg-white/70 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm" />
          <div className="h-28 w-12 rounded-full border border-white/80 bg-white/80 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm" />
        </div>
        <div className="absolute bottom-5 left-5 rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--primary)] shadow-sm">
          Reagents
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#f7f9fc_0%,#eef4fb_55%,#f4fbf8_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(15,118,110,0.10),transparent_24%)]" />
      <div className="relative grid grid-cols-3 gap-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-10 w-10 rounded-[12px] border border-white/80 bg-white/80 shadow-[0_10px_24px_rgba(15,23,42,0.07)] backdrop-blur-sm"
          />
        ))}
      </div>
      <div className="absolute bottom-5 left-5 rounded-full border border-white/80 bg-white/80 px-3 py-1 text-xs font-semibold text-[var(--primary)] shadow-sm">
        Consumables
      </div>
    </div>
  )
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <motion.article
      className="surface-card flex h-full flex-col p-6"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <div className="mb-5 overflow-hidden rounded-[20px]">
        <ProductVisual product={product} />
      </div>

      <div className="flex flex-1 flex-col">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] muted-text">
          {product.brand} · {getCategoryTitle(product.category)}
        </p>

        <h2 className="mt-3 text-xl font-semibold tracking-[-0.02em]">
          {product.title}
        </h2>

        <p className="mt-2 text-sm muted-text">Артикул: {product.sku}</p>

        <p className="mt-4 text-sm leading-6 muted-text">
          {product.shortDescription}
        </p>

        <div className="mt-5 space-y-2">
          {product.attributes.slice(0, 3).map((attribute) => (
            <div
              key={`${product.id}-${attribute.label}`}
              className="flex items-start justify-between gap-4 text-sm"
            >
              <span className="muted-text">{attribute.label}</span>
              <span className="text-right font-medium text-[var(--foreground)]">
                {attribute.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <AddToQuoteButton product={product} className="flex-1" />

          <Link
            href={`/catalog/${product.category}/${product.slug}`}
            className="ui-button ui-button-secondary"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </motion.article>
  )
}