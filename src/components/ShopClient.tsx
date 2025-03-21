"use client";
import React, { useState } from 'react';
import ProductCatalog from '@/components/ProductCatalog';
import CatalogFilter from '@/components/CatalogFilter';

interface ShopClientProps {
  products: any[];
}

const ShopClient: React.FC<ShopClientProps> = ({ products }) => {
    const [visibleProducts, setVisibleProducts] = useState(16);
    const [layout, setLayout] = useState<'grid' | 'list'>('grid');

    return (
        <>
            <CatalogFilter
                products={products}
                onShowChange={setVisibleProducts}
                onLayoutChange={setLayout}
                currentLayout={layout}
                visibleProducts={visibleProducts} 
            />
            <ProductCatalog 
                products={products} 
                layout={layout} 
                visibleProducts={visibleProducts}     
            />
        </>
    );
};

export default ShopClient;
