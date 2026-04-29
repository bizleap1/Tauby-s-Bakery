"use client";

import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { CATEGORIES } from "@/constants";

const MOCK_PRODUCTS = [
  { id: "1", name: "Belgian Chocolate Truffle", price: 1200, category: "Cakes", stock: 15, status: "Active" },
  { id: "2", name: "Classic New York Cheesecake", price: 1500, category: "Cheesecakes", stock: 8, status: "Active" },
  { id: "3", name: "Red Velvet Bliss", price: 950, category: "Cakes", stock: 0, status: "Out of Stock" },
  { id: "4", name: "Assorted French Macarons", price: 600, category: "Pastries", stock: 45, status: "Active" },
];

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-chocolate mb-2">Products</h1>
          <p className="text-chocolate-light">Manage your bakery inventory and menu.</p>
        </div>
        <button className="btn-primary flex items-center gap-2 py-2.5 px-5">
          <Plus size={20} />
          Add New Product
        </button>
      </div>

      <div className="premium-card bg-white overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-chocolate/5 flex flex-col sm:flex-row justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-chocolate/40" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-6 py-2.5 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none"
            />
          </div>
          <div className="flex gap-4">
            <select className="px-4 py-2.5 rounded-xl bg-cream/30 border border-chocolate/5 focus:border-pink-deep focus:outline-none text-chocolate font-medium">
              <option value="All">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Product Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-cream/30 border-b border-chocolate/5">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Product Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Category</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Price</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Stock</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-chocolate/40 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-chocolate/5">
              {MOCK_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-cream/10 transition-colors">
                  <td className="px-6 py-4 font-bold text-chocolate">{product.name}</td>
                  <td className="px-6 py-4 text-chocolate-light">{product.category}</td>
                  <td className="px-6 py-4 font-bold text-chocolate">₹{product.price.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <span className={`font-bold ${product.stock > 10 ? "text-green-600" : product.stock > 0 ? "text-yellow-600" : "text-red-600"}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product.status === "Active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 text-chocolate/40 hover:text-chocolate hover:bg-chocolate/5 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-chocolate/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
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
