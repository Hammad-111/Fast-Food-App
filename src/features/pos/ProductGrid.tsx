import { useEffect, useState, useRef, useMemo } from 'react';
import { useProductStore } from '@/store/productStore';
import { useCartStore } from '@/store/cartStore';
import { Card, CardContent } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductGrid = () => {
    const products = useProductStore((state) => state.products);
    const activeCategoryId = useProductStore((state) => state.activeCategoryId);
    const searchQuery = useProductStore((state) => state.searchQuery);
    const addItem = useCartStore((state) => state.addItem);

    // Compute filtered products here instead of in the store to avoid reference issues
    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (activeCategoryId) {
            filtered = filtered.filter((p) => p.category_id === activeCategoryId);
        }

        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            filtered = filtered.filter((p) => p.name.toLowerCase().includes(lowerQuery));
        }

        return filtered;
    }, [products, activeCategoryId, searchQuery]);

    // Lazy loading state
    const [visibleCount, setVisibleCount] = useState(12);
    const loadMoreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setVisibleCount((prev) => Math.min(prev + 12, filteredProducts.length));
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) {
            observer.observe(loadMoreRef.current);
        }

        return () => observer.disconnect();
    }, [filteredProducts.length]);

    const visibleProducts = filteredProducts.slice(0, visibleCount);

    return (
        <div key={`${activeCategoryId}-${searchQuery}`} className="flex-1 overflow-y-auto p-4 custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <AnimatePresence mode='popLayout'>
                    {visibleProducts.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            layout
                        >
                            <Card
                                className="h-full cursor-pointer hover:shadow-lg transition-all border-border/50 bg-card/50 hover:bg-card group overflow-hidden relative"
                                onClick={() => product.is_available && addItem(product)}
                            >
                                <CardContent className="p-0 flex flex-col h-full text-center relative z-10">
                                    <div className="w-full relative overflow-hidden bg-primary/10 h-36 rounded-t-lg">
                                        {product.image ? (
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-primary group-hover:scale-110 transition-transform duration-500">
                                                <span className="text-4xl font-black opacity-30">{product.name.charAt(0)}</span>
                                            </div>
                                        )}
                                        {/* Subtle gradient overlay to make it look premium */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between p-4 bg-card/40 backdrop-blur-sm relative z-20 -mt-2">
                                        <h3 className="font-semibold text-sm line-clamp-2 leading-tight mb-2 drop-shadow-md">{product.name}</h3>
                                        <div className="w-full mt-auto">
                                            <span className="block text-lg font-bold text-primary drop-shadow-md">Rs. {product.price}</span>
                                            {!product.is_available && (
                                                <span className="inline-block mt-1 text-xs text-destructive font-bold px-2 py-0.5 rounded-full bg-destructive/10 border border-destructive/20">Out of Stock</span>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                                {/* Hover Effect Overlay */}
                                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                            </Card>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Infinite Scroll Trigger */}
            {visibleCount < filteredProducts.length && (
                <div ref={loadMoreRef} className="h-10 w-full flex items-center justify-center p-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
            )}

            {filteredProducts.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                    <p>No products found.</p>
                </div>
            )}
        </div>
    );
};
