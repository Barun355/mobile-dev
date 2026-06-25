/**
 * Cart store (zustand) — full CRUD over cart line items.
 *
 * create  → addItem (adds a line or bumps quantity)
 * read    → items, plus useCartCount / useCartTotal selector hooks
 * update  → incrementItem / decrementItem / setQuantity
 * delete  → removeItem / clearCart
 */
import { create } from "zustand";

import type { Meal } from "@/constants/data";

export type CartItem = {
  meal: Meal;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  addItem: (meal: Meal, quantity?: number) => void;
  removeItem: (mealId: string) => void;
  incrementItem: (mealId: string) => void;
  decrementItem: (mealId: string) => void;
  setQuantity: (mealId: string, quantity: number) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],

  addItem: (meal, quantity = 1) =>
    set((state) => {
      const existing = state.items.find((i) => i.meal.id === meal.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.meal.id === meal.id
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          ),
        };
      }
      return { items: [...state.items, { meal, quantity }] };
    }),

  removeItem: (mealId) =>
    set((state) => ({
      items: state.items.filter((i) => i.meal.id !== mealId),
    })),

  incrementItem: (mealId) =>
    set((state) => ({
      items: state.items.map((i) =>
        i.meal.id === mealId ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    })),

  decrementItem: (mealId) =>
    set((state) => ({
      items: state.items
        .map((i) =>
          i.meal.id === mealId ? { ...i, quantity: i.quantity - 1 } : i,
        )
        .filter((i) => i.quantity > 0),
    })),

  setQuantity: (mealId, quantity) =>
    set((state) => ({
      items: state.items
        .map((i) => (i.meal.id === mealId ? { ...i, quantity } : i))
        .filter((i) => i.quantity > 0),
    })),

  clearCart: () => set({ items: [] }),
}));

/** Total number of items (sum of quantities). */
export const useCartCount = () =>
  useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

/** Subtotal price across all line items. */
export const useCartTotal = () =>
  useCartStore((s) =>
    s.items.reduce((sum, i) => sum + i.meal.price * i.quantity, 0),
  );
