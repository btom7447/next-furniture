import Link from "next/link";
import React from "react";

interface ProductCardProps {
    image: string;
    name: string;
    price: number;
    id: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, id }) => {
    return (
        <Link href={`/product/${id}`}>
            <div className="bg-white flex-col justify-start items-start">
                <img src={image} alt={name} className="w-[100%] h-60 object-contain" />
                <h2 className="text-lg font-normal text-center">{name}</h2>
                <p className="text-2xl font-semibold text-center mt-2">Rs. {price.toLocaleString()}</p>
            </div>
        </Link>
    );
};

export default ProductCard;
