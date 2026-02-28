import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

export interface Order {
    id: string;
    items: CartItem[];
    subtotal: number;
    discount: number;
    total: number;
    paymentMethod: 'cash' | 'card';
    amountPaid?: number;
    change?: number;
    date: string;
}

interface OrderState {
    orders: Order[];
    addOrder: (orderData: Omit<Order, 'id' | 'date'>) => string;
    clearOrders: () => void;
    // Selectors for Dashboard
    getTotalRevenue: () => number;
    getTotalOrders: () => number;
    getChartData: () => { name: string; total: number }[];
    getBestSellers: () => { name: string; sales: number }[];
}

export const useOrderStore = create<OrderState>()(
    persist(
        (set, get) => ({
            orders: [],

            addOrder: (orderData) => {
                const newOrder: Order = {
                    ...orderData,
                    id: `ORD-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
                    date: new Date().toISOString(),
                };

                set((state) => ({
                    orders: [newOrder, ...state.orders]
                }));

                return newOrder.id;
            },

            clearOrders: () => set({ orders: [] }),

            getTotalRevenue: () => {
                return get().orders.reduce((sum, order) => sum + order.total, 0);
            },

            getTotalOrders: () => {
                return get().orders.length;
            },

            getChartData: () => {
                const orders = get().orders;
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                const data = days.map(day => ({ name: day, total: 0 }));

                orders.forEach(order => {
                    const date = new Date(order.date);
                    const dayIndex = date.getDay();
                    data[dayIndex].total += order.total;
                });

                // Reorder array so today is last (optional, or just ordered by Mon-Sun)
                return data;
            },

            getBestSellers: () => {
                const itemsMap = new Map<string, number>();

                get().orders.forEach(order => {
                    order.items.forEach(item => {
                        const current = itemsMap.get(item.name) || 0;
                        itemsMap.set(item.name, current + item.quantity);
                    });
                });

                return Array.from(itemsMap.entries())
                    .map(([name, sales]) => ({ name, sales }))
                    .sort((a, b) => b.sales - a.sales)
                    .slice(0, 5);
            }
        }),
        {
            name: 'fastfoodies-pos-orders',
        }
    )
);
