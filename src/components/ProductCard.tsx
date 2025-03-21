import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
    image: string;
    name: string;
    price: number;
    id: string;
    layout?: "grid" | "list";  // ✅ Ensure layout is either "grid" or "list"
    description?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, name, price, id, description = "No description available", layout = "grid" }) => {
    // ✅ Check if the image URL is valid
    const imageUrl = image.startsWith("http") ? image : "/fallback-image.jpg"; 

    return (
        <Link href={`/product/${id}`} className="block">
            <div className={`bg-white flex justify-start ${layout === "grid" ? "flex-col items-start" : "gap-10 flex-row items-center"}`}>
                <Image
                    src={imageUrl} 
                    alt={name} 
                    width={240} 
                    height={240} 
                    className={`object-contain ${layout === "grid" ? "w-60 h-60 block m-auto" : "w-40 h-40 md:w-60 md:h-60"}`}
                    unoptimized // ✅ Avoids Next.js optimization if using dynamic external URLs
                />
                <div className={`flex flex-col ${layout === "grid" ? "w-full justify-center items-center" : "justify-start items-start"}`}>
                    <h2 className="text-lg font-normal text-center">{name}</h2>
                    <p className="text-2xl font-semibold text-center mt-2">Rs. {price.toLocaleString()}</p>
                    <p className={`text-gray-700 text-sm ${layout === "grid" ? "hidden" : "hidden md:block"}`}>
                        {description.split("|")[0]}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
