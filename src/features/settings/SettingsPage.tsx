import { useState } from 'react';
import { Settings as SettingsIcon, Bell, Shield, Palette, Database, Info, User, Mail, Phone, Globe, Lock, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

export const SettingsPage = () => {
    const [activeTab, setActiveTab] = useState('About');

    const sections = [
        { id: 'Account', icon: User, label: 'Account', desc: 'Profile & Permissions' },
        { id: 'Notifications', icon: Bell, label: 'Notifications', desc: 'System Alerts' },
        { id: 'Appearance', icon: Palette, label: 'Appearance', desc: 'Theme & UI' },
        { id: 'Security', icon: Shield, label: 'Security', desc: 'Privacy & Auth' },
        { id: 'Backup', icon: Database, label: 'Backup & Sync', desc: 'Cloud & Data' },
        { id: 'About', icon: Info, label: 'About', desc: 'Version & Developer' },
    ];

    const renderLink = (tab: string) => {
        const section = sections.find(s => s.id === tab);
        if (!section) return null;
        return (
            <button
                key={section.id}
                onClick={() => setActiveTab(section.id)}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${activeTab === section.id
                    ? 'bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]'
                    : 'text-muted-foreground hover:bg-white/5 hover:text-white'
                    }`}
            >
                <section.icon className="h-5 w-5" />
                <div className="text-left">
                    <p className={`text-sm font-bold leading-none ${activeTab === section.id ? 'text-white' : ''}`}>{section.label}</p>
                    <p className={`text-[10px] opacity-60 mt-1 ${activeTab === section.id ? 'hidden' : 'block'}`}>{section.desc}</p>
                </div>
            </button>
        );
    };

    return (
        <div className="max-w-6xl mx-auto py-6 px-4">
            <header className="mb-8">
                <h2 className="text-3xl font-black text-white flex items-center gap-3 italic tracking-tight">
                    <SettingsIcon className="h-8 w-8 text-primary animate-spin-slow" />
                    SYSTEM SETTINGS
                </h2>
                <p className="text-muted-foreground mt-1 text-sm">Control every aspect of your premium POS experience.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Sidebar */}
                <aside className="lg:col-span-3 space-y-2 bg-glass p-3 rounded-[2rem] border border-white/5">
                    {sections.map(s => renderLink(s.id))}
                </aside>

                {/* Main Content */}
                <main className="lg:col-span-9 bg-glass rounded-[2rem] border border-white/5 p-8 min-h-[600px] relative overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                            className="relative z-10"
                        >
                            {activeTab === 'Account' && (
                                <div className="space-y-6 relative opacity-70 cursor-not-allowed grayscale-[0.5]">
                                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-[2px] rounded-[2rem]">
                                        <Badge className="bg-primary text-white text-lg px-6 py-2 rounded-full shadow-2xl animate-pulse">COMING SOON</Badge>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Account Settings</h3>
                                        <p className="text-sm text-muted-foreground">Manage your profile details and access levels.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground ml-1">Full Name</label>
                                            <Input disabled defaultValue="Admin User" className="bg-white/5 border-white/10 rounded-xl" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-muted-foreground ml-1">Designation</label>
                                            <Input disabled defaultValue="System Administrator" className="bg-white/5 border-white/10 rounded-xl" />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-primary/10 rounded-2xl border border-primary/20">
                                        <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                                            <Lock className="w-4 h-4" /> Active Permissions
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {['Manage Sales', 'Inventory Control', 'System Config', 'User Management', 'Financial Reports'].map(p => (
                                                <Badge key={p} variant="secondary" className="bg-white/5 hover:bg-white/10 text-[10px]">{p}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <Button disabled className="rounded-xl px-8 shadow-lg shadow-primary/20">Save Profile</Button>
                                </div>
                            )}

                            {activeTab === 'Notifications' && (
                                <div className="space-y-6 relative opacity-70 cursor-not-allowed grayscale-[0.5]">
                                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-[2px] rounded-[2rem]">
                                        <Badge className="bg-primary text-white text-lg px-6 py-2 rounded-full shadow-2xl animate-pulse">COMING SOON</Badge>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Notifications</h3>
                                        <p className="text-sm text-muted-foreground">Configure how you want to be alerted.</p>
                                    </div>
                                    <div className="space-y-4">
                                        {[
                                            { label: 'New Order Alerts', desc: 'Get notified when a new order is received.', enabled: true },
                                            { label: 'Low Stock Warnings', desc: 'Alert when inventory items fall below threshold.', enabled: true },
                                            { label: 'System status updates', desc: 'Critical system maintenance or update alerts.', enabled: false },
                                            { label: 'Sound Notifications', desc: 'Play audible sounds for important events.', enabled: true },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                                                <div>
                                                    <p className="font-bold text-white">{item.label}</p>
                                                    <p className="text-xs text-muted-foreground">{item.desc}</p>
                                                </div>
                                                <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 cursor-not-allowed ${item.enabled ? 'bg-primary' : 'bg-white/10'}`}>
                                                    <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ${item.enabled ? 'translate-x-6' : 'translate-x-0'}`} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Appearance' && (
                                <div className="space-y-6 relative opacity-70 cursor-not-allowed grayscale-[0.5]">
                                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-[2px] rounded-[2rem]">
                                        <Badge className="bg-primary text-white text-lg px-6 py-2 rounded-full shadow-2xl animate-pulse">COMING SOON</Badge>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Appearance</h3>
                                        <p className="text-sm text-muted-foreground">Customize the look and feel of your terminal.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {['Dark Premium', 'Light Clean', 'Glass Morphic'].map(t => (
                                            <div key={t} className={`p-4 rounded-2xl border transition-all cursor-not-allowed ${t === 'Dark Premium' ? 'border-primary bg-primary/10' : 'border-white/5 bg-white/5 hover:bg-white/10'}`}>
                                                <div className={`h-24 rounded-lg mb-3 ${t === 'Dark Premium' ? 'bg-slate-900' : t === 'Light Clean' ? 'bg-slate-100' : 'bg-slate-800 backdrop-blur-md'}`} />
                                                <p className="text-sm font-bold text-center text-white">{t}</p>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="space-y-4 pt-4">
                                        <label className="text-sm font-medium text-muted-foreground ml-1">Sidebar Color</label>
                                        <div className="flex gap-3">
                                            {['blue', 'purple', 'emerald', 'rose', 'amber'].map(color => (
                                                <div key={color} className={`h-8 w-8 rounded-full cursor-not-allowed ring-offset-2 ring-offset-slate-900 transition-all ${color === 'blue' ? 'bg-blue-500 ring-2 ring-blue-500' : 'bg-' + color + '-500 opacity-50'}`} />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'Security' && (
                                <div className="space-y-6 relative opacity-70 cursor-not-allowed grayscale-[0.5]">
                                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-[2px] rounded-[2rem]">
                                        <Badge className="bg-primary text-white text-lg px-6 py-2 rounded-full shadow-2xl animate-pulse">COMING SOON</Badge>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Security</h3>
                                        <p className="text-sm text-muted-foreground">Configure terminal security and authentication.</p>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                                            <div className="flex items-center gap-3 text-white font-bold">
                                                <Lock className="w-5 h-5 text-primary" /> Two-Factor Authentication
                                            </div>
                                            <p className="text-xs text-muted-foreground">Add an extra layer of security to your terminal login.</p>
                                            <Button disabled variant="outline" className="rounded-xl border-white/10 hover:bg-white/5">Enable 2FA</Button>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-between">
                                            <div>
                                                <p className="font-bold text-white">Auto-lock Terminal</p>
                                                <p className="text-xs text-muted-foreground">Automatically lock terminal after 15 minutes of inactivity.</p>
                                            </div>
                                            <div className="w-12 h-6 bg-primary rounded-full p-1 relative cursor-not-allowed opacity-50">
                                                <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                                            </div>
                                        </div>
                                    </div>
                                    <Button disabled variant="destructive" className="rounded-xl px-8 ml-auto">Reset Security Token</Button>
                                </div>
                            )}

                            {activeTab === 'Backup' && (
                                <div className="space-y-6 relative opacity-70 cursor-not-allowed grayscale-[0.5]">
                                    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/5 backdrop-blur-[2px] rounded-[2rem]">
                                        <Badge className="bg-primary text-white text-lg px-6 py-2 rounded-full shadow-2xl animate-pulse">COMING SOON</Badge>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">Backup & Sync</h3>
                                        <p className="text-sm text-muted-foreground">Ensure your data is always safe and synchronized.</p>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center text-center space-y-4">
                                            <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <RefreshCw className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Manual Backup</h4>
                                                <p className="text-[10px] text-muted-foreground mt-1">Export local database to a .zip file</p>
                                            </div>
                                            <Button disabled variant="outline" className="w-full rounded-xl border-white/5">Generate Backup</Button>
                                        </div>
                                        <div className="p-6 bg-white/5 rounded-3xl border border-white/10 flex flex-col items-center text-center space-y-4">
                                            <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                                <Globe className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-white">Cloud Sync</h4>
                                                <p className="text-[10px] text-muted-foreground mt-1">Real-time sync with main server</p>
                                            </div>
                                            <Button disabled className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 shadow-lg shadow-emerald-500/20">Sync Now</Button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'About' && (
                                <div className="space-y-8">
                                    <div className="flex items-center gap-6">
                                        <div className="h-32 w-32 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center p-2 shadow-2xl shadow-primary/20 overflow-hidden">
                                            <img src="/logo.png" alt="Fast Foodies Logo" className="w-full h-full object-contain rounded-lg drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-white italic tracking-tighter">FAST FOODIES POS</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Badge variant="outline" className="border-primary/30 text-primary uppercase text-[10px] font-black">v2.4.0 (Stable)</Badge>
                                                <Badge variant="outline" className="border-white/10 text-muted-foreground text-[10px]">Release: Feb 2026</Badge>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {[
                                            { label: 'Database', status: 'Optimal', icon: Database, color: 'text-blue-500' },
                                            { label: 'Cloud Sync', status: 'Connected', icon: Globe, color: 'text-emerald-500' },
                                            { label: 'System Load', status: '0.42ms', icon: RefreshCw, color: 'text-amber-500' },
                                        ].map((stat, i) => (
                                            <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-3">
                                                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                                <div>
                                                    <p className="text-[10px] text-muted-foreground uppercase font-black">{stat.label}</p>
                                                    <p className="text-sm font-bold text-white">{stat.status}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-8 bg-gradient-to-br from-primary/20 to-purple-600/10 rounded-[2.5rem] border border-primary/20 relative overflow-hidden group">
                                        <div className="relative z-10 space-y-6">
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-black text-primary uppercase tracking-[0.2em]">Lead Developer</h4>
                                                <h3 className="text-3xl font-black text-white italic">Hammad Javed</h3>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <a href="mailto:Connect2hammadjaveed@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group/link p-3 bg-white/5 rounded-xl border border-white/5">
                                                    <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/link:bg-primary/20 group-hover/link:text-primary transition-all">
                                                        <Mail className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm font-medium">Connect2hammadjaveed@gmail.com</span>
                                                </a>
                                                <a href="tel:03017891391" className="flex items-center gap-3 text-muted-foreground hover:text-white transition-colors group/link p-3 bg-white/5 rounded-xl border border-white/5">
                                                    <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center group-hover/link:bg-primary/20 group-hover/link:text-primary transition-all">
                                                        <Phone className="h-4 w-4" />
                                                    </div>
                                                    <span className="text-sm font-medium">03017891391</span>
                                                </a>
                                            </div>

                                            <div className="pt-4 flex items-center gap-2">
                                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                                                <p className="text-[10px] text-muted-foreground">Certified Premium POS Solution for Fast Foodies © 2026</p>
                                            </div>
                                        </div>
                                        <div className="absolute top-0 right-0 p-8 h-full flex flex-col justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                                            <SettingsIcon className="w-40 h-40 -mr-20 animate-spin-slow" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Background Decorative Blob */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />
                </main>
            </div>
        </div>
    );
};

