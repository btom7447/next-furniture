"use client";
import { X } from "lucide-react";
import Image from "next/image";
import React from "react";
import Modal from "react-modal";
import { useShop } from "./ShopContext";

const WishlistModal: React.FC<{ isOpen: boolean; onRequestClose: () => void }> = ({
  isOpen,
  onRequestClose,
}) => {
  const { wishlistItems, removeFromWishlist, addToCart } = useShop(); 

  //  Add all wishlist items to cart & clear wishlist
  const handleAddAllToCart = () => {
    wishlistItems.forEach((item) => {
      addToCart({ ...item, quantity: 1 }); 
      removeFromWishlist(item.id);
    });
    onRequestClose(); // Close modal after action
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Wishlist Modal"
      ariaHideApp={false}
      className="fixed top-0 right-0 bg-white shadow-lg w-[85dvw] md:w-120 z-500"
      overlayClassName="fixed inset-0 bg-[#1A1A1A3D] z-1000 flex items-start justify-end p-5 pointer-events-auto"
    >
      <div className="pointer-events-auto flex flex-col justify-between items-start">
        {/* Close Button */}
        <button onClick={onRequestClose} className="cursor-pointer fixed top-10 right-10">
          <X size={25} />
        </button>

        {/* Wishlist Header */}
        <h2 className="my-10 mx-5 md:m-10 text-2xl md:text-3xl font-bold mb-5 border-gray-300 border-b-1 pb-7 w-[80%]">
          Your Wishlist
        </h2>

        {/* Wishlist Items */}
        <div className="p-5 md:p-10 w-full h-[300px] flex flex-col overflow-y-auto">
          {wishlistItems.length === 0 ? (
            <p className="text-gray-600 m-20 text-center">Your wishlist is empty.</p>
          ) : (
            <ul className="space-y-2">
              {wishlistItems.map((item) => (
                <li key={item.id} className="relative flex gap-3 justify-start items-center pr-8">
                  {/* Product Image */}
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="bg-[#FFF9E5] w-15 h-15 md:w-25 md:h-25 rounded-2xl object-contain"
                    unoptimized
                  />
                  {/* Product Details */}
                  <div className="flex flex-col items-start">
                    <h5 className="text-md md:text-xl font-semibold text-black capitalize">{item.name}</h5>
                    <p className="text-md text-gray-700">Rs. {item.price.toLocaleString()}</p>
                  </div>
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="cursor-pointer absolute top-[35%] right-2 bg-gray-500 rounded-full p-1 border-none hover:bg-gray-700"
                  >
                    <X size={17} className="text-white" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation Buttons */}
        <nav className="w-full p-10 flex justify-end border-t-1 border-gray-300">
          <button
            onClick={handleAddAllToCart}
            className="py-3 px-7 md:px-10 text-xl rounded-4xl border-1 border-black bg-white text-black hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
          >
            Add All to Cart
          </button>
        </nav>
      </div>
    </Modal>
  );
};

export default WishlistModal;
