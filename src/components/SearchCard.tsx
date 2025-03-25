import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "@/lib/airtable";

interface SearchCardProps {
    product: Product; 
    onRequestClose: () => void;
}

const SearchCard: React.FC<SearchCardProps> = ({ product, onRequestClose }) => {
    const imageUrl = product.image.startsWith("http") ? product.image : "/fallback-image.jpg"; 

    return (
        <Link href={`/product/${product.id}`} onClick={onRequestClose} className="block">
            <div className="bg-white flex space-x-5 justify-start items-center">
                <Image
                    src={imageUrl} 
                    alt={product.name} 
                    width={24} 
                    height={24} 
                    className="object-contain w-20 h-20 md:w-30 md:h-30"
                    unoptimized
                />
                <div className="justify-start items-start">
                    <h2 className="text-md text-left md:text-lg font-normal md:text-center">{product.name}</h2>
                    <p className="text-lg md:text-2xl font-semibold text-left mt-2">Rs. {product.price.toLocaleString()}</p>
                </div>
            </div>
        </Link>
    );
};

export default SearchCard;