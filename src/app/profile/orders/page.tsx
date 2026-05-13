"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Package, ChevronRight, Clock, CheckCircle2, Truck } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";

import { Order, OrderItem } from "@/types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (!error) {
        setOrders(data);
      }
      setIsLoading(false);
    };

    fetchOrders();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 bg-cream/30 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-primary"></div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 bg-cream/30 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
            <Package className="text-red-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-heading font-bold text-dark">My Orders</h1>
            <p className="text-dark/60 text-sm">Track and manage your sweet celebrations</p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="premium-card p-12 bg-white text-center">
            <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-dark/20" />
            </div>
            <h2 className="text-2xl font-heading font-bold text-dark mb-4">No orders yet</h2>
            <p className="text-dark/60 mb-8 max-w-md mx-auto">You haven&apos;t placed any orders yet. Start exploring our menu to find something delicious!</p>
            <Link href="/menu" className="btn-primary">Explore Menu</Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="premium-card bg-white overflow-hidden hover:shadow-xl transition-all border border-dark/5"
              >
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                    <div>
                      <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Order ID</p>
                      <h3 className="font-bold text-dark">{order.id.slice(0, 8).toUpperCase()}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-dark/40 uppercase tracking-widest mb-1">Placed On</p>
                      <p className="font-medium text-dark">{format(new Date(order.created_at), 'PPP')}</p>
                    </div>
                    <div className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {order.status === 'Delivered' ? <CheckCircle2 size={14} /> : 
                       order.status === 'Out for Delivery' ? <Truck size={14} /> :
                       <Clock size={14} />}
                      {order.status}
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-8 items-center border-t border-dark/5 pt-6">
                    <div className="flex-grow">
                      <p className="text-sm text-dark/60 mb-2">Items</p>
                      <div className="flex gap-2 overflow-hidden">
                        {order.order_items.map((item: OrderItem, i: number) => (
                          <div key={i} className="text-sm font-medium text-dark">
                            {item.quantity}x Item {i+1}{i < order.order_items.length - 1 ? ',' : ''}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-dark/60 mb-1">Total Amount</p>
                      <p className="text-xl font-bold text-red-primary">₹{formatPrice(order.total_amount)}</p>
                    </div>
                    <Link 
                      href={`/profile/orders/${order.id}`}
                      className="flex items-center gap-2 font-bold text-dark hover:text-red-primary transition-colors group"
                    >
                      Track Details
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
