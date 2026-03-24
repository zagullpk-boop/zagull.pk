import React from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { addProduct } from "@/lib/admin/product-actions";
import { requireAdminAuth } from "@/lib/admin/auth-actions";

export default async function AddProductPage() {
  await requireAdminAuth();
  return <ProductForm title="Add New Product" action={addProduct} />;
}
