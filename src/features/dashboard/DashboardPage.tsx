import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { BadgeDollarSign, ShoppingBag, TrendingUp, Clock, Trash2, AlertTriangle } from 'lucide-react';
import { useOrderStore } from '@/store/orderStore';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import toast from 'react-hot-toast';

export const DashboardPage = () => {
    const orders = useOrderStore(state => state.orders);
    const store = useOrderStore();
    const clearOrders = useOrderStore(state => state.clearOrders);
    const clearCart = useCartStore(state => state.clearCart);
    const [showConfirm, setShowConfirm] = useState(false);

    // Memoize calculations to prevent infinite loops from unstable array/object references
    const totalRevenue = useMemo(() => store.getTotalRevenue(), [orders, store]);
    const totalOrders = useMemo(() => store.getTotalOrders(), [orders, store]);
    const chartData = useMemo(() => store.getChartData(), [orders, store]);
    const bestSellers = useMemo(() => store.getBestSellers(), [orders, store]);

    // Quick calculation for average order value
    const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00';

    const handleClearAll = () => {
        setShowConfirm(true);
    };

    const handleConfirmClear = () => {
        clearOrders();
        clearCart();
        setShowConfirm(false);
        toast.success('All data cleared successfully!');
    };

    return (
        <>
            <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-5 duration-500">
                <div className="flex flex-wrap justify-between items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                        <p className="text-sm text-muted-foreground mt-1">Live Data from {orders.length} transaction(s)</p>
                    </div>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center gap-2 h-10 px-4 font-bold shadow-lg shadow-destructive/20 hover:scale-105 transition-all"
                        onClick={handleClearAll}
                        disabled={orders.length === 0}
                    >
                        <Trash2 className="w-4 h-4" />
                        Clear All Data
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="hover:scale-105 transition-transform bg-primary/5 border-primary/20 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                            <BadgeDollarSign className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-primary">Rs. {totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                            <p className="text-xs text-muted-foreground mt-1 text-primary/70">Total income recorded</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:scale-105 transition-transform">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{totalOrders}</div>
                            <p className="text-xs text-muted-foreground mt-1">Completed transactions</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:scale-105 transition-transform">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Rs. {avgOrderValue}</div>
                            <p className="text-xs text-muted-foreground mt-1">Per transaction average</p>
                        </CardContent>
                    </Card>
                    <Card className="hover:scale-105 transition-transform">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{orders.length > 0 ? new Date(orders[0].date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}</div>
                            <p className="text-xs text-muted-foreground mt-1">Time of last order</p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="col-span-4 shadow-sm border-border/50">
                        <CardHeader>
                            <CardTitle>Revenue Overview</CardTitle>
                        </CardHeader>
                        <CardContent className="pl-2">
                            <ResponsiveContainer width="100%" height={350}>
                                <BarChart data={chartData}>
                                    <XAxis
                                        dataKey="name"
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        stroke="#888888"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                        tickFormatter={(value: number) => `Rs.${value}`}
                                    />
                                    <Tooltip
                                        formatter={(value: number | undefined) => [`Rs. ${value || 0}`, 'Revenue']}
                                        cursor={{ fill: 'var(--primary)', opacity: 0.1 }}
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                    />
                                    <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                    <Card className="col-span-3 shadow-sm border-border/50">
                        <CardHeader>
                            <CardTitle>Best Sellers</CardTitle>
                            <p className="text-sm text-muted-foreground">Top 5 products by absolute volume.</p>
                        </CardHeader>
                        <CardContent>
                            {bestSellers.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-48 text-muted-foreground text-sm opacity-50">
                                    <ShoppingBag className="w-8 h-8 mb-2" />
                                    <p>No sales data yet.</p>
                                </div>
                            ) : (
                                <div className="space-y-8 mt-4">
                                    {bestSellers.map(item => {
                                        // Calculate relative bar width (max out at 100% relative to top seller)
                                        const maxSales = bestSellers[0].sales;
                                        const percentage = (item.sales / maxSales) * 100;

                                        return (
                                            <div key={item.name} className="flex items-center">
                                                <div className="ml-4 space-y-1 flex-1">
                                                    <p className="text-sm font-medium leading-none">{item.name}</p>
                                                    <p className="text-xs text-muted-foreground">{item.sales} units sold</p>
                                                </div>
                                                <div className="ml-auto font-medium w-24 md:w-32">
                                                    <div className="h-2 w-full bg-secondary/50 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-primary rounded-full transition-all duration-1000"
                                                            style={{ width: `${percentage}%` }}
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Custom Confirmation Dialog */}
            <Dialog open={showConfirm} onOpenChange={setShowConfirm}>
                <DialogContent className="sm:max-w-[420px] bg-background/95 backdrop-blur-xl border-destructive/20 p-0 overflow-hidden">
                    <div className="bg-destructive/10 border-b border-destructive/20 p-6 flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-destructive/20 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="h-6 w-6 text-destructive" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-foreground">Clear All Data?</h3>
                            <p className="text-sm text-muted-foreground mt-0.5">This action cannot be undone.</p>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            You are about to permanently delete <span className="font-bold text-foreground">{orders.length} completed order(s)</span> and clear the current cart. All sales history and revenue data will be erased from this device.
                        </p>
                        <div className="flex gap-3 pt-2">
                            <Button
                                variant="outline"
                                className="flex-1 h-11 font-semibold"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                className="flex-1 h-11 font-bold shadow-lg shadow-destructive/20"
                                onClick={handleConfirmClear}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Yes, Clear Everything
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
