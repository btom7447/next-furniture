import React from "react";
import { getProductDetails } from "@/lib/airtable"; 
import NoProduct from "@/components/NoProduct";
import ProductBreadCrumb from "@/components/ProductBreadCrumb";
import ProductHeader from "@/components/ProductHeader";
import ProductDetailTabs from "@/components/ProductDetailTabs";

interface ProductDetailsProps {
  params: { id: string };
}

export default async function ProductDetails({ params}: ProductDetailsProps) {

  const product = await getProductDetails(params.id);

  if (!product) {
    return <NoProduct />;
  }

  return (
    <div className="bg-white px-10 py-40 pd-20 md:p-30">
      <ProductBreadCrumb name={product.name} />
      <ProductHeader products={product} />
      <ProductDetailTabs products={product} />
    </div>
  );
};
