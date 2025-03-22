"use client";

import Link from "next/link";
import React from "react";
import { useShop } from "./ShopContext";
import Image from "next/image";
import { XIcon } from "lucide-react";

const CartCatalog = () => {
    const { cartItems, removeFromCart, calculateSubtotal } = useShop(); 

    return (
        <section className="bg-white px-5 py-20 md:p-20 grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Make table horizontally scrollable on small screens */}
            <div className="md:col-span-2 overflow-x-auto">
                <table className="w-full border-collapse min-w-[600px]">
                    <thead>
                        <tr className="bg-[#FBEBB5]">
                            <th className="min-w-20"></th>
                            <th className="p-5 text-black text-lg md:text-xl font-semibold whitespace-nowrap">Product</th>
                            <th className="p-5 text-black text-lg md:text-xl font-semibold whitespace-nowrap">Quantity</th>
                            <th className="p-5 text-black text-lg md:text-xl font-semibold whitespace-nowrap">Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {cartItems.length > 0 ? (
                            cartItems.map((item, index) => (
                                <tr key={index} className="">
                                    <td className="p-3">
                                        <Image 
                                            src={item.image} 
                                            alt={item.name} 
                                            width={100} 
                                            height={100} 
                                            className="bg-[#FBEBB5] rounded-2xl w-30 h-22 md:w-36 md:h-25 object-contain" 
                                            unoptimized 
                                        />
                                    </td>
                                    <td className="text-gray-700 text-lg md:text-xl text-center">{item.name}</td>
                                    <td className="text-gray-700 text-lg md:text-xl text-center">{item.quantity}</td>
                                    <td className="text-black text-lg md:text-xl text-center font-semibold">
                                        Rs.{item.price.toLocaleString()}
                                    </td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="border-0 cursor-pointer bg-gray-500 rounded-full p-1 hover:bg-gray-700"
                                        >
                                            <XIcon size={15} className="text-white" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-20 text-left md:text-center text-gray-500 text-lg md:text-xl">
                                    No items added to cart
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Cart Summary Section */}
            <div className="col-span-1 bg-[#FBEBB5] py-20 px-10 flex flex-col items-center self-start">
                <h4 className="text-black text-3xl font-bold text-center capitalize mb-5">Cart Totals</h4>
                <div className="w-full flex justify-between items-center mb-4">
                    <strong className="text-black">Delivery</strong>
                    <p className="text-md text-gray-700 font-light">Rs.</p>
                </div>
                <div className="w-full flex justify-between items-center mb-4">
                    <strong className="text-black">Subtotal</strong>
                    <p className="text-md text-gray-700 font-light">
                        Rs.{calculateSubtotal().toLocaleString()}
                    </p>
                </div>
                <div className="w-full flex justify-between items-center mb-4">
                    <strong className="text-black">Total</strong>
                    <p className="text-lg md:text-xl text-[#6b5a22] font-bold">
                        Rs. {calculateSubtotal().toLocaleString()}
                    </p>
                </div>
                <Link
                    href="/checkout"
                    className="mt-5 border-gray-black border-1 bg-transparent rounded-2xl py-4 px-10 text-lg md:text-xl font-light text-black hover:bg-black hover:text-white transition-colors duration-300"
                >
                    Check Out
                </Link>
            </div>
        </section>
    );
};

export default CartCatalog;
