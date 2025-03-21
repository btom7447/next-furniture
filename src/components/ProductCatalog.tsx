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

const ProductCatalog = ({ products, layout, visibleProducts }: { products: Product[]; layout: 'grid' | 'list'; visibleProducts: number; }) => {
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 5000); 

        if (products.length > 0) {
            setLoading(false);
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [products]);

    const totalPages = Math.ceil(products.length / visibleProducts);
    const startIndex = (currentPage - 1) * visibleProducts;
    const endIndex = startIndex + visibleProducts;
    const paginatedProducts = products.slice(startIndex, endIndex);

    return (
        <>
            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <BounceLoader size={80} color="#FBEBB5" />
                </div>
            ) : (
            <>
                <div className={`py-20 px-10 ${layout === 'grid' ? 'md:px-40 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4' : 'md:px-70  grid grid-cols-1'} gap-10 bg-white`}>
                    {paginatedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            description={product.description}
                            id={product.id}
                            layout={layout}
                        />
                    ))}
                </div>
                <div className="flex justify-center items-center space-x-4 my-10">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="px-4 py-2 bg-gray-200 text-black rounded-lg disabled:opacity-50"
                    >
                        Previous
                    </button>
                    <span className="text-black text-xl">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 bg-gray-200 text-black rounded-lg disabled:opacity-50"
                    >
                        Next
                    </button>
                </div>
            </>
            )}
        </>
    );
};

export default ProductCatalog;