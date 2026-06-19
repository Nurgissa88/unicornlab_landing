"use client"

import { useEffect } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"

import CartItem from "@/components/rfq/CartItem"
import RfqForm from "@/components/rfq/RfqForm"
import { useCartStore } from "@/lib/cartStore"

export default function CartDrawer() {
  const items = useCartStore((state) => state.items)
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart()
      }
    }

    window.addEventListener("keydown", handleEscape)
    document.body.style.overflow = "hidden"

    return () => {
      window.removeEventListener("keydown", handleEscape)
      document.body.style.overflow = ""
    }
  }, [isOpen, closeCart])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            type="button"
            className="fixed inset-0 z-[90] cursor-default bg-[#060C1A]/22 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            onClick={closeCart}
            aria-label="Закрыть форму"
          />

          <motion.aside
            className="fixed right-0 top-0 z-[100] flex h-dvh w-full max-w-[760px] flex-col border-l border-[#3E5467]/20 bg-[#EAEAEA] text-[#020202] shadow-[-28px_0_90px_rgba(2,2,2,0.14)]"
            role="dialog"
            aria-modal="true"
            aria-label="Форма запроса коммерческого предложения"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.56, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="flex items-start justify-between gap-6 border-b border-[#3E5467]/20 px-6 py-6 md:px-9">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#3E5467]">
                  RFQ / Коммерческое предложение
                </p>
                <h2 className="mt-2 text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.94]">
                  Запрос КП
                </h2>
                <p className="mt-3 text-sm text-[#3E5467]">
                  {items.length > 0
                    ? `Выбрано единиц: ${totalItems}`
                    : "Опишите задачу или нужную позицию"}
                </p>
              </div>

              <button
                type="button"
                onClick={closeCart}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[8px] bg-[#020202]/8 text-[#020202] transition hover:bg-[#020202]/14"
                aria-label="Закрыть форму"
                title="Закрыть"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6 md:px-9">
              {items.length > 0 ? (
                <motion.section
                  className="mb-7 border-b border-[#3E5467]/20 pb-7"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.08 }}
                  aria-label="Выбранные позиции"
                >
                  <div className="mb-4 flex items-center justify-between gap-5">
                    <h3 className="text-lg font-semibold">
                      Выбранные позиции
                    </h3>
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-sm font-semibold text-[#2A91D9] transition hover:text-[#060C1A]"
                    >
                      Очистить все
                    </button>
                  </div>

                  <div className="grid gap-3">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.productId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.25,
                          delay: 0.1 + index * 0.035,
                        }}
                      >
                        <CartItem
                          item={item}
                          onRemove={removeItem}
                          onDecrease={updateQuantity}
                          onIncrease={updateQuantity}
                        />
                      </motion.div>
                    ))}
                  </div>
                </motion.section>
              ) : null}

              <motion.div
                className="rounded-[8px] border border-[#3E5467]/25 bg-[#EAEAEA] p-5 md:p-7"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.34, delay: 0.1 }}
              >
                <RfqForm />
              </motion.div>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  )
}
