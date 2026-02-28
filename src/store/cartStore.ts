import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product, HeldOrder } from '@/types';

interface CartState {
    items: CartItem[];
    discount: number;
    heldOrders: HeldOrder[];

    // Actions
    addItem: (product: Product, quantity?: number) => void;
    removeItem: (cartId: string) => void;
    updateQuantity: (cartId: string, quantity: number) => void;
    clearCart: () => void;
    applyDiscount: (amount: number) => void;
    holdOrder: (name?: string) => void;
    recallOrder: (orderId: string) => void;

    // Getters
    getSubtotal: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            discount: 0,
            heldOrders: [],

            getSubtotal: () => {
                return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
            },

            applyDiscount: (amount) => set({ discount: amount }),

            addItem: (product: Product, quantity = 1) => {
                set((state) => {
                    const existingItemIndex = state.items.findIndex(
                        (item) => item.id === product.id
                    );

                    if (existingItemIndex > -1) {
                        const newItems = [...state.items];
                        newItems[existingItemIndex].quantity += quantity;
                        return { items: newItems };
                    } else {
                        const newItem: CartItem = {
                            ...product,
                            cartId: crypto.randomUUID(),
                            quantity: quantity,
                        };
                        return { items: [...state.items, newItem] };
                    }
                });
            },

            removeItem: (cartId: string) => {
                set((state) => ({
                    items: state.items.filter((item) => item.cartId !== cartId),
                }));
            },

            updateQuantity: (cartId: string, quantity: number) => {
                set((state) => {
                    if (quantity <= 0) {
                        return { items: state.items.filter((item) => item.cartId !== cartId) };
                    }
                    return {
                        items: state.items.map((item) =>
                            item.cartId === cartId ? { ...item, quantity } : item
                        ),
                    };
                });
            },

            setDiscount: (discount: number) => set({ discount }),

            clearCart: () => set({ items: [], discount: 0 }),

            holdOrder: () => {
                const { items, discount } = get();
                if (items.length === 0) return;

                const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
                const grandTotal = subtotal - discount;

                const heldOrder: HeldOrder = {
                    id: crypto.randomUUID(),
                    items: [...items],
                    subtotal,
                    discount,
                    grand_total: grandTotal,
                    timestamp: Date.now(),
                };

                set((state) => ({
                    heldOrders: [...state.heldOrders, heldOrder],
                    items: [],
                    discount: 0,
                }));
            },

            recallOrder: (heldOrderId: string) => {
                set((state) => {
                    const orderToRecall = state.heldOrders.find((o) => o.id === heldOrderId);
                    if (!orderToRecall) return {};

                    return {
                        items: orderToRecall.items,
                        discount: orderToRecall.discount,
                        heldOrders: state.heldOrders.filter((o) => o.id !== heldOrderId),
                    };
                });
            },

            removeHeldOrder: (heldOrderId: string) => {
                set((state) => ({
                    heldOrders: state.heldOrders.filter((o) => o.id !== heldOrderId)
                }))
            }
        }),
        {
            name: 'cart-storage',
            partialize: (state) => ({ heldOrders: state.heldOrders }),
        }
    )
);
