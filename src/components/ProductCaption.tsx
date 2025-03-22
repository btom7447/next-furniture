"use client";
import React, { useState, useEffect } from "react";
import { Star, StarHalf, StarOff, Minus, Plus, Heart } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useShop } from "./ShopContext";

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

interface ProductCaptionProps {
  products: Product;
}

const ProductCaption: React.FC<ProductCaptionProps> = ({ products }) => {
  const { addToCart, wishlistItems, addToWishlist, removeFromWishlist } = useShop(); // Get wishlist from context
  const { reviews, id } = products;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("L");

  // Check if product is in wishlist from context, not localStorage
  const isSaved = wishlistItems.some((item) => item.id === id);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));

  const handleSizeSelection = (size: string) => setSelectedSize(size);

  const handleAddToCart = () => {
    const newItem = {
      id,
      name: products.name,
      price: products.price,
      quantity,
      image: products.image,
    };

    addToCart(newItem);

    toast.success(`${products.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
    });
  };

  const handleWishlistToggle = () => {
    if (isSaved) {
      removeFromWishlist(id);
    } else {
      addToWishlist({
        id,
        name: products.name,
        price: products.price,
        image: products.image,
      });
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <h1 className="capitalize text-4xl font-medium text-black">{products.name}</h1>
      <h4 className="text-xl font-light text-gray-700 mt-2">Rs. {products.price.toLocaleString()}</h4>

      {/* Reviews and HR */}
      <div className="flex flex-wrap items-center justify-center md:justify-start space-x-5 space-y-3 mt-4">
        {/* Star Ratings */}
        <div className="flex items-center space-x-2">
          {Array.from({ length: Math.floor(reviews) }).map((_, index) => (
            <Star key={`full-${index}`} size={25} className="text-yellow-400" fill="currentColor" />
          ))}
          {reviews % 1 >= 0.5 && <StarHalf key="half-star" size={25} className="text-yellow-400" fill="currentColor" />}
          {Array.from({ length: 5 - Math.floor(reviews) - (reviews % 1 >= 0.5 ? 1 : 0) }).map((_, index) => (
            <StarOff key={`empty-${index}`} size={25} className="text-gray-300" fill="currentColor" />
          ))}
        </div>
        <hr className="hidden md:block w-0 h-10 bg-transparent border-r-2 border-gray-500" />
        <h6 className="capitalize text-lg text-gray-700">
          {products.reviewers} Customer Review{products.reviewers !== 1 ? "s" : ""}
        </h6>
      </div>

      <div className="mt-5">
        <p className="block text-black text-md md:text-xl text-left md:text-justify">
          {products.description.split("|")[0]}
        </p>
      </div>

      {/* Size section */}
      <section className="mt-10">
        <h6 className="mb-3 capitalize text-2xl text-gray-700">Size</h6>
        <div className="flex space-x-6">
          {["L", "XL", "XS"].map((size) => (
            <button
              key={size}
              type="button"
              className={`w-10 h-10 text-lg rounded-lg cursor-pointer ${
                selectedSize === size ? "bg-black text-white" : "bg-[#FFF9E5] text-black"
              }`}
              onClick={() => handleSizeSelection(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* Add to Cart Section */}
      <section className="mt-10 flex flex-wrap items-center gap-5 border-b-1 pb-10 border-gray-300">
        {/* Quantity Selector */}
        <div className="space-x-5 flex items-center border-1 border-gray-500 rounded-2xl p-5">
          <button type="button" className="cursor-pointer" onClick={decreaseQuantity} disabled={quantity === 1}>
            <Minus size={15} />
          </button>
          <span className="w-10 text-center text-lg text-black">{quantity}</span>
          <button type="button" className="cursor-pointer" onClick={increaseQuantity}>
            <Plus size={15} />
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          type="button"
          className="cursor-pointer py-5 px-10 border-1 border-gray-500 rounded-2xl text-black text-lg hover:bg-black hover:text-white"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

        {/* Wishlist Button - Toggles state */}
        <button type="button" className="cursor-pointer border-none" onClick={handleWishlistToggle}>
          <Heart size={40} strokeWidth={1} fill={isSaved ? "#000" : "none"} />
        </button>
      </section>

      {/* Toastify Container */}
      <ToastContainer />
    </div>
  );
};

export default ProductCaption;