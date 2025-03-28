"use client";
import React, { useState } from "react";
import { User, Heart, ShoppingCart, Search, LogInIcon, LogOutIcon } from "lucide-react";
import Link from "next/link";
import CartModal from "./CartModal";
import WishlistModal from "./WishlistModal";
import { useShop } from "./ShopContext";
import { useAuth } from "./AuthContext";
import AuthModal from "./AuthModal"; 
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import SearchModal from "./SearchModal";

const NavButtons = () => {
  const { 
    cartCount, openCart, isCartOpen, closeCart, 
    openWishlist, isWishlistOpen, closeWishlist 
  } = useShop();

  const { user } = useAuth(); 
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const handleAuthClick = () => {
    if (user) {
      signOut(auth).then(() => {
        localStorage.removeItem("isLoggedIn"); 
      }).catch((error) => console.error("Logout Error:", error));
    } else {
      setAuthModalOpen(true);
    }
  };

  return (
    <div className="flex align-center justify-center space-x-7 md:space-x-10">
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

      <button className="cursor-pointer" onClick={() => setSearchModalOpen(true)}>
        <Search size={24} />
      </button>

      {/* Login/Logout Button */}
      <button type="button" className="cursor-pointer hidden lg:block ml-12" onClick={handleAuthClick}>
        {user ? <LogOutIcon size={24} /> : <LogInIcon size={24} />}
      </button>

      {/* Modals */}
      <CartModal isOpen={isCartOpen} onRequestClose={closeCart} />
      <WishlistModal isOpen={isWishlistOpen} onRequestClose={closeWishlist} />
      <SearchModal isOpen={isSearchModalOpen} onRequestClose={() => setSearchModalOpen(false)} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export default NavButtons;
