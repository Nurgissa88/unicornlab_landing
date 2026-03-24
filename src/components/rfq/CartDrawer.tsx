"use client"

import { useEffect } from "react"
import { AnimatePresence, motion } from "motion/react"

import CartItem from "@/components/rfq/CartItem"
import RfqForm from "@/components/rfq/RfqForm"
import Button from "@/components/ui/Button"
import { useCartStore } from "@/lib/cartStore"

export default function CartDrawer() {
  const items = useCartStore((state) => state.items)
  const isOpen = useCartStore((state) => state.isOpen)
  const closeCart = useCartStore((state) => state.closeCart)
  const removeItem = useCartStore((state) => state.removeItem)
  const updateQuantity = useCartStore((state) => state.updateQuantity)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    if (!isOpen) return

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
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/18 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={closeCart}
          />

          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-dvh w-full max-w-xl flex-col border-l"
            style={{
              background: "rgba(255,255,255,0.96)",
              borderColor: "var(--border)",
              boxShadow: "var(--shadow-drawer)",
              backdropFilter: "blur(14px)",
            }}
            initial={{ x: "100%", opacity: 0.92 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="flex items-start justify-between gap-4 border-b px-6 py-5"
              style={{ borderColor: "var(--border)" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.28, delay: 0.06, ease: "easeOut" }}
            >
              <div>
                <p className="text-sm font-medium muted-text">
                  RFQ / Коммерческое предложение
                </p>
                <h2 className="mt-1 text-2xl font-semibold tracking-[-0.02em]">
                  Запрос КП
                </h2>
                <p className="mt-2 text-sm muted-text">
                  Выбрано позиций: {totalItems}
                </p>
              </div>

              <Button
                variant="secondary"
                onClick={closeCart}
                className="min-h-10 px-4"
              >
                Закрыть
              </Button>
            </motion.div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              {items.length === 0 ? (
                <motion.div
                  className="surface-card px-5 py-6"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                >
                  <h3 className="text-lg font-semibold">Корзина пуста</h3>
                  <p className="mt-2 text-sm muted-text">
                    Добавьте товары из каталога, и они появятся здесь.
                  </p>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    className="mb-4 flex items-center justify-between gap-4"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.24, delay: 0.08, ease: "easeOut" }}
                  >
                    <p className="text-sm muted-text">
                      Добавленные товары можно отредактировать перед отправкой.
                    </p>

                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-sm font-medium text-[var(--primary)] transition hover:opacity-80"
                    >
                      Очистить всё
                    </button>
                  </motion.div>

                  <div className="space-y-4">
                    {items.map((item, index) => (
                      <motion.div
                        key={item.productId}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.28,
                          delay: 0.08 + index * 0.04,
                          ease: "easeOut",
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
                </>
              )}

              <motion.div
                className="mt-6 border-t pt-6"
                style={{ borderColor: "var(--border)" }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.12, ease: "easeOut" }}
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