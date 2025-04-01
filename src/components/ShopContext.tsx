"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useProductContext } from "@/components/ProductContext"; // Import ProductContext

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface ShopContextType {
  cartCount: number;
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
  calculateSubtotal: () => number;

  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  openWishlist: () => void;
  closeWishlist: () => void;
  isWishlistOpen: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const { fetchProductById } = useProductContext(); // Access ProductContext
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Load cart and wishlist from localStorage and update with up-to-date product data
  useEffect(() => {
    const loadCartItems = async () => {
      const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCartItems = await Promise.all(
        storedCart.map(async (item: CartItem) => {
          const product = await fetchProductById(item.id);
          return {
            ...item,
            image: product?.image || item.image, // Ensure image is updated from product data
          };
        })
      );
      setCartItems(updatedCartItems);
    };

    const loadWishlistItems = async () => {
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const updatedWishlistItems = await Promise.all(
        storedWishlist.map(async (item: WishlistItem) => {
          const product = await fetchProductById(item.id);
          return {
            ...item,
            image: product?.image || item.image, // Ensure image is updated from product data
          };
        })
      );
      setWishlistItems(updatedWishlistItems);
    };

    loadCartItems();
    loadWishlistItems();
  }, [fetchProductById]); // Only run once when the component mounts

  // Save cart to localStorage only when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Save wishlist to localStorage only when it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Compute cart count dynamically
  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Update cart dynamically in state
  const addToCart = (item: CartItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      let updatedCart;
      
      if (existingItem) {
        updatedCart = prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedCart = [...prevItems, item];
      }
  
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save after updating state
      return updatedCart;
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== id);
      localStorage.setItem("cart", JSON.stringify(updatedCart)); // Save to localStorage
      return updatedCart;
    });
  };

  // Update wishlist dynamically in state
  const addToWishlist = (item: WishlistItem) => {
    setWishlistItems((prevItems) =>
      prevItems.some((wishlistItem) => wishlistItem.id === item.id) ? prevItems : [...prevItems, item]
    );
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const openWishlist = () => setIsWishlistOpen(true);
  const closeWishlist = () => setIsWishlistOpen(false);

  return (
    <ShopContext.Provider
      value={{
        cartCount,
        cartItems,
        addToCart,
        removeFromCart,
        openCart,
        closeCart,
        isCartOpen,
        calculateSubtotal,
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        openWishlist,
        closeWishlist,
        isWishlistOpen,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within a ShopProvider");
  return context;
}
