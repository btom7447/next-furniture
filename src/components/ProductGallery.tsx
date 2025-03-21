import React from 'react';
import Image from 'next/image';

interface Product {
    name: string;
    image: string;
    description: string;
    price: number;
    gallery: string[];
    reviews: number;
    reviewers: number;
}

interface ProductGalleryProps {
    products: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
    return (
        <div className='flex-1 flex flex-col-reverse gap-5 items-start justify-start md:flex md:flex-row'>
            <div className="flex flex-wrap gap-5 content-stretch md:flex-col">
                {products.gallery.slice(1).map((url, index) => (
                    <div key={index} className='bg-[#FFF9E5]'>
                        <Image src={url} alt={`${products.name} ${index + 1}`} width={150} height={150} className='w-30 h-30 md:w-60 md:h-60 object-contain' />
                    </div>
                ))}
            </div>
            <div className='bg-[#FFF9E5]'>
                <Image src={products.gallery[0]} alt={products.name} width={400} height={400} className='object-contain' unoptimized />
            </div>
        </div>
    );
}

export default ProductGallery;