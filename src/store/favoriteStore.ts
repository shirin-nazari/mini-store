import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "../types/product";
type FavoriteState = {
  items: Product[];
  toggle: (product: Product) => void;
  remove: (id: number) => void;
  clear: () => void;
};
export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      items: [],
      toggle: (product) =>
        set((state) =>
          state.items.some((p) => p.id === product.id)
            ? { items: state.items.filter((p) => p.id !== product.id) }
            : { items: [...state.items, product] },
        ),
      remove: (id) =>
        set((state) => ({ items: state.items.filter((p) => p.id !== id) })),
      clear: () => set({ items: [] }),
    }),
    { name: "favorites" },
  ),
);
export const selectFavoriteCount = (s: FavoriteState) => s.items.length;
