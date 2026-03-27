"use client"

import { useRef } from "react"
import { Link } from "next-view-transitions"
import { motion } from "motion/react"
import gsap from "gsap"

import AddToQuoteButton from "@/components/rfq/AddToQuoteButton"
import type { Product } from "@/lib/types"
import { getCategoryTitle } from "@/lib/utils"

interface ProductCardProps {
  product: Product
}

function ProductVisual({ product }: { product: Product }) {
  if (product.category === "equipment") {
    return (
      <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#eef6ff_0%,#f8fbff_55%,#eefaf8_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(15,118,110,0.10),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.14),transparent_28%)]" />
        <div
          data-parallax-inner
          className="relative flex h-24 w-30 items-center justify-center rounded-[18px] border border-white/70 bg-white/80 shadow-[0_14px_30px_rgba(15,23,42,0.08)] backdrop-blur-sm"
        >
          <div className="absolute left-3 top-3 h-2 w-2 rounded-full bg-[var(--primary)]/70" />
          <div className="absolute right-3 top-3 h-1.5 w-8 rounded-full bg-slate-200" />
          <div className="h-12 w-16 rounded-[12px] border border-slate-200 bg-[linear-gradient(180deg,#f8fafc_0%,#e8eef7_100%)] shadow-inner" />
        </div>
      </div>
    )
  }

  if (product.category === "reagents") {
    return (
      <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#f3fbfa_0%,#eef7ff_50%,#f7fcfb_100%)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(15,118,110,0.14),transparent_18%),radial-gradient(circle_at_70%_40%,rgba(56,189,248,0.14),transparent_22%),radial-gradient(circle_at_50%_75%,rgba(16,185,129,0.10),transparent_20%)]" />
        <div data-parallax-inner className="relative flex gap-3">
          <div className="h-18 w-8 rounded-full border border-white/80 bg-white/75 shadow-[0_10px_22px_rgba(15,23,42,0.08)] backdrop-blur-sm" />
          <div className="mt-4 h-15 w-8 rounded-full border border-white/80 bg-white/70 shadow-[0_10px_22px_rgba(15,23,42,0.08)] backdrop-blur-sm" />
          <div className="h-20 w-8 rounded-full border border-white/80 bg-white/80 shadow-[0_10px_22px_rgba(15,23,42,0.08)] backdrop-blur-sm" />
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex aspect-[5/3] items-center justify-center overflow-hidden rounded-[18px] bg-[linear-gradient(135deg,#f7f9fc_0%,#eef4fb_55%,#f4fbf8_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.10),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(15,118,110,0.10),transparent_24%)]" />
      <div data-parallax-inner className="relative grid grid-cols-3 gap-2.5">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-8 w-8 rounded-[10px] border border-white/80 bg-white/80 shadow-[0_8px_18px_rgba(15,23,42,0.07)] backdrop-blur-sm"
          />
        ))}
      </div>
    </div>
  )
}

export default function ProductCard({ product }: ProductCardProps) {
  const visualRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const visual = visualRef.current
    if (!visual) return

    const inner = visual.querySelector<HTMLElement>("[data-parallax-inner]")
    if (!inner) return

    const rect = visual.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    const moveX = (x - 0.5) * 16
    const moveY = (y - 0.5) * 14

    gsap.to(inner, {
      x: moveX,
      y: moveY,
      scale: 1.03,
      duration: 0.35,
      ease: "power2.out",
      overwrite: true,
    })
  }

  const handleMouseLeave = () => {
    const visual = visualRef.current
    if (!visual) return

    const inner = visual.querySelector<HTMLElement>("[data-parallax-inner]")
    if (!inner) return

    gsap.to(inner, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.45,
      ease: "power3.out",
      overwrite: true,
    })
  }

  return (
    <motion.article
      data-product-card
      className="surface-card flex h-full flex-col p-5"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div
        ref={visualRef}
        className="mb-4 overflow-hidden rounded-[18px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <ProductVisual product={product} />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.08em] muted-text">
          <span>{product.brand}</span>
          <span>•</span>
          <span>{getCategoryTitle(product.category)}</span>
        </div>

        <h2 className="mt-2 text-lg font-semibold tracking-[-0.02em]">
          {product.title}
        </h2>

        <p className="mt-1 text-sm muted-text">Артикул: {product.sku}</p>

        <p className="mt-3 line-clamp-2 text-sm leading-6 muted-text">
          {product.shortDescription}
        </p>

        <div className="mt-4 space-y-2">
          {product.attributes.slice(0, 2).map((attribute) => (
            <div
              key={`${product.id}-${attribute.label}`}
              className="flex items-start justify-between gap-3 text-sm"
            >
              <span className="muted-text">{attribute.label}</span>
              <span className="text-right font-medium text-[var(--foreground)]">
                {attribute.value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {product.documents?.length ? (
            <span className="rounded-full bg-[var(--surface-soft)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
              Есть документы
            </span>
          ) : null}
          {product.featured ? (
            <span className="rounded-full bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
              Рекомендуем
            </span>
          ) : null}
        </div>

        <div className="mt-5 flex items-stretch gap-2">
          <AddToQuoteButton product={product} className="flex-1" />

          <Link
            href={`/catalog/${product.category}/${product.slug}`}
            className="ui-button ui-button-secondary min-h-11 shrink-0 px-4"
          >
            Подробнее
          </Link>
        </div>
      </div>
    </motion.article>
  )
}