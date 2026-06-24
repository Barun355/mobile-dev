import { create } from "zustand";

interface ScreenCountState {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
}

export const useScreenCountStore = create<ScreenCountState>()((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 })
}));