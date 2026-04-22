"use client"

import { Link } from "next-view-transitions"
import { AnimatePresence, motion } from "motion/react"

import Button from "@/components/ui/Button"
import Container from "@/components/ui/Container"
import { siteConfig } from "@/content/site"
import { useCartStore } from "@/lib/cartStore"

export default function Header() {
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.openCart)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const hasItems = totalItems > 0

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/75 backdrop-blur-xl">
      <Container>
        <div className="flex min-h-20 items-center justify-between gap-6">
          <Link
            href="/"
            className="shrink-0"
            aria-label="На главную"
          >
            <img
              src="/Logo_Black.png"
              alt="InSeek"
              className="h-8 w-auto object-contain"
            />
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant={hasItems ? "primary" : "secondary"}
              onClick={openCart}
              className="min-w-[190px] justify-center"
            >
              <span>Запрос КП</span>
            </Button>

            <div className="flex h-11 w-[52px] items-center justify-center">
              <AnimatePresence initial={false} mode="popLayout">
                {hasItems ? (
                  <motion.button
                    key="cart-counter"
                    type="button"
                    onClick={openCart}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="inline-flex h-11 w-[52px] items-center justify-center rounded-[var(--radius-md)] border border-[var(--border)] bg-white text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-soft)]"
                    aria-label={`Открыть запрос, товаров: ${totalItems}`}
                  >
                    {totalItems}
                  </motion.button>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}