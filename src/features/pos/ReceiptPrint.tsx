import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';
import type { Order } from '@/store/orderStore';

interface ReceiptPrintProps {
    order: Order | null;
    isOpen: boolean;
    onClose: () => void;
}

export const ReceiptPrint = ({ order, isOpen, onClose }: ReceiptPrintProps) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!order) return null;

    const handlePrint = () => {
        window.print();
    };

    // Shared receipt content for both screen and print
    const ReceiptContent = () => (
        <>
            <div className="text-center mb-4 leading-tight w-full">
                <h1 className="text-xl font-black uppercase tracking-tight">FAST FOODIES PIZZA</h1>
                <p className="text-[12px] font-bold">Near Govt Boys High School</p>
                <p className="text-[12px] font-bold">105/15-L, Wanjari</p>
                <div className="mt-2 text-[13px] font-black leading-tight inline-block text-center whitespace-pre-wrap">
                    CALL FOR DELIVERY:{'\n'}
                    0312-5240181{'\n'}
                    0326-6783124
                </div>
            </div>

            <div className="w-full text-[14px] font-mono break-all leading-none mb-2">
                =======================================
            </div>

            <div className="w-full text-left font-bold text-[15px] mb-2 px-2">
                Date: {new Date(order.date).toLocaleString([], { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).replace(/\//g, '-').replace(',', '')}
            </div>

            <div className="w-full text-[14px] font-mono break-all leading-none mb-4">
                ---------------------------------------
            </div>

            <div className="w-full space-y-4 mb-6 px-2">
                {order.items.map((item) => (
                    <div key={item.cartId} className="space-y-1">
                        <div className="text-[16px] font-black uppercase leading-tight">
                            {item.quantity} {item.name}
                        </div>
                        <div className="text-[14px] font-bold">
                            {item.quantity} x Rs.{item.price.toFixed(2)} = Rs.{(item.price * item.quantity).toFixed(2)}
                        </div>
                    </div>
                ))}
            </div>

            <div className="w-full text-[14px] font-mono break-all leading-none mb-2">
                ---------------------------------------
            </div>

            <div className="w-full flex-row flex justify-between px-2 text-[15px] font-bold mb-2">
                <span>Subtotal:</span>
                <span>Rs.{order.subtotal.toFixed(2)}</span>
            </div>

            {order.discount > 0 && (
                <div className="w-full flex-row flex justify-between px-2 text-[14px] font-bold mb-4">
                    <span>Discount:</span>
                    <span>-Rs.{order.discount.toFixed(2)}</span>
                </div>
            )}

            <div className="w-full text-[14px] font-mono break-all leading-none mb-3">
                =======================================
            </div>

            <div className="w-full text-center mb-3">
                <div className="text-2xl font-black">TOTAL: Rs.{order.total.toFixed(2)}</div>
            </div>

            <div className="w-full text-[14px] font-mono break-all leading-none mb-6">
                =======================================
            </div>

            <div className="text-center space-y-1 w-full">
                <h2 className="text-2xl font-black">Thank You!</h2>
                <p className="text-[14px] font-black">Visit Again!</p>
                <p className="text-[13px] font-bold mt-2">Quality Food, Fast Service</p>
            </div>
        </>
    );

    return (
        <>
            {/* Screen Preview */}
            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-[400px] bg-secondary/20 backdrop-blur-xl border-border/50 p-0 overflow-hidden print:hidden">
                    <DialogHeader className="p-4 border-b border-border/50 bg-background/50">
                        <DialogTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                                <Printer className="w-5 h-5 text-primary" />
                                Receipt Preview
                            </span>
                        </DialogTitle>
                    </DialogHeader>

                    {/* Adding max height and scroll to preview to handle extremely long orders nicely on screen */}
                    <div className="p-6 bg-secondary/10 flex justify-center overflow-y-auto max-h-[60vh]">
                        {/* The "White Page" Receipt Slip For Screen */}
                        <div
                            className="bg-white text-black font-mono p-6 shadow-2xl w-[80mm] min-h-[120mm] relative animate-in zoom-in-95 duration-300 flex flex-col items-center"
                            style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                        >
                            <ReceiptContent />
                        </div>
                    </div>

                    <div className="p-4 border-t border-border/50 flex gap-3 bg-background/50">
                        <Button variant="outline" className="flex-1" onClick={onClose}>
                            Close
                        </Button>
                        <Button className="flex-1 font-bold shadow-lg shadow-primary/20" onClick={handlePrint}>
                            <Printer className="w-4 h-4 mr-2" />
                            Print Now
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Print Only Version Appended Directly to Body */}
            {mounted && isOpen && typeof document !== 'undefined' && createPortal(
                <div id="print-root" className="hidden print:block w-[80mm] mx-auto bg-white text-black font-mono p-4">
                    <style dangerouslySetInnerHTML={{
                        __html: `
                        @media print {
                            @page { 
                                margin: 0; 
                                size: auto; /* Uses default A4 or thermal size without clipping */
                            }
                            
                            /* Hide absolutely everything but the print-root */
                            body > *:not(#print-root) { 
                                display: none !important; 
                            }
                            
                            /* Force root to act as a normal scrollable page to prevent PDF truncation */
                            html, body {
                                background: white !important;
                                margin: 0 !important;
                                padding: 0 !important;
                                min-height: auto !important;
                                height: auto !important;
                                display: block !important;
                                overflow: visible !important; /* Overrides shadcn's modal body lock! */
                            }
                            
                            /* The receipt behaves as 100% normal block content */
                            #print-root {
                                display: block !important;
                                position: static !important;
                                margin: 0 auto !important;
                                width: 80mm !important;
                                visibility: visible !important;
                                color: black !important;
                                font-family: monospace !important;
                            }
                            
                            /* Force ink retention */
                            #print-root * {
                                color: black !important;
                                -webkit-print-color-adjust: exact !important;
                                print-color-adjust: exact !important;
                                visibility: visible !important;
                            }
                        }
                    `}} />
                    <ReceiptContent />
                </div>,
                document.body
            )}
        </>
    );
};
