"use client";
import React, { useState, useEffect } from 'react';
import { Star, StarHalf, StarOff, Minus, Plus, Heart } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    const { reviews, id } = products;

    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('L');
    const [isSaved, setIsSaved] = useState(false);

    // Calculate the number of full stars, half stars, and empty stars
    const fullStars = Math.floor(reviews);
    const hasHalfStar = reviews % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    // Function to handle quantity increase
    const increaseQuantity = () => {
        setQuantity((prev) => prev + 1);
    };

    // Function to handle quantity decrease
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    // Function to handle size selection
    const handleSizeSelection = (size: string) => {
        setSelectedSize(size);
    };

    // Check if the product is already saved on component mount
    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('saved') || '[]');
        const isProductSaved = savedItems.some((item: Product) => item.id === id);
        setIsSaved(isProductSaved);
    }, [id]);

    // Function to handle "Add to Cart" button click
    const handleAddToCart = () => {
        // Retrieve existing cart from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');

        // Check if the product is already in the cart
        const existingProductIndex = cart.findIndex((item: any) => item.id === id);

        if (existingProductIndex !== -1) {
            // Update quantity if the product is already in the cart
            cart[existingProductIndex].quantity += quantity;
        } else {
            // Add new product to the cart
            cart.push({
                id,
                name: products.name,
                price: products.price,
                quantity,
                size: selectedSize,
            });
        }

        // Save updated cart to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Show Toastify notification
        toast.success(`${products.name.charAt(0).toUpperCase() + products.name.slice(1)} added to cart!`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    // Function to handle "Save" button click
    const handleSave = () => {
        const savedItems = JSON.parse(localStorage.getItem('saved') || '[]');

        if (isSaved) {
            // Remove the product from the saved list
            const updatedSavedItems = savedItems.filter((item: Product) => item.id !== id);
            localStorage.setItem('saved', JSON.stringify(updatedSavedItems));
            setIsSaved(false);
            toast.info(`${products.name.charAt(0).toUpperCase() + products.name.slice(1)} removed from wishlist`);
        } else {
            // Add the product to the saved list
            savedItems.push(products); // Save the entire product object
            localStorage.setItem('saved', JSON.stringify(savedItems));
            setIsSaved(true);
            toast.success(`${products.name.charAt(0).toUpperCase() + products.name.slice(1)} added to wishlist`);
        }
    };

    return (
        <div className="flex-1 flex flex-col">
            <h1 className="capitalize text-4xl font-medium text-black">{products.name}</h1>
            <h4 className="text-xl font-light text-gray-700 mt-2">Rs. {products.price.toLocaleString()}</h4>

            {/* Reviews and HR */}
            <div className="flex items-center justify-start space-x-5 mt-4">
                {/* Star Ratings */}
                <div className="flex items-center space-x-2">
                    {Array.from({ length: fullStars }).map((_, index) => (
                        <Star key={`full-${index}`} size={25} className="text-yellow-400" fill="currentColor" />
                    ))}
                    {hasHalfStar ? [<StarHalf key="half-star" size={25} className="text-yellow-400" fill="currentColor" />] : []}
                    {Array.from({ length: emptyStars }).map((_, index) => (
                        <StarOff key={`empty-${index}`} size={25} className="text-gray-300" fill="currentColor" />
                    ))}
                </div>
                <hr className="w-0 h-10 bg-transparent border-r-2 border-gray-500" />
                <h6 className="capitalize text-lg text-gray-700">
                    {products.reviewers} Customer Review{products.reviewers !== 1 ? 's' : ''}
                </h6>
            </div>
            <div className="mt-5">
                <p className="block text-black text-xl text-justify">
                    {products.description.split('|')[0]}
                </p>
            </div>

            {/* Size section */}
            <section className="mt-10">
                <h6 className="mb-3 capitalize text-2xl text-gray-700">Size</h6>
                <div className="flex space-x-6">
                    {['L', 'XL', 'XS'].map((size) => (
                        <button
                            key={size}
                            type="button"
                            className={`w-10 h-10 text-lg rounded-lg cursor-pointer ${
                                selectedSize === size
                                    ? 'bg-black text-white' // Active button style
                                    : 'bg-[#FFF9E5] text-black' // Inactive button style
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
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={decreaseQuantity}
                        disabled={quantity === 1}
                    >
                        <Minus size={15} />
                    </button>
                    <span className="w-10 text-center text-lg text-black">
                        {quantity}
                    </span>
                    <button
                        type="button"
                        className="cursor-pointer"
                        onClick={increaseQuantity}
                    >
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
                <button
                    type="button"
                    className="cursor-pointer border-none"
                    onClick={handleSave}
                >
                    <Heart size={40} strokeWidth={1} fill={isSaved ? '#000' : 'none'} />
                </button>
            </section>
            {/* More Details */}
            <section className='py-5 flex flex-col space-y-5'>
                <h6 className='flex text-gray-500 text-xl'>
                    <span className='w-[80px]'>
                        SKU
                    </span>
                    : {products.sku}
                </h6>
                <h6 className='flex capitalize text-gray-500 text-xl'>
                    <span className='w-[80px]'>
                        Category
                    </span>
                    : {products.category}
                </h6>
                <h6 className='flex capitalize text-gray-500 text-xl'>
                    <span className='w-[80px]'>
                        Tags
                    </span>
                    : {products.tags.join(', ')}
                </h6>
            </section>

            {/* Toastify Container */}
            <ToastContainer />
        </div>
    );
};

export default ProductCaption;