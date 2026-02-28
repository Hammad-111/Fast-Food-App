export interface User {
    id: number;
    username: string;
    role: 'admin' | 'cashier';
    full_name: string;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
}

export interface Product {
    id: number;
    name: string;
    category_id: number;
    price: number;
    image?: string;
    description?: string;
    is_available: boolean;
}

export interface CartItem extends Product {
    cartId: string; // unique id for cart item (to handle variants/modifiers if needed later)
    quantity: number;
}

export interface Order {
    id: string; // innovative ID like INV-20260219-0001
    invoice_number: string;
    subtotal: number;
    discount: number;
    grand_total: number;
    cashier_id: number;
    order_date: string;
    items: CartItem[];
    status: 'completed' | 'held' | 'cancelled';
    payment_method: 'cash' | 'card';
}

export interface HeldOrder {
    id: string;
    name?: string; // Optional name reference for the held order
    items: CartItem[];
    subtotal: number;
    discount: number;
    grand_total: number;
    timestamp: number;
}
