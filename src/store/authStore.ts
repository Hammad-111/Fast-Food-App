import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
    user: User | null;
    login: (username: string, role: 'admin' | 'cashier') => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            login: (username: string, role: 'admin' | 'cashier') =>
                set({
                    user: { id: 1, username, role, full_name: 'Admin User' },
                    isAuthenticated: true,
                }),
            logout: () => set({ user: null, isAuthenticated: false }),
        }),
        {
            name: 'auth-storage',
        }
    )
);
