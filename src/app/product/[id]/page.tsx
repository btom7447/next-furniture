import React from "react";
import { getProductDetails, getAllProducts } from "@/lib/airtable";
import NoProduct from "@/components/NoProduct";
import ProductBreadCrumb from "@/components/ProductBreadCrumb";
import ProductHeader from "@/components/ProductHeader";
import ProductDetailTabs from "@/components/ProductDetailTabs";

export default async function ProductDetails({ params }: { params?: { id?: string } }) {
  if (!params?.id) return <NoProduct />;

  const product = await getProductDetails(params.id);
  if (!product) return <NoProduct />;

  return (
    <div className="bg-white px-5 py-40 pd-20 md:p-30">
      <ProductBreadCrumb name={product.name} />
      <ProductHeader products={product} />
      <ProductDetailTabs products={product} />
    </div>
  );
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ id: product.id }));
}
