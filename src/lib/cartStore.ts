"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

import type { CartItem, Product } from "@/lib/types"

interface CartState {
  items: CartItem[]
  isOpen: boolean
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.productId === product.id
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.productId === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
              isOpen: true,
            }
          }

          const newItem: CartItem = {
            productId: product.id,
            title: product.title,
            sku: product.sku,
            category: product.category,
            quantity: 1,
          }

          return {
            items: [...state.items, newItem],
            isOpen: true,
          }
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.max(1, quantity) }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),
    }),
    {
      name: "rfq-cart-storage",
      partialize: (state) => ({
        items: state.items,
      }),
    }
  )
)