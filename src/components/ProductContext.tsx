"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { getAllProducts, getProductDetails } from "@/lib/airtable";

export interface Product {
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

interface ProductContextType {
    products: Product[] | null;
    fetchProducts: () => Promise<void>;
    fetchProductById: (id: string) => Promise<Product | null>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[] | null>(null);
    
    const fetchProducts = useCallback(async () => {
        const data = await getAllProducts();
        setProducts(data);
    }, []);

    const fetchProductById = useCallback(async (id: string) => {
        return await getProductDetails(id);
    }, []);

    return (
        <ProductContext.Provider value={{ products, fetchProducts, fetchProductById }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProductContext = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext must be used within a ProductProvider");
    }
    return context;
};
