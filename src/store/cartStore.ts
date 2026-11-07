import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";

export type CartItem = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  quantity: number;
  stock: number;
};

type AddItemResult =
  | { success: true }
  | { success: false; reason: "insufficient-stock" | "invalid-quantity" };

type CartState = {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => AddItemResult;
  removeItem: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, quantity = 1) => {
        const requestedQuantity = Math.floor(quantity);

        if (!Number.isFinite(requestedQuantity) || requestedQuantity <= 0) {
          return { success: false, reason: "invalid-quantity" };
        }

        const existing = get().items.find((item) => item.id === product.id);
        const inCart = existing?.quantity ?? 0;

        if (product.stock <= 0 || inCart + requestedQuantity > product.stock) {
          return { success: false, reason: "insufficient-stock" };
        }

        set((state) => ({
          items: existing
            ? state.items.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + requestedQuantity,
                      stock: product.stock,
                    }
                  : item,
              )
            : [
                ...state.items,
                {
                  id: product.id,
                  title: product.title,
                  price: product.price,
                  thumbnail: product.thumbnail,
                  quantity: requestedQuantity,
                  stock: product.stock,
                },
              ],
        }));

        return { success: true };
      },
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      setQuantity: (id, quantity) =>
        set((state) => {
          if (!Number.isFinite(quantity) || quantity <= 0) {
            return state;
          }

          const requestedQuantity = Math.floor(quantity);

          if (requestedQuantity <= 0) {
            return state;
          }

          return {
            items: state.items.map((item) =>
              item.id === id
                ? {
                    ...item,
                    quantity: Math.min(item.stock, requestedQuantity),
                  }
                : item,
            ),
          };
        }),

      clear: () => set({ items: [] }),
    }),
    {
      name: "cart",
      version: 2,
      partialize: (state) => ({ items: state.items }),
      migrate: () => ({ items: [] }),
    },
  ),
);

export const selectCartCount = (s: CartState) =>
  s.items.reduce((sum, item) => sum + item.quantity, 0);

export const selectCartTotal = (s: CartState) =>
  s.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
