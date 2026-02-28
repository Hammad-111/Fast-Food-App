import { Button } from '@/components/ui/button';
import { useProductStore } from '@/store/productStore';
import { cn } from '@/lib/utils';

export const CategoryFilter = () => {
    const categories = useProductStore((state) => state.categories); // Directly access state.categories
    const activeCategoryId = useProductStore((state) => state.activeCategoryId);
    const setCategory = useProductStore((state) => state.setCategory);

    return (
        <div className="w-full bg-card border-b border-border py-2">
            <div className="flex overflow-x-auto pb-2 px-2 gap-2 no-scrollbar" style={{ scrollbarWidth: 'none' }}>
                <Button
                    variant={activeCategoryId === null ? 'default' : 'outline'}
                    onClick={() => setCategory(null)}
                    className={cn(
                        "rounded-full px-6 transition-all",
                        activeCategoryId === null ? "shadow-md scale-105" : "hover:bg-accent/50"
                    )}
                >
                    All Items
                </Button>
                {categories.map((category) => (
                    <Button
                        key={category.id}
                        variant={activeCategoryId === category.id ? 'default' : 'outline'}
                        onClick={() => setCategory(category.id)}
                        className={cn(
                            "rounded-full px-6 whitespace-nowrap transition-all",
                            activeCategoryId === category.id ? "shadow-md scale-105" : "hover:bg-accent/50"
                        )}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};
