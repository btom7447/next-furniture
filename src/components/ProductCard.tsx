import Link from "next/link";
import React from "react";

interface ProductCardProps {
    image: string;
    name: string;
    price: number;
    id: string;
    layout: string;
    description: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, id, description, layout }) => {
    return (
        <Link href={`/product/${id}`}>
            <div className={`bg-white flex justify-start  ${layout === 'grid' ? 'flex-col items-start' : 'gap-10 flex-row items-center'}`}>
                <img src={image} alt={name} className={`object-contain ${layout === 'grid' ? 'w-60 h-60 block m-auto' : 'w-40 h-40 md:w-60 md:h-60'} `} />
                <div className={`flex flex-col  ${layout === 'grid' ? 'w-full justify-center items-center' : 'justify-start items-start'} `}>
                    <h2 className="text-lg font-normal text-center">{name}</h2>
                    <p className="text-2xl font-semibold text-center mt-2">Rs. {price.toLocaleString()}</p>
                    <p className={`text-gray-700 text-sm ${layout === 'grid' ? 'hidden' : 'hidden md:block'}`}>{description.split('|')[0]}</p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
