import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCartStore } from '@/store/cartStore';
import { useOrderStore } from '@/store/orderStore';
import { useState, useEffect } from 'react';
import { Banknote, CreditCard, Receipt } from 'lucide-react';
import toast from 'react-hot-toast';

interface CheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPrintReceipt: (orderData: any) => void;
}

export const CheckoutModal = ({ isOpen, onClose, onPrintReceipt }: CheckoutModalProps) => {
    const { items, getSubtotal, discount } = useCartStore();
    const clearCart = useCartStore(state => state.clearCart);
    const completeOrder = useOrderStore(state => state.addOrder);

    const subtotal = getSubtotal();
    const totalAmount = subtotal - discount;

    const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
    const [amountPaidStr, setAmountPaidStr] = useState<string>('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setAmountPaidStr('');
            setPaymentMethod('cash');
        }
    }, [isOpen]);

    const amountPaid = parseFloat(amountPaidStr) || 0;
    const change = Math.max(0, amountPaid - totalAmount);
    const isReadyToComplete = paymentMethod === 'card' || amountPaid >= totalAmount;

    const predefinedCashAmounts = [
        totalAmount,
        Math.ceil(totalAmount / 500) * 500,
        Math.ceil(totalAmount / 1000) * 1000,
        5000
    ].filter((v, i, a) => a.indexOf(v) === i && v >= totalAmount); // Only unique amounts >= total

    const handleComplete = async () => {
        if (!isReadyToComplete) return;
        setIsProcessing(true);

        try {
            const orderData = {
                items: [...items],
                subtotal,
                discount,
                total: totalAmount,
                paymentMethod,
                amountPaid: paymentMethod === 'cash' ? amountPaid : totalAmount,
                change: paymentMethod === 'cash' ? change : 0,
            };

            const orderId = completeOrder(orderData);

            // Pass the generated ID back to the component for printing
            onPrintReceipt({ ...orderData, id: orderId, date: new Date().toISOString() });

            toast.success(`Order ${orderId} completed successfully!`);
            clearCart();
            onClose();
        } catch (error) {
            toast.error("Failed to complete order.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] border-border/50 bg-background/95 backdrop-blur-xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                        <Receipt className="w-6 h-6 text-primary" />
                        Complete Order
                    </DialogTitle>
                </DialogHeader>

                <div className="grid gap-6 py-4">
                    {/* Summary Card */}
                    <div className="bg-secondary/30 rounded-xl p-4 space-y-2 border border-border/50">
                        <div className="flex justify-between text-sm text-muted-foreground">
                            <span>Subtotal ({items.length} items)</span>
                            <span>Rs. {subtotal}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex justify-between text-sm text-destructive">
                                <span>Discount</span>
                                <span>- Rs. {discount}</span>
                            </div>
                        )}
                        <div className="pt-2 border-t border-border flex justify-between items-center">
                            <span className="font-semibold text-lg">Total Due</span>
                            <span className="font-black text-2xl text-primary">Rs. {totalAmount}</span>
                        </div>
                    </div>

                    {/* Payment Method */}
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-muted-foreground">Payment Method</label>
                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                type="button"
                                variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                                className={`h-14 w-full flex-col gap-1 transition-all ${paymentMethod === 'cash' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                                onClick={() => setPaymentMethod('cash')}
                            >
                                <Banknote className="w-5 h-5" />
                                <span>Cash</span>
                            </Button>
                            <Button
                                type="button"
                                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                                className={`h-14 w-full flex-col gap-1 transition-all ${paymentMethod === 'card' ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''}`}
                                onClick={() => setPaymentMethod('card')}
                            >
                                <CreditCard className="w-5 h-5" />
                                <span>Card</span>
                            </Button>
                        </div>
                    </div>

                    {/* Cash Handling */}
                    {paymentMethod === 'cash' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-muted-foreground">Amount Paid</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">Rs.</span>
                                    <Input
                                        type="number"
                                        className="pl-10 h-14 text-xl font-bold bg-secondary/20"
                                        placeholder="0"
                                        value={amountPaidStr}
                                        onChange={(e) => setAmountPaidStr(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {predefinedCashAmounts.map(amount => (
                                    <Button
                                        key={amount}
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        className="flex-1 min-w-[80px]"
                                        onClick={() => setAmountPaidStr(amount.toString())}
                                    >
                                        Rs. {amount}
                                    </Button>
                                ))}
                            </div>

                            {amountPaid > 0 && (
                                <div className={`flex justify-between items-center p-4 rounded-xl border ${amountPaid >= totalAmount ? 'bg-primary/10 border-primary/20 text-primary' : 'bg-destructive/10 border-destructive/20 text-destructive'}`}>
                                    <span className="font-medium">Change to Return</span>
                                    <span className="font-black text-xl">
                                        Rs. {amountPaid >= totalAmount ? change : 'Inexact'}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <Button
                        size="lg"
                        className="w-full h-14 text-lg font-bold mt-2"
                        disabled={!isReadyToComplete || isProcessing}
                        onClick={handleComplete}
                    >
                        {isProcessing ? "Processing..." : "Complete & Print Receipt"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
