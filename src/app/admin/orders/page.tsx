"use client";

import React, { useState } from "react";
import { Search, Eye } from "lucide-react";

const MOCK_ORDERS = [
  { id: "#TB-10293", customer: "Rahul Verma", date: "Today, 10:45 AM", amount: "₹2,450", status: "Preparing", items: 3 },
  { id: "#TB-10292", customer: "Priya Sharma", date: "Today, 09:15 AM", amount: "₹1,200", status: "Out for Delivery", items: 1 },
  { id: "#TB-10291", customer: "Amit Patel", date: "Yesterday, 04:30 PM", amount: "₹3,800", status: "Delivered", items: 5 },
  { id: "#TB-10290", customer: "Neha Gupta", date: "Yesterday, 11:20 AM", amount: "₹950", status: "Delivered", items: 2 },
  { id: "#TB-10289", customer: "Vikram Singh", date: "Oct 24, 2023", amount: "₹1,800", status: "Cancelled", items: 1 },
];

export default function AdminOrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-bold text-chocolate mb-2">Orders</h1>
        <p className="text-chocolate-light">Track and manage customer orders.</p>
      </div>

      <div className="premium-card bg-white overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-chocolate/5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/40" size={18} />
            <input
              type="text"
              placeholder="Search by Order ID or Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-2.5 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none"
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2.5 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none text-chocolate font-medium">
              <option value="All">All Statuses</option>
              <option value="Preparing">Preparing</option>
              <option value="Out for Delivery">Out for Delivery</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-cream/30 border-b border-chocolate/5">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Customer</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Items</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Amount</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate/5">
              {MOCK_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-cream/10 transition-colors">
                  <td className="px-6 py-4 font-bold text-chocolate">{order.id}</td>
                  <td className="px-6 py-4 text-chocolate-light font-medium">{order.customer}</td>
                  <td className="px-6 py-4 text-chocolate/60 text-sm">{order.date}</td>
                  <td className="px-6 py-4 text-chocolate/60">{order.items} items</td>
                  <td className="px-6 py-4 font-bold text-chocolate">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" :
                      order.status === "Preparing" ? "bg-blue-100 text-blue-700" :
                      order.status === "Cancelled" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-chocolate/40 hover:text-pink-deep hover:bg-pink-pastel/20 rounded-lg transition-colors inline-flex items-center gap-2 text-sm font-bold">
                      <Eye size={18} />
                      View
                    </button>
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
