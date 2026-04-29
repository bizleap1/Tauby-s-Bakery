"use client";

import React from "react";
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const STATS = [
  { label: "Total Revenue", value: "₹1,24,500", icon: DollarSign, trend: "+12.5%" },
  { label: "Total Orders", value: "458", icon: ShoppingBag, trend: "+8.2%" },
  { label: "Total Customers", value: "324", icon: Users, trend: "+15.3%" },
  { label: "Conversion Rate", value: "4.2%", icon: TrendingUp, trend: "+2.1%" },
];

const RECENT_ORDERS = [
  { id: "#TB-10293", customer: "Rahul Verma", date: "Today, 10:45 AM", amount: "₹2,450", status: "Preparing" },
  { id: "#TB-10292", customer: "Priya Sharma", date: "Today, 09:15 AM", amount: "₹1,200", status: "Out for Delivery" },
  { id: "#TB-10291", customer: "Amit Patel", date: "Yesterday", amount: "₹3,800", status: "Delivered" },
  { id: "#TB-10290", customer: "Neha Gupta", date: "Yesterday", amount: "₹950", status: "Delivered" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-chocolate mb-2">Dashboard Overview</h1>
        <p className="text-chocolate-light">Welcome back! Here&apos;s what&apos;s happening with your bakery today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="premium-card p-6 bg-white"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-pink-pastel/20 flex items-center justify-center text-pink-deep">
                  <Icon size={24} />
                </div>
                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
              </div>
              <p className="text-sm text-chocolate/60 font-bold uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-3xl font-heading font-bold text-chocolate">{stat.value}</h3>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="premium-card bg-white overflow-hidden">
        <div className="p-6 border-b border-chocolate/5 flex justify-between items-center">
          <h2 className="text-xl font-heading font-bold text-chocolate">Recent Orders</h2>
          <button className="text-sm font-bold text-pink-deep hover:underline">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-cream/30 border-b border-chocolate/5">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Customer</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Amount</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate/5">
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-cream/10 transition-colors">
                  <td className="px-6 py-4 font-bold text-chocolate">{order.id}</td>
                  <td className="px-6 py-4 text-chocolate-light">{order.customer}</td>
                  <td className="px-6 py-4 text-chocolate/60 text-sm">{order.date}</td>
                  <td className="px-6 py-4 font-bold text-chocolate">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" :
                      order.status === "Preparing" ? "bg-blue-100 text-blue-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
