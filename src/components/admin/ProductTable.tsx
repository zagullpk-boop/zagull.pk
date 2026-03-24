"use client";

import React, { useState } from "react";
import { Edit2, Trash2, MoreVertical, Loader2, Package } from "lucide-react";
import { deleteProduct } from "@/lib/admin/product-actions";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

interface ProductTableProps {
  initialProducts: any[];
}

export function ProductTable({ initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState(initialProducts);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    
    setIsDeleting(id);
    const result = await deleteProduct(id);
    if (result.success) {
      setProducts(products.filter(p => p.id !== id));
    } else {
      alert("Failed to delete product: " + result.error);
    }
    setIsDeleting(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="bg-background-primary/50 border-b border-border-light">
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Product</th>
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Category</th>
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Price</th>
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary">Stock</th>
            <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-text-secondary text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border-light">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-background-primary/50 transition-colors group">
              <td className="px-8 py-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-background-primary border border-border-light overflow-hidden flex-shrink-0 relative group-hover:scale-110 transition-transform duration-500">
                    {product.image_url ? (
                      <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-secondary">
                        <Package size={16} />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-text-primary truncate">{product.name}</p>
                    <p className="text-[10px] text-text-secondary uppercase tracking-widest truncate">ID: {product.id.split('-')[0]}</p>
                  </div>
                </div>
              </td>
              <td className="px-8 py-5">
                <span className="px-3 py-1 bg-background-primary text-text-secondary rounded-full text-[10px] font-bold uppercase tracking-widest border border-border-light">
                  {product.category || "Uncategorized"}
                </span>
              </td>
              <td className="px-8 py-5 text-sm font-bold text-text-primary">
                PKR {Number(product.price).toLocaleString()}
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${
                    product.stock > 10 ? 'bg-emerald-500' : 
                    product.stock > 0 ? 'bg-amber-500' : 
                    'bg-red-500'
                  }`} />
                  <span className="text-sm text-text-primary font-medium">{product.stock || 0}</span>
                </div>
              </td>
              <td className="px-8 py-5">
                <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link 
                    href={`/admin/products/${product.id}/edit`}
                    className="p-2 text-text-secondary hover:text-accent-forest hover:bg-emerald-50 rounded-lg transition-all"
                    title="Edit Product"
                  >
                    <Edit2 size={16} />
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    disabled={isDeleting === product.id}
                    className="p-2 text-text-secondary hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                    title="Delete Product"
                  >
                    {isDeleting === product.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                  <button className="p-2 text-text-secondary hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-all">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td colSpan={5} className="px-8 py-20 text-center">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-background-primary flex items-center justify-center text-text-secondary">
                    <Package size={32} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-text-primary font-serif text-lg">No products found</p>
                    <p className="text-text-secondary text-sm">Start by adding your first product to the collection.</p>
                  </div>
                  <Link href="/admin/products/add">
                    <Button className="mt-2 bg-accent-forest text-white">Add New Product</Button>
                  </Link>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
