import { CategoryFilter } from './CategoryFilter';
import { ProductGrid } from './ProductGrid';
import { Cart } from './Cart';

import { useProductStore } from '@/store/productStore';

export const POSPage = () => {
    const activeCategoryId = useProductStore((state) => state.activeCategoryId);
    const searchQuery = useProductStore((state) => state.searchQuery);

    return (
        <div className="h-full flex flex-col md:flex-row gap-0 md:gap-4 overflow-hidden">
            {/* Left Side: Product Catalog */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-background md:rounded-xl md:border md:border-border shadow-sm">
                <CategoryFilter />
                <ProductGrid key={`${activeCategoryId}-${searchQuery}`} />
            </div>

            {/* Right Side: Cart */}
            <div className="w-full md:w-[400px] h-[40vh] md:h-full bg-background md:rounded-xl md:border md:border-border overflow-hidden shadow-xl z-20">
                <Cart />
            </div>
        </div>
    );
};
