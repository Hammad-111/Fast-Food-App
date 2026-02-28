import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock, User } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore((state) => state.login);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === 'admin123') {
            login(username, 'admin');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-700" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="z-10 w-full max-w-md"
            >
                <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
                    <div className="text-center mb-8 flex flex-col items-center">
                        <img src="/logo.png" alt="Fast Foodies Logo" className="w-28 h-28 object-contain rounded-lg p-1 bg-white/5 shadow-[0_0_30px_rgba(255,255,255,0.15)] mb-4 border border-white/10" />
                        <h1 className="text-4xl font-black text-white mb-2 uppercase tracking-tight">Fast Foodies</h1>
                        <p className="text-white/60 font-bold tracking-widest uppercase text-sm">Premium POS System</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                                <Input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:ring-primary/50"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-5 w-5 text-white/50" />
                                <Input
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus:ring-primary/50"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                        <Button
                            type="submit"
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-6 text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                        >
                            Access System
                        </Button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};
