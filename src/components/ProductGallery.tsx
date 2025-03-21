import React from 'react'

interface Product {
    name: string;
    image: string;
    description: string;
    price: number;
    gallery: string[];
    reviews: number,
    reviewers: number,
}

interface ProductGalleryProps {
    products: Product;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ products }) => {
    return (
        <div className='flex-1 flex flex-col-reverse gap-5 items-start justify-start md:flex md:flex-row'>
            <div className="flex flex-wrap gap-5 content-stretch md:flex-col">
                {products.gallery.slice(1).map((url, index) => (
                    <div className='bg-[#FFF9E5]'>
                        <img key={index} src={url} alt={`${products.name} ${index + 1}`} className='w-[150px] h-[150px] object-cover' />
                    </div>
                ))}
            </div>
            <div className='bg-[#FFF9E5]'>
                <img src={products.gallery[0]} alt={products.name} className='' />
            </div>
        </div>
    )
}

export default ProductGallery