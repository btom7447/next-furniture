import React from "react";
import { getAllProducts } from "@/lib/airtable";
import TopPickCarousel from "./TopPickCarousel";
import Link from "next/link";

const TopPicks = async () => {
    const products = await getAllProducts();

    const updatedProducts = products.map((product) => ({
        ...product,
        layout: "grid", // Default to "grid" layout
    }));

    return (
        <div className="p-10 md:p-20 flex flex-col justify-center items-center w-full bg-white">
            <h4 className='text-4xl font-bold text-black md:text-6xl text-center md:leading-25'>Top Picks For You</h4>
            <p className="text-xl text-gray-500 text-center mt-4">
                Find a bright ideal to suit your taste with our great suspension, floor and table lights.
            </p>
            <TopPickCarousel products={updatedProducts} />
            <Link href="/shop" className="block mt-10 text-2xl">
                <button type="button" className="border-b border-black py-2 cursor-pointer">View More</button>
            </Link>
        </div>
    );
};

export default TopPicks;
