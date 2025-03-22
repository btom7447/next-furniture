"use client";
import { X, XIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import Modal from "react-modal";
import { useShop } from "./ShopContext";
import Link from "next/link";

const CartModal: React.FC<{ isOpen: boolean; onRequestClose: () => void }> = ({ isOpen, onRequestClose }) => {
  const { cartItems, removeFromCart, calculateSubtotal } = useShop(); 

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Cart Modal"
      ariaHideApp={false}
      className="fixed top-0 right-0 bg-white shadow-lg w-[85dvw] md:w-120 z-500"
      overlayClassName="fixed inset-0 bg-[#1A1A1A3D] z-1000 flex items-start justify-end p-5 pointer-events-auto"
    >
      <div className="pointer-events-auto flex flex-col justify-between items-start">
        <button onClick={onRequestClose} className="cursor-pointer fixed top-10 right-10">
          <X size={25} />
        </button>
        <h2 className="mx-5 my-10 md:m-10 text-2xl font-bold mb-5 border-gray-300 border-b-1 pb-7 w-[80%]">Shopping Cart</h2>
        <div className="p-5 md:p-10 w-full h-[250px] flex flex-col overflow-y-auto">
          {cartItems.length === 0 ? (
            <p className="text-gray-600 m-20 text-center">Your cart is empty.</p>
          ) : (
            <ul className="space-y-2">
              {cartItems.map((item) => (
                <li key={item.id} className="relative flex gap-3 justify-start items-center pr-7">
                  <Image 
                    src={item.image} 
                    alt={item.name} 
                    width={100} 
                    height={100} 
                    className="bg-[#FFF9E5] w-15 h-15 md:w-25 md:h-25 rounded-2xl object-contain" 
                    unoptimized
                  />
                  <div className="flex flex-col items-start">
                    <h5 className="text-md md:text-xl font-semibold text-black capitalize">{item.name}</h5>
                    <div className="flex items-center space-x-3 py-2">
                      <span className="text-lg text-gray-700 font-semibold">{item.quantity}</span>
                      <XIcon size={10} />
                      <h6 className="text-md text-[#6b5a22]">Rs.{item.price.toLocaleString()}</h6>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="absolute top-[35%] right-2 bg-gray-500 rounded-full p-1 hover:bg-gray-700">
                    <XIcon size={17} className="text-white" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="mt-10 py-3 px-10 w-full flex items-center justify-between gap-10">
          <p className="text-md md:text-xl text-gray-700 font-light">Subtotal</p>
          <h6 className="text-lg md:text-2xl text-[#6b5a22] font-bold">Rs. {calculateSubtotal().toLocaleString()}</h6>
        </div>
        <nav className="w-full py-5 px-5 md:px-10 flex justify-between items-center md:gap-10 border-t-1 border-gray-300">
            <Link
              href="/cart"
              onClick={onRequestClose}
              className="relative py-3 px-4 md:px-10 text-lg md:text-xl rounded-2xl md:rounded-4xl bg-white border-1 border-gray-700 text-black hover:text-white hover:bg-gray-900 transition-colors duration-300"
            >
              View Cart
            </Link>
            <Link
              href="/checkout"
              onClick={onRequestClose}
              className="relative py-3 px-4 md:px-10 text-lg md:text-xl rounded-2xl md:rounded-4xl bg-white border-1 border-gray-700 text-black hover:text-white hover:bg-gray-900 transition-colors duration-300"
            >
              Checkout
            </Link>
        </nav>
      </div>
    </Modal>
  );
};

export default CartModal;
