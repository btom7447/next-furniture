"use client";

import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import ProductCard from "./ProductCard"; 

interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    layout: string;
    description: string;
}

interface TopPickCarouselProps {
    products: Product[];
}

// Splide carousel options
const carouselOptions: Splide.SplideOptions = {
    type: "loop",
    perPage: 4,
    perMove: 1,
    autoplay: true,
    interval: 3000,
    arrows: false,
    pagination: false,
    speed: 800,
    breakpoints: {
        1024: { perPage: 2 },
        768: { perPage: 1 },
    },
};

const TopPickCarousel: React.FC<TopPickCarouselProps> = ({ products }) => {
     if (!products || products.length === 0) return <p>No products available.</p>;

    return (
        <div className="w-full mt-10">
            <Splide options={carouselOptions} className="px-4">
                {products.map(({ id, image, name, price }) => (
                <SplideSlide key={id}>
                    <ProductCard image={image} name={name} price={price} id={id} description='' layout="grid" />
                </SplideSlide>
                ))}
            </Splide>
        </div>
    );
};

export default TopPickCarousel;