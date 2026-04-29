import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  eggType?: "Egg" | "Eggless";
  weight?: string;
  customMessage?: string;
  deliveryDate?: string;
  deliverySlot?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, weight?: string) => void;
  updateQuantity: (id: string, quantity: number, weight?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (newItem) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) => item.id === newItem.id && item.weight === newItem.weight && item.eggType === newItem.eggType
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += newItem.quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...items, newItem] });
        }
      },

      removeItem: (id, weight) => {
        set({
          items: get().items.filter((item) => !(item.id === id && item.weight === weight)),
        });
      },

      updateQuantity: (id, quantity, weight) => {
        if (quantity <= 0) {
          get().removeItem(id, weight);
          return;
        }
        const updatedItems = get().items.map((item) =>
          item.id === id && item.weight === weight ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => set({ items: [] }),

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
    }),
    {
      name: "taubys-cart",
    }
  )
);
