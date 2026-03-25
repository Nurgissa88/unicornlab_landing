"use client"

import { useMemo, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"

import ProductCard from "@/components/catalog/ProductCard"
import type { Product } from "@/lib/types"

gsap.registerPlugin(useGSAP, ScrollTrigger)

interface ProductGridProps {
  products: Product[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const animationKey = useMemo(
    () => products.map((product) => product.id).join("|"),
    [products]
  )

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-product-card]")

      if (!cards.length) return

      gsap.set(cards, {
        autoAlpha: 0,
        y: 32,
        scale: 0.985,
      })

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.08,
            ease: "power3.out",
            clearProps: "opacity,visibility,transform",
            overwrite: true,
          })
        },
      })
    },
    {
      scope: containerRef,
      dependencies: [animationKey],
      revertOnUpdate: true,
    }
  )

  return (
    <div
      ref={containerRef}
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}