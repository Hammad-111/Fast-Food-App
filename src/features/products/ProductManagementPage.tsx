import React, { useState } from 'react';
import { useProductStore } from '@/store/productStore';
import { Plus, Edit2, Trash2, Search, Utensils } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export const ProductManagementPage = () => {
    const { products, categories, addProduct, updateProduct, deleteProduct } = useProductStore();
    const [searchTerm, setSearchTerm] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category_id: categories[0]?.id || 1,
        image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop',
        is_available: true
    });

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            ...formData,
            price: parseFloat(formData.price),
        };

        if (editingId) {
            updateProduct(editingId, productData);
            setEditingId(null);
        } else {
            addProduct(productData);
            setIsAdding(false);
        }

        setFormData({
            name: '',
            price: '',
            category_id: categories[0]?.id || 1,
            image: formData.image,
            is_available: true
        });
    };

    const handleEdit = (p: typeof products[0]) => {
        setEditingId(p.id);
        setFormData({
            name: p.name,
            price: p.price.toString(),
            category_id: p.category_id,
            image: p.image || '',
            is_available: p.is_available
        });
        setIsAdding(true);
    };

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-2">
                        <Utensils className="h-8 w-8 text-primary" />
                        Menu Management
                    </h2>
                    <p className="text-muted-foreground mt-1">Add, edit, or remove items from your store.</p>
                </div>
                <Button
                    onClick={() => { setIsAdding(true); setEditingId(null); }}
                    className="bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg shadow-primary/20 h-11 px-6 rounded-xl"
                >
                    <Plus className="h-5 w-5" />
                    Add New Item
                </Button>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                {/* Product List */}
                <div className="xl:col-span-2 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <AnimatePresence mode="popLayout">
                            {filtered.map((product) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={product.id}
                                    className="bg-glass rounded-2xl p-4 flex gap-4 group hover:border-primary/50 transition-colors"
                                >
                                    <div className="h-20 w-20 rounded-xl overflow-hidden bg-muted flex-shrink-0 animate-pulse-slow">
                                        <img src={product.image} alt={product.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-white truncate">{product.name}</h3>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => handleEdit(product)} className="p-1.5 hover:bg-white/10 rounded-lg text-blue-400">
                                                    <Edit2 className="h-3.5 w-3.5" />
                                                </button>
                                                <button onClick={() => deleteProduct(product.id)} className="p-1.5 hover:bg-destructive/10 rounded-lg text-destructive">
                                                    <Trash2 className="h-3.5 w-3.5" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {categories.find(c => c.id === product.category_id)?.name}
                                        </p>
                                        <div className="flex items-center justify-between mt-2">
                                            <span className="text-primary font-bold flex items-center gap-0.5">
                                                <span className="text-xs font-black">Rs.</span>
                                                {product.price}
                                            </span>
                                            <span className={cn(
                                                "text-[10px] px-2 py-0.5 rounded-full font-medium uppercase tracking-wider",
                                                product.is_available ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                                            )}>
                                                {product.is_available ? 'Available' : 'Out of Stock'}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                </div>

                {/* Editor Sidebar */}
                <aside>
                    <AnimatePresence>
                        {isAdding && (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="bg-glass rounded-3xl p-6 sticky top-8 border-primary/20 border shadow-2xl shadow-primary/5"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xl font-bold text-white">
                                        {editingId ? 'Edit Item' : 'Add New Item'}
                                    </h3>
                                    <button
                                        onClick={() => { setIsAdding(false); setEditingId(null); }}
                                        className="text-muted-foreground hover:text-white"
                                    >
                                        <Plus className="h-5 w-5 rotate-45" />
                                    </button>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Product Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Price (PKR)</label>
                                            <input
                                                required
                                                type="number"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                                                value={formData.price}
                                                onChange={e => setFormData({ ...formData, price: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</label>
                                            <select
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none appearance-none"
                                                value={formData.category_id}
                                                onChange={e => setFormData({ ...formData, category_id: parseInt(e.target.value) })}
                                            >
                                                {categories.map(c => (
                                                    <option key={c.id} value={c.id} className="bg-zinc-900">{c.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Image URL</label>
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-primary/50 outline-none"
                                            value={formData.image}
                                            onChange={e => setFormData({ ...formData, image: e.target.value })}
                                        />
                                    </div>

                                    <div className="flex items-center gap-2 py-2">
                                        <input
                                            type="checkbox"
                                            id="available"
                                            checked={formData.is_available}
                                            onChange={e => setFormData({ ...formData, is_available: e.target.checked })}
                                            className="h-4 w-4 rounded border-white/10 bg-white/5 text-primary focus:ring-primary"
                                        />
                                        <label htmlFor="available" className="text-sm text-muted-foreground">Is Available in Stock</label>
                                    </div>

                                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white h-12 rounded-xl font-bold shadow-lg shadow-primary/20">
                                        {editingId ? 'Save Changes' : 'Create Product'}
                                    </Button>
                                </form>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {!isAdding && (
                        <div className="bg-glass rounded-3xl p-8 border border-white/5 text-center space-y-4">
                            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto text-primary">
                                <Plus className="h-8 w-8" />
                            </div>
                            <h3 className="text-lg font-bold text-white">No Item Selected</h3>
                            <p className="text-sm text-muted-foreground">Select an item to edit or click the button above to add a new delicious product to your menu.</p>
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};
