"use client";
import React from "react";
import { User, Heart, ShoppingCart, Search } from "lucide-react";
import Link from "next/link";
import CartModal from "./CartModal";
import WishlistModal from "./WishlistModal";
import { useShop } from "./ShopContext";

const NavButtons = () => {
  const { 
    cartCount, openCart, isCartOpen, closeCart, 
    openWishlist, isWishlistOpen, closeWishlist 
  } = useShop();

  return (
    <div className="flex align-center justify-center space-x-8">
      <Link href="/account">
        <User size={24} />
      </Link>

      {/* Wishlist Button */}
      <button onClick={openWishlist} className="cursor-pointer relative">
        <Heart size={24} />
      </button>

      {/* Cart Button */}
      <button onClick={openCart} className="cursor-pointer relative">
        <ShoppingCart size={24} />
        {cartCount > 0 && (
          <span className="absolute top-[-12px] right-[-17px] w-6 h-6 flex items-center justify-center bg-gray-900 rounded-full text-white text-sm">
            {cartCount}
          </span>
        )}
      </button>

      <button>
        <Search size={24} />
      </button>

      {/* Modals */}
      <CartModal isOpen={isCartOpen} onRequestClose={closeCart} />
      <WishlistModal isOpen={isWishlistOpen} onRequestClose={closeWishlist} />
    </div>
  );
};

export default NavButtons;
