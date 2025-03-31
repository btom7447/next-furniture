"use client";

import { useEffect } from "react";
import BreadCrumb from "@/components/BreadCrumb";
import ShopClient from "@/components/ShopClient";
import TrustBadge from "@/components/TrustBadge";
import { useProductContext } from "@/components/ProductContext";

export default function Shop() {
  const { products, fetchProducts } = useProductContext();

  useEffect(() => {
    fetchProducts(); // Fetch products when the Shop page is visited
  }, [fetchProducts]);

  return (
    <>
      <BreadCrumb title="Shop" />
      <ShopClient products={products || []} />
      <TrustBadge />
    </>
  );
}
