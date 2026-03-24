import React from "react";
import { ProductForm } from "@/components/admin/ProductForm";
import { updateProduct } from "@/lib/admin/product-actions";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export default async function EditProductPage({ 
  params,
  searchParams,
}: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  const updateProductWithId = updateProduct.bind(null, id);

  return <ProductForm title="Edit Product" initialData={product} action={updateProductWithId} />;
}
