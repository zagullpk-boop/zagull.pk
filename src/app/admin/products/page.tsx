"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Search, 
  Filter, 
  Plus, 
  MoreHorizontal, 
  Eye, 
  Edit2, 
  Trash2, 
  Download,
  LayoutGrid,
  List,
  ChevronRight
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

// Mock Data
const products = [
  { 
    id: 1, 
    name: "Golden Heart Pendant", 
    sku: "ZAG-J-001", 
    category: "Jewellery", 
    subCategory: "Pendants", 
    price: "PKR 1,200", 
    stock: 15, 
    status: "Published",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=200&h=200&fit=crop"
  },
  { 
    id: 2, 
    name: "Silver Hoop Earrings", 
    sku: "ZAG-J-002", 
    category: "Jewellery", 
    subCategory: "Earrings", 
    price: "PKR 850", 
    stock: 5, 
    status: "Published",
    image: "https://images.unsplash.com/photo-1635767798638-3e25273a8236?q=80&w=200&h=200&fit=crop"
  },
  { 
    id: 3, 
    name: "Floral Summer Scarf", 
    sku: "ZAG-C-001", 
    category: "Clothing", 
    subCategory: "Scarves", 
    price: "PKR 1,500", 
    stock: 0, 
    status: "Draft",
    image: "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?q=80&w=200&h=200&fit=crop"
  },
  { 
    id: 4, 
    name: "Pearl Drop Earrings", 
    sku: "ZAG-J-003", 
    category: "Jewellery", 
    subCategory: "Earrings", 
    price: "PKR 1,100", 
    stock: 25, 
    status: "Published",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=200&h=200&fit=crop"
  },
];

export default function AdminProductsPage() {
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-serif text-text-primary">Products</h1>
          <div className="flex items-center gap-2 text-xs text-text-secondary mt-1">
            <Link href="/admin" className="hover:text-accent-forest transition-colors">Dashboard</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-text-primary font-medium">All Products</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white border-border-light h-10 px-4 text-xs font-sans font-bold">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Link href="/admin/products/add">
            <Button className="bg-accent-forest h-10 px-4 text-xs font-sans font-bold">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Filters & Search */}
      <Card className="p-4 border-none shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input 
              type="text" 
              placeholder="Search by name, SKU..." 
              className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-accent-forest/20 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 rounded-xl text-xs font-bold text-text-secondary hover:bg-gray-100 transition-colors">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <div className="h-10 w-px bg-border-light mx-2" />
            <div className="bg-gray-100 p-1 rounded-xl flex gap-1">
              <button 
                onClick={() => setViewMode("table")}
                className={cn(
                  "p-1.5 rounded-lg transition-all",
                  viewMode === "table" ? "bg-white shadow-sm text-accent-forest" : "text-text-secondary hover:text-text-primary"
                )}
              >
                <List className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded-lg transition-all",
                  viewMode === "grid" ? "bg-white shadow-sm text-accent-forest" : "text-text-secondary hover:text-text-primary"
                )}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Card>

      {/* Products Content */}
      {viewMode === "table" ? (
        <Card className="p-0 border-none shadow-sm overflow-hidden">
          <div className="overflow-x-auto font-sans">
            <table className="w-full text-left">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Image</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Product Details</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Category</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Stock</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 group transition-colors">
                    <td className="px-6 py-4">
                      <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden border border-border-light">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-sm font-bold text-text-primary leading-none">{product.name}</p>
                        <p className="text-[10px] text-text-secondary mt-1.5 font-medium tracking-tight">SKU: {product.sku}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-xs text-text-primary font-medium">{product.category}</p>
                        <p className="text-[10px] text-text-secondary">{product.subCategory}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-text-primary">
                      {product.price}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          product.stock > 10 ? "bg-emerald-500" : product.stock > 0 ? "bg-amber-500" : "bg-red-500"
                        )} />
                        <span className={cn(
                          "text-xs font-bold",
                          product.stock === 0 ? "text-red-600" : "text-text-primary"
                        )}>
                          {product.stock === 0 ? "Out of Stock" : `${product.stock} items`}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        product.status === "Published" ? "bg-emerald-50 text-emerald-700" : "bg-gray-100 text-gray-600"
                      )}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border-light text-text-secondary hover:text-accent-forest transition-all" title="View details">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border-light text-text-secondary hover:text-blue-600 transition-all" title="Edit product">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg border border-transparent hover:border-border-light text-text-secondary hover:text-red-600 transition-all" title="Delete product">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="p-6 border-top border-border-light flex items-center justify-between bg-gray-50/30">
            <p className="text-xs text-text-secondary font-medium font-sans">Showing 1 to 4 of 156 products</p>
            <div className="flex gap-2">
              <Button disabled variant="outline" className="h-8 px-3 text-[10px] bg-white border-border-light">Previous</Button>
              <Button variant="outline" className="h-8 px-3 text-[10px] bg-white border-border-light">Next</Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="p-0 border-none shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                  <button className="bg-white p-2 rounded-xl shadow-lg hover:text-accent-forest"><Edit2 className="w-3.5 h-3.5" /></button>
                  <button className="bg-white p-2 rounded-xl shadow-lg hover:text-red-600"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className={cn(
                    "px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md",
                    product.status === "Published" ? "bg-emerald-500/80 text-white" : "bg-gray-500/80 text-white"
                  )}>
                    {product.status}
                  </span>
                </div>
              </div>
              <div className="p-4 font-sans">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">{product.category}</p>
                    <h3 className="text-sm font-bold text-text-primary mt-1 line-clamp-1">{product.name}</h3>
                  </div>
                  <p className="text-sm font-bold text-accent-forest">{product.price}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-border-light flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={cn("w-1.5 h-1.5 rounded-full", product.stock > 0 ? "bg-emerald-500" : "bg-red-500")} />
                    <p className="text-[10px] font-bold text-text-secondary uppercase">{product.stock} in stock</p>
                  </div>
                  <button className="text-[10px] font-bold text-text-secondary hover:text-text-primary flex items-center gap-1 group/btn">
                    Details <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
