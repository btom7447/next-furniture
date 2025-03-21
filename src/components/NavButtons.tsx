"use client";
import React from "react";
import { User, Heart, ShoppingCart, Search } from "lucide-react";
import Link from "next/link";

const NavButtons = () => {
  return (
    <div className="flex align-center justify-center space-x-8">
      <Link href="/account">
        <User size={24} />
      </Link>
      <Link href="/wishlist">
        <Heart size={24} />
      </Link>
      <Link href="/cart">
        <ShoppingCart size={24} />
      </Link>
      <button>
        <Search size={24} />
      </button>
    </div>
  );
};

export default NavButtons;