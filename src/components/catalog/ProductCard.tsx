"use client"

import { useRef } from "react"
import { Link } from "next-view-transitions"
import { motion } from "motion/react"
import gsap from "gsap"

import AddToQuoteButton from "@/components/rfq/AddToQuoteButton"
import ProductImage from "@/components/catalog/ProductImage"
import type { Product } from "@/lib/types"
import { getCategoryTitle } from "@/lib/utils"

interface ProductCardProps {
  product: Product
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
        className="mb-4 overflow-hidden rounded-[10px]"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div data-parallax-inner className="relative">
          <ProductImage product={product} />
        </div>
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

        {product.sku ? (
          <p className="mt-1 text-sm muted-text">Артикул: {product.sku}</p>
        ) : null}

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
            <span className="rounded-[8px] bg-[var(--surface-soft)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
              Есть документы
            </span>
          ) : null}
          {product.featured ? (
            <span className="rounded-[8px] bg-[var(--accent-soft)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
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
