"use client"; 
import React, { useState, useEffect } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import ProductCard from "@/components/ProductCard"; 

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string; 
}

const ProductCatalog = ({ products }: { products: Product[] }) => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false);
        }, 5000); // Fallback timeout in case products are empty
      
        if (products.length > 0) {
          setLoading(false);
          clearTimeout(timer);
        }
      
        return () => clearTimeout(timer);
    }, [products]);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <BounceLoader size={80} color="#FBEBB5" />
                </div>
            ) : (
                <div className="p-20 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-10 bg-white">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image} 
                            name={product.name}
                            price={product.price}
                            id={product.id}
                        />
                    ))}
                </div>
            )}
        </>
    );
};

export default ProductCatalog;
