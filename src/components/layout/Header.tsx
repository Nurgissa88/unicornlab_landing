"use client"

import { type MouseEvent, useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Link } from "next-view-transitions"
import { AnimatePresence, motion } from "motion/react"

import { useCartStore } from "@/lib/cartStore"

gsap.registerPlugin(useGSAP, ScrollTrigger)

const navigationItems = [
  { key: "work", label: "Что мы делаем", href: "/#work" },
  { key: "process", label: "Как мы делаем", href: "/#process" },
  { key: "catalog", label: "Каталог", href: "/#catalog" },
  { key: "contacts", label: "Контакты", href: "/#contacts" },
]

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const isCartOpenRef = useRef(false)
  const isHeaderVisibleRef = useRef(false)
  const pathname = usePathname()
  const items = useCartStore((state) => state.items)
  const isCartOpen = useCartStore((state) => state.isOpen)
  const openCart = useCartStore((state) => state.openCart)

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const hasItems = totalItems > 0

  useEffect(() => {
    isCartOpenRef.current = isCartOpen

    if (!isCartOpen) {
      return
    }

    const header = headerRef.current

    if (!header) {
      return
    }

    isHeaderVisibleRef.current = false
    gsap.to(header, {
      yPercent: -125,
      autoAlpha: 0,
      duration: 0.34,
      ease: "power3.out",
      overwrite: true,
    })
  }, [isCartOpen])

  useGSAP(
    () => {
      const header = headerRef.current

      if (!header) {
        return
      }

      const showHeader = () => {
        if (isCartOpenRef.current || isHeaderVisibleRef.current) {
          return
        }

        isHeaderVisibleRef.current = true
        gsap.to(header, {
          yPercent: 0,
          autoAlpha: 1,
          duration: 0.34,
          ease: "power3.out",
          overwrite: true,
        })
      }

      const hideHeader = () => {
        if (!isHeaderVisibleRef.current) {
          return
        }

        isHeaderVisibleRef.current = false
        gsap.to(header, {
          yPercent: -125,
          autoAlpha: 0,
          duration: 0.34,
          ease: "power3.out",
          overwrite: true,
        })
      }

      const isHomePage = pathname === "/"

      if (
        isHomePage &&
        window.scrollY < window.innerHeight * 0.92
      ) {
        isHeaderVisibleRef.current = false
        gsap.set(header, { yPercent: -125, autoAlpha: 0 })
      } else {
        isHeaderVisibleRef.current = true
        gsap.set(header, { yPercent: 0, autoAlpha: 1 })
      }

      const trigger = ScrollTrigger.create({
        start: "top top",
        end: "max",
        onUpdate: (self) => {
          if (isCartOpenRef.current) {
            hideHeader()
            return
          }

          if (isHomePage && self.scroll() < window.innerHeight * 0.92) {
            hideHeader()
            return
          }

          if (self.scroll() < 80 || self.direction < 0) {
            showHeader()
            return
          }

          hideHeader()
        },
      })

      return () => {
        trigger.kill()
        gsap.killTweensOf(header)
      }
    },
    { scope: headerRef, dependencies: [pathname] }
  )

  const handleNavigation = (
    event: MouseEvent<HTMLAnchorElement>,
    section: string
  ) => {
    if (pathname !== "/") {
      return
    }

    event.preventDefault()
    window.dispatchEvent(
      new CustomEvent("inseek:navigate-section", {
        detail: { section },
      })
    )
  }

  return (
    <header
      ref={headerRef}
      className="fixed left-0 right-0 top-0 z-[70] px-6 pt-4 md:px-12 lg:px-16"
    >
      <div className="mx-auto flex min-h-16 w-full items-center justify-between gap-4 rounded-[8px] border border-[#3E5467]/20 bg-[#EAEAEA]/82 py-2 pl-4 pr-2.5 text-[#020202] shadow-[0_18px_70px_rgba(2,2,2,0.14)] backdrop-blur-xl md:min-h-[72px] md:pl-5 md:pr-2.5">
        <Link
          href="/"
          className="shrink-0"
          aria-label="На главную"
          onClick={(event) => handleNavigation(event, "home")}
        >
          <Image
            src="/Logo_Black.png"
            alt="InSeek"
            width={128}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              onClick={(event) => handleNavigation(event, item.key)}
              className="group relative px-3 py-3 text-sm font-normal uppercase leading-none tracking-[0.04em] text-[#020202] transition duration-300"
            >
              <span>{item.label}</span>
              <span
                className="absolute inset-x-3 bottom-1 h-[3px] origin-left scale-x-0 bg-[#020202] transition-transform duration-300 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AnimatePresence initial={false} mode="popLayout">
            {hasItems ? (
              <div className="flex h-11 w-[52px] items-center justify-center">
                <motion.button
                  key="cart-counter"
                  type="button"
                  onClick={openCart}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="inline-flex h-11 w-[52px] items-center justify-center rounded-[8px] border border-[#3E5467]/25 bg-[#EAEAEA] text-sm font-semibold text-[#060C1A] transition hover:bg-white"
                  aria-label={`Открыть запрос, товаров: ${totalItems}`}
                >
                  {totalItems}
                </motion.button>
              </div>
            ) : null}
          </AnimatePresence>

          <button
            type="button"
            onClick={openCart}
            className={`inline-flex h-11 min-w-[146px] items-center justify-center rounded-[8px] px-5 text-sm font-semibold uppercase leading-none tracking-[0.04em] transition duration-300 ${
              hasItems
                ? "bg-[#2A91D9] text-white hover:bg-[#060C1A]"
                : "border border-[#3E5467]/25 bg-transparent text-[#020202] hover:border-[#060C1A] hover:bg-[#060C1A] hover:text-[#EAEAEA]"
            }`}
          >
            <span>Запрос КП</span>
          </button>
        </div>
      </div>
    </header>
  )
}
