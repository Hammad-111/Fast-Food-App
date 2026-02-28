import { Outlet, NavLink } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { LayoutDashboard, ShoppingCart, UtensilsCrossed, LogOut, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Background } from '@/components/ui/Background';
import { motion, AnimatePresence } from 'framer-motion';

export const MainLayout = () => {
    const logout = useAuthStore((state) => state.logout);
    const user = useAuthStore((state) => state.user);

    const navItems = [
        { to: '/', icon: ShoppingCart, label: 'Billing' },
        { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/products', icon: UtensilsCrossed, label: 'Menu' },
        { to: '/settings', icon: Settings, label: 'Settings' },
    ];

    return (
        <div className="flex h-screen text-foreground overflow-hidden relative">
            <Background />

            {/* Sidebar */}
            <aside className="w-64 bg-glass border-r border-white/10 hidden md:flex flex-col z-50">
                <div className="p-6 border-b border-white/5 backdrop-blur-md flex flex-col items-center justify-center text-center">
                    <img src="/logo.png" alt="Fast Foodies Logo" className="w-24 h-24 object-contain rounded-lg p-1 bg-white/5 mb-3 border border-white/5 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                    <h1 className="text-2xl font-black bg-gradient-to-r from-primary via-blue-400 to-purple-500 bg-clip-text text-transparent text-glow uppercase tracking-tight">
                        Fast Foodies
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60 mt-1 font-semibold">
                        Premium POS System
                    </p>
                </div>

                <nav className="flex-1 p-4 space-y-1.5 mt-4">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.to}
                            to={item.to}
                            className={({ isActive }) =>
                                cn(
                                    "group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative overflow-hidden",
                                    isActive
                                        ? "text-primary-foreground shadow-[0_0_20px_rgba(168,85,247,0.2)]"
                                        : "hover:bg-white/5 text-muted-foreground hover:text-white"
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-active"
                                            className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 -z-10"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                    <item.icon className={cn("h-5 w-5 transition-transform duration-300 group-hover:scale-110", isActive && "stroke-[2.5px]")} />
                                    <span className="font-medium">{item.label}</span>
                                </>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5 bg-white/5 backdrop-blur-xl">
                    <div className="flex items-center gap-3 px-4 py-3 mb-4 rounded-xl bg-white/5 border border-white/10">
                        <div className="h-9 w-9 rounded-lg bg-gradient-to-tr from-primary to-purple-600 flex items-center justify-center text-white font-bold shadow-lg">
                            {user?.username?.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold truncate">{user?.full_name}</p>
                            <p className="text-[10px] uppercase tracking-wider text-muted-foreground/80 truncate">{user?.role}</p>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        className="w-full justify-start gap-2 hover:bg-destructive/10 hover:text-destructive transition-colors rounded-xl h-11"
                        onClick={() => logout()}
                    >
                        <LogOut className="h-4 w-4" />
                        <span className="font-medium">Logout</span>
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative z-10">
                <div className="flex-1 overflow-auto p-4 md:p-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="h-full"
                        >
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};
