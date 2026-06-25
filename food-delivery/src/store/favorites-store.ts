/**
 * Favorites store (zustand) — toggle/read favorite meal ids (the heart icon).
 */
import { create } from "zustand";

type FavoritesState = {
  ids: string[];
  toggle: (mealId: string) => void;
  isFavorite: (mealId: string) => boolean;
};

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  ids: [],
  toggle: (mealId) =>
    set((state) => ({
      ids: state.ids.includes(mealId)
        ? state.ids.filter((id) => id !== mealId)
        : [...state.ids, mealId],
    })),
  isFavorite: (mealId) => get().ids.includes(mealId),
}));
