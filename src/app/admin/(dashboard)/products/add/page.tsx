import React from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { addProduct } from "@/lib/admin/product-actions";
export default async function AddProductPage() {
  return <ProductForm title="Add New Product" action={addProduct} />;
}
