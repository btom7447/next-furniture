import React from "react";
import { getProductDetails, getAllProducts } from "@/lib/airtable"; // ✅ Import `getAllProducts`
import NoProduct from "@/components/NoProduct";
import ProductBreadCrumb from "@/components/ProductBreadCrumb";
import ProductHeader from "@/components/ProductHeader";
import ProductDetailTabs from "@/components/ProductDetailTabs";

interface ProductDetailsProps {
  params: { id: string }; // ✅ No need to extend `PageProps`
}

export default async function ProductDetails({ params }: ProductDetailsProps) {
  if (!params?.id) {
    return <NoProduct />;
  }

  // ✅ Ensure we handle null case properly
  const product = await getProductDetails(params.id);
  if (!product) return <NoProduct />;

  return (
    <div className="bg-white px-10 py-40 pd-20 md:p-30">
      <ProductBreadCrumb name={product.name} />
      <ProductHeader products={product} />
      <ProductDetailTabs products={product} />
    </div>
  );
}

// ✅ Fix: Ensure `generateStaticParams` properly fetches product IDs
export async function generateStaticParams() {
  const products = await getAllProducts(); // ✅ No more "Cannot find name 'getAllProducts'" error
  return products.map((product) => ({
    id: product.id.toString(), // ✅ Ensure `id` is a string
  }));
}
