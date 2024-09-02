import { create } from 'zustand';

interface SidebarState {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  close: () => set({ isOpen: false }),
}));

// This is the new hook that will allow for destructuring
export const useSidebar = () => {
  const store = useSidebarStore();
  return {
    isOpen: store.isOpen,
    toggle: store.toggle,
    close: store.close,
  };
};