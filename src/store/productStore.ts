import { create } from 'zustand';
import type { Product, Category } from '@/types';
import { PRODUCTS, CATEGORIES } from '@/lib/data';

interface ProductState {
    products: Product[];
    categories: Category[];
    activeCategoryId: number | null;
    searchQuery: string;
    setCategory: (id: number | null) => void;
    setSearchQuery: (query: string) => void;
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: number, updates: Partial<Product>) => void;
    deleteProduct: (id: number) => void;
}

import { persist } from 'zustand/middleware';

export const useProductStore = create<ProductState>()(
    persist(
        (set) => ({
            products: PRODUCTS,
            categories: CATEGORIES,
            activeCategoryId: null,
            searchQuery: '',
            setCategory: (id: number | null) => set({ activeCategoryId: id }),
            setSearchQuery: (query: string) => set({ searchQuery: query }),
            addProduct: (product: Omit<Product, 'id'>) => set((state) => ({
                products: [...state.products, { ...product, id: Math.max(0, ...state.products.map(p => p.id)) + 1 }]
            })),
            updateProduct: (id: number, updates: Partial<Product>) => set((state) => ({
                products: state.products.map((p) => p.id === id ? { ...p, ...updates } : p)
            })),
            deleteProduct: (id: number) => set((state) => ({
                products: state.products.filter((p) => p.id !== id)
            })),
        }),
        {
            name: 'fastfoodies-pos-catalog',
            partialize: (state) => ({ products: state.products, categories: state.categories }),
        }
    )
);
