"use client";
import React, { useState } from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';

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

interface ProductDetailTabsProps {
    products: Product;
}

const ProductDetailTabs: React.FC<ProductDetailTabsProps> = ({ products }) => {
    const [activeTab, setActiveTab] = useState<'description' | 'additional' | 'reviews'>('description');

    return (
        <section className="pt-10 mt-10 border-t-1 border-gray-300">
            {/* Tab Buttons */}
            <nav className="py-3 flex items-center justify-start md:justify-center space-x-8 overflow-x-auto whitespace-nowrap">
                <button
                    onClick={() => setActiveTab('description')}
                    className={`relative md:text-3xl text-black hover:text-gray-900 transition-colors duration-300 ${
                        activeTab === 'description' ? 'font-medium' : 'text-gray-500'
                    }`}
                >
                    Description
                    <span
                        className={`absolute left-0 -bottom-[1px] h-0.5 transition-all duration-200 ${
                            activeTab === 'description' ? 'w-full bg-black' : 'w-0 bg-black/0'
                        }`}
                    ></span>
                </button>
                <button
                    onClick={() => setActiveTab('additional')}
                    className={`relative md:text-3xl text-black hover:text-gray-900 transition-colors duration-300 ${
                        activeTab === 'additional' ? 'font-medium' : 'text-gray-500'
                    }`}
                >
                    Additional Information
                    <span
                        className={`absolute left-0 -bottom-[1px] h-0.5 transition-all duration-200 ${
                            activeTab === 'additional' ? 'w-full bg-black' : 'w-0 bg-black/0'
                        }`}
                    ></span>
                </button>
                <button
                    onClick={() => setActiveTab('reviews')}
                    className={`relative md:text-3xl text-black hover:text-gray-900 transition-colors duration-300 ${
                        activeTab === 'reviews' ? 'font-medium' : 'text-gray-500'
                    }`}
                >
                    Reviews ({products.reviewers})
                    <span
                        className={`absolute left-0 -bottom-[1px] h-0.5 transition-all duration-200 ${
                            activeTab === 'reviews' ? 'w-full bg-black' : 'w-0 bg-black/0'
                        }`}
                    ></span>
                </button>
            </nav>

            {/* Tab Content */}
            <div className="mt-6">
                {activeTab === 'description' && (
                    <div>
                        {products.description.split('|').map((desc, index) => (
                            <p key={index} className="mb-3 text-black text-md md:text-xl">
                                {desc}
                            </p>
                        ))}
                    </div>
                )}
                {activeTab === 'additional' && (
                    <div className="space-y-4">
                        <div className="flex">
                            <span className="w-32 font-medium">SKU:</span>
                            <span className="text-gray-700">{products.sku}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 font-medium">Category:</span>
                            <span className="text-gray-700">{products.category}</span>
                        </div>
                        <div className="flex">
                            <span className="w-32 font-medium">Tags:</span>
                            <span className="text-gray-700">{products.tags.join(', ')}</span>
                        </div>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div>
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                                {Array.from({ length: Math.floor(products.reviews) }).map((_, index) => (
                                    <Star key={`full-${index}`} size={20} className="text-yellow-400" fill="currentColor" />
                                ))}
                                {products.reviews % 1 >= 0.5 && (
                                    <StarHalf size={20} className="text-yellow-400" fill="currentColor" />
                                )}
                                {Array.from({ length: 5 - Math.ceil(products.reviews) }).map((_, index) => (
                                    <StarOff key={`empty-${index}`} size={20} className="text-gray-300" fill="currentColor" />
                                ))}
                            </div>
                            <span className="text-gray-700">
                                {products.reviews} out of 5 ({products.reviewers} reviews)
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductDetailTabs;