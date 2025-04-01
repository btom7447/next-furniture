"use client";

import React, { useEffect, useState } from "react";
import { useProductContext } from "@/components/ProductContext";
import NoProduct from "@/components/NoProduct";
import ProductBreadCrumb from "@/components/ProductBreadCrumb";
import ProductHeader from "@/components/ProductHeader";
import ProductDetailTabs from "@/components/ProductDetailTabs";
import BounceLoader from "react-spinners/BounceLoader";

// Define the Product type
interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  gallery: string[];
  reviews: number;
  reviewers: number;
  sku: string;
  category: string;
  tags: string[];
}

export default function ProductDetails({ params }: { params?: { id?: string } }) {
  const { fetchProductById } = useProductContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      if (params?.id) {
        const data = await fetchProductById(params.id);
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [params?.id, fetchProductById]);

  return (
    <div className="bg-white px-5 py-40 pd-20 md:p-30">
      {loading ? (
        <div className="h-50 w-full flex items-center justify-center">
          <BounceLoader size={80} color="#FBEBB5" />
        </div>
      ) : !product ? (
        <NoProduct />
      ) : (
        <>
          <ProductBreadCrumb name={product.name} />
          <ProductHeader products={product} />
          <ProductDetailTabs products={product} />
        </>
      )}
    </div>
  );
}
