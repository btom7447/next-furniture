import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
    image: string;
    name: string;
    price: number;
    id: string;
    layout?: "grid" | "list"; 
    description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, id, description = "No description available", layout = "grid" }) => {
    const imageUrl = image.startsWith("http") ? image : "/fallback-image.jpg"; 

    return (
        <Link href={`/product/${id}`} className="block">
            <div className={`bg-white flex justify-start ${layout === "grid" ? "flex-col items-start" : "gap-5 flex-row items-center"}`}>
                <Image
                    src={imageUrl} 
                    alt={name} 
                    width={240} 
                    height={240} 
                    className={`object-contain ${layout === "grid" ? "w-60 h-60 block m-auto" : "w-30 h-30 md:w-60 md:h-60"}`}
                    unoptimized
                />
                <div className={`flex flex-col ${layout === "grid" ? "w-full justify-center items-center" : "justify-start items-start"}`}>
                    <h2 className="text-md text-left md:text-lg font-normal md:text-center">{name}</h2>
                    <p className="text-lg md:text-2xl font-semibold text-left md:text-center mt-2">Rs. {price.toLocaleString()}</p>
                    <p className={`text-gray-700 text-sm ${layout === "grid" ? "hidden" : "hidden md:block"}`}>
                        {description.split("|")[0]}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
