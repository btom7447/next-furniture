import React from 'react';
import ProductGallery from './ProductGallery';
import ProductCaption from './ProductCaption';

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

interface ProductHeaderProps {
  products: Product; // Accepts a single product object
}

const ProductHeader: React.FC<ProductHeaderProps> = ({ products }) => {
  return (
    <div className='mt-10 md:mt-20 flex flex-col lg:flex-row gap-10 md:gap-30'>
      <ProductGallery products={products} /> 
      <ProductCaption products={products} />
    </div>
  );
};

export default ProductHeader;