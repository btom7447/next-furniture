"use client";

import { useEffect, useState } from "react";
import { useProductContext } from "@/components/ProductContext";
import NoProduct from "@/components/NoProduct";
import ProductBreadCrumb from "@/components/ProductBreadCrumb";
import ProductHeader from "@/components/ProductHeader";
import ProductDetailTabs from "@/components/ProductDetailTabs";
import BounceLoader from "react-spinners/BounceLoader";
import { Product } from "@/lib/airtable";

export default function ProductDetails({ params }: { params?: { id?: string } }) {
  const { fetchProductById } = useProductContext();
  
  // Set the type for the product state
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [paramId, setParamId] = useState<string | undefined>(undefined);

  // Fetch paramId asynchronously
  useEffect(() => {
    const getParamId = async () => {
      const resolvedParams = await params;
      setParamId(resolvedParams?.id);
    };
    getParamId();
  }, [params]);

  // Fetch product when paramId is ready
  useEffect(() => {
    if (paramId) {
      setLoading(true); // Start loading when fetching starts
      fetchProductById(paramId).then((data) => {
        if (data) {
          setProduct(data);
        } else {
          setProduct(null); // Set to null if no product found
        }
        setLoading(false); // Stop loading when data is fetched
      });
    }
  }, [paramId, fetchProductById]);

  // Show loader while loading
  if (loading) {
    return (
      <div className="mt-50 h-50 w-full flex items-center justify-center">
        <BounceLoader size={80} color="#FBEBB5" />
      </div>
    );
  }

  // Show NoProduct if product is not found
  if (!product) return <NoProduct />;

  return (
    <div className="bg-white px-5 py-40 pd-20 md:p-30">
      <ProductBreadCrumb name={product.name} />
      <ProductHeader products={product} />
      <ProductDetailTabs products={product} />
    </div>
  );
}
