"use client"

import { Link } from "next-view-transitions"

import { siteConfig } from "@/content/site"
import { useCartStore } from "@/lib/cartStore"
import Container from "@/components/ui/Container"
import Button from "@/components/ui/Button"

export default function Header() {
  const items = useCartStore((state) => state.items)
  const openCart = useCartStore((state) => state.openCart)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--border)] bg-white/75 backdrop-blur-xl">
      <Container>
        <div className="flex min-h-20 items-center justify-between gap-6">
          <Link href="/" className="shrink-0 text-lg font-semibold tracking-[-0.02em]">
            {siteConfig.shortName}
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

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={openCart}
              className="relative"
            >
              Запрос КП
              {totalItems > 0 ? (
                <span className="inline-flex min-w-6 items-center justify-center rounded-full bg-[var(--primary)] px-2 py-1 text-xs font-semibold text-white">
                  {totalItems}
                </span>
              ) : null}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}