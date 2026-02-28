import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Minus, Receipt, Clock, Save, Search, Percent } from 'lucide-react';
import { CheckoutModal } from './CheckoutModal';
import toast from 'react-hot-toast';
import { ReceiptPrint } from './ReceiptPrint';
import type { Order } from '@/store/orderStore';

export const Cart = () => {
    const { items, removeItem, updateQuantity, getSubtotal, clearCart, applyDiscount, discount, holdOrder } = useCartStore();
    const subtotal = getSubtotal();
    const total = subtotal - discount;

    const [isDiscountOpen, setIsDiscountOpen] = useState(false);
    const [discountInput, setDiscountInput] = useState('');
    const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('fixed');

    // New State for Modal and Receipt
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [isReceiptOpen, setIsReceiptOpen] = useState(false);
    const [orderToPrint, setOrderToPrint] = useState<Order | null>(null);

    const handleApplyDiscount = () => {
        const val = parseFloat(discountInput);
        if (isNaN(val) || val < 0) {
            toast.error("Valid discount required");
            return;
        }

        if (discountType === 'percent') {
            if (val > 100) return toast.error("Max 100%");
            applyDiscount(subtotal * (val / 100));
        } else {
            if (val > subtotal) return toast.error("Discount exceeds total");
            applyDiscount(val);
        }
        setIsDiscountOpen(false);
        setDiscountInput('');
        toast.success("Discount Applied");
    };

    const handleHoldOrder = () => {
        if (items.length === 0) return toast.error("Cart is empty");
        const name = prompt("Enter customer name or table number for this order:");
        if (name) {
            holdOrder(name);
            toast.success(`Order held for ${name}`);
        }
    };

    const handlePrintReceipt = (orderData: Order) => {
        setOrderToPrint(orderData);
        setIsReceiptOpen(true);
    };

    return (
        <div className="flex flex-col h-full bg-card/50 backdrop-blur-xl border-l border-border/50 shadow-2xl z-10">
            {/* ... Cart Header ... */}
            <div className="p-4 border-b border-border/50 bg-background/50 flex items-center justify-between sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <Receipt className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="font-bold text-lg leading-tight">Current Order</h2>
                        <p className="text-xs text-muted-foreground">{items.length} items • <span className="font-semibold text-primary">Table 4</span></p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary" title="Search Order">
                        <Search className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-secondary" title="Hold Order" onClick={handleHoldOrder}>
                        <Save className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10" onClick={clearCart} title="Clear Cart">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            {/* ... Cart Items ... */}
            <ScrollArea className="flex-1 p-3">
                {items.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-muted-foreground space-y-4 opacity-60">
                        <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center">
                            <Receipt className="w-12 h-12" />
                        </div>
                        <p className="text-sm font-medium">Cart is empty</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {items.map((item) => (
                            <div key={item.cartId} className="flex gap-3 p-3 bg-background rounded-xl border border-border/50 shadow-sm relative group animate-in slide-in-from-right-2 duration-300">
                                <div className="w-16 h-16 rounded-lg bg-secondary/30 overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xl font-bold text-primary/30 uppercase">{item.name.charAt(0)}</div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between items-start pr-6">
                                        <h4 className="font-semibold text-sm leading-tight line-clamp-2">{item.name}</h4>
                                        <span className="font-bold text-sm text-primary whitespace-nowrap ml-2">Rs. {item.price * item.quantity}</span>
                                    </div>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="flex items-center bg-secondary/50 rounded-lg p-0.5 border border-border/50">
                                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-background hover:text-primary" onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>
                                                <Minus className="w-3 h-3" />
                                            </Button>
                                            <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md hover:bg-background hover:text-primary" onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>
                                                <Plus className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute top-2 right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                                    onClick={() => removeItem(item.cartId)}
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </ScrollArea>

            {/* ... Cart Footer ... */}
            <div className="p-4 bg-background/80 backdrop-blur-md border-t border-border/50 space-y-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.3)] z-20">
                {/* Discount Section */}
                {isDiscountOpen ? (
                    <div className="flex items-center gap-2 animate-in slide-in-from-bottom-2">
                        <Input
                            type="number"
                            placeholder="Amount"
                            className="h-9"
                            value={discountInput}
                            onChange={(e) => setDiscountInput(e.target.value)}
                            autoFocus
                        />
                        <div className="flex bg-secondary p-1 rounded-md">
                            <Button size="sm" variant={discountType === 'percent' ? 'default' : 'ghost'} className="h-7 px-2" onClick={() => setDiscountType('percent')}>%</Button>
                            <Button size="sm" variant={discountType === 'fixed' ? 'default' : 'ghost'} className="h-7 px-2" onClick={() => setDiscountType('fixed')}>Rs</Button>
                        </div>
                        <Button size="sm" variant="default" className="h-9" onClick={handleApplyDiscount}>Apply</Button>
                        <Button size="sm" variant="ghost" className="h-9 w-9 p-0" onClick={() => setIsDiscountOpen(false)}>×</Button>
                    </div>
                ) : (
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Subtotal</span>
                            <span className="font-semibold text-foreground">Rs. {subtotal}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground items-center">
                            <span className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors" onClick={() => setIsDiscountOpen(true)}>
                                Discount <Percent className="w-3 h-3" />
                            </span>
                            {discount > 0 ? (
                                <span className="font-semibold text-destructive flex items-center gap-2">
                                    - Rs. {discount}
                                    <Button size="icon" variant="ghost" className="h-5 w-5 hover:bg-destructive/10 hover:text-destructive p-0" onClick={() => applyDiscount(0)}>×</Button>
                                </span>
                            ) : (
                                <span>Rs. 0</span>
                            )}
                        </div>
                        <div className="flex justify-between text-lg font-black pt-2 border-t border-border mt-2">
                            <span>Total</span>
                            <span className="text-primary text-2xl drop-shadow-sm">Rs. {total < 0 ? 0 : total}</span>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3 pt-2">
                    <Button variant="outline" className="h-14 font-bold border-2 hover:bg-secondary/50" disabled={items.length === 0} onClick={handleHoldOrder}>
                        <Clock className="w-5 h-5 mr-2 text-muted-foreground" />
                        Hold
                    </Button>
                    <Button
                        className="h-14 text-lg font-black shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-0.5"
                        disabled={items.length === 0}
                        onClick={() => setIsCheckoutOpen(true)}
                    >
                        Charge
                    </Button>
                </div>
            </div>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                onPrintReceipt={handlePrintReceipt}
            />
            <ReceiptPrint
                order={orderToPrint}
                isOpen={isReceiptOpen}
                onClose={() => setIsReceiptOpen(false)}
            />
        </div>
    );
};
