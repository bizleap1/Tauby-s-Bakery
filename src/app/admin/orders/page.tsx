"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Package, Truck, CheckCircle2, Clock, Filter, Search, ChevronRight, Eye, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "react-hot-toast";

import { Order } from "@/types";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  const statusOptions = ["Pending", "Paid", "Confirmed", "Preparing", "Out for Delivery", "Delivered", "Cancelled"];

  const fetchOrders = async () => {
    setIsLoading(true);
    let query = supabase
      .from('orders')
      .select('*, order_items(*), profiles(*)')
      .order('created_at', { ascending: false });

    if (filter !== "All") {
      query = query.eq('status', filter);
    }

    const { data, error } = await query;

    if (error) {
      toast.error("Failed to fetch orders");
    } else {
      setOrders(data || []);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [filter]);

  const updateStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders();
    }
  };

  return (
    <div className="pt-32 pb-24 bg-cream/30 min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-heading font-bold text-dark mb-2">Order Management</h1>
            <p className="text-dark/60 font-medium italic">Administrative panel for Tauby&apos;s Bakery</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {["All", ...statusOptions].map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  filter === opt 
                    ? "bg-dark text-cream shadow-lg" 
                    : "bg-white text-dark/40 hover:bg-dark/5 border border-dark/5"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-primary"></div>
          </div>
        ) : orders.length === 0 ? (
          <div className="premium-card p-24 bg-white text-center">
            <Package size={48} className="mx-auto text-dark/10 mb-4" />
            <h3 className="text-xl font-heading font-bold text-dark">No orders found</h3>
            <p className="text-dark/40 mt-2">Try changing the status filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="premium-card bg-white overflow-hidden border border-dark/5 group hover:shadow-xl transition-all"
              >
                <div className="p-6 md:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
                    {/* Order Basic Info */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-dark/40 uppercase tracking-widest">Order ID</p>
                      <p className="font-bold text-dark">#{order.id.slice(0, 8).toUpperCase()}</p>
                      <p className="text-xs text-dark/60">{format(new Date(order.created_at), 'MMM d, h:mm a')}</p>
                    </div>

                    {/* Customer Info */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-dark/40 uppercase tracking-widest">Customer</p>
                      <p className="font-bold text-dark">{order.profiles?.full_name || "Guest Customer"}</p>
                      <p className="text-xs text-dark/60 truncate">{order.profiles?.email || "No email"}</p>
                    </div>

                    {/* Amount & Items */}
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-dark/40 uppercase tracking-widest">Details</p>
                      <p className="font-bold text-red-primary">₹{formatPrice(order.total_amount)}</p>
                      <p className="text-xs text-dark/60">{order.order_items.length} item(s)</p>
                    </div>

                    {/* Status Update */}
                    <div className="flex flex-col gap-3">
                      <p className="text-[10px] font-bold text-dark/40 uppercase tracking-widest">Update Status</p>
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className={`w-full px-3 py-2 rounded-xl text-xs font-bold border focus:outline-none transition-colors ${
                          order.status === 'Delivered' ? 'bg-green-50 border-green-200 text-green-700' :
                          order.status === 'Cancelled' ? 'bg-red-50 border-red-200 text-red-700' :
                          'bg-blue-50 border-blue-200 text-blue-700'
                        }`}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-dark/5 flex justify-between items-center">
                    <div className="flex gap-4">
                       <span className="flex items-center gap-1.5 text-xs font-bold text-dark/40 uppercase">
                          <Calendar size={14} className="text-red-primary" /> {format(new Date(order.delivery_date), 'MMM d')}
                       </span>
                       <span className="flex items-center gap-1.5 text-xs font-bold text-dark/40 uppercase">
                          <Clock size={14} className="text-red-primary" /> {order.delivery_slot}
                       </span>
                    </div>
                    <Link 
                      href={`/profile/orders/${order.id}`}
                      className="text-xs font-bold text-dark/60 hover:text-dark flex items-center gap-1.5 transition-colors"
                    >
                      View Details <Eye size={14} />
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
