"use client";
import Link from "next/link";
import { X, LogInIcon, LogOutIcon  } from "lucide-react";
import { usePathname } from "next/navigation";
import { useAuth } from "./AuthContext";
import AuthModal from "./AuthModal"; 
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const HamburgerMenu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) => {
    const pathname = usePathname();
    const { user } = useAuth(); // Get user from AuthContext
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);

    const handleAuthClick = () => {
        if (user) {
        // If logged in, log out
        signOut(auth).then(() => {
            localStorage.removeItem("isLoggedIn"); 
            toast.success(`You're logged out!`, {
                position: "top-right",
                autoClose: 3000,
            });

        }).catch((error) => console.error("Logout Error:", error));
        } else {
        // If not logged in, open login modal
        setAuthModalOpen(true);
        }
    };

    return (
        <div
            className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${
                isOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300 md:hidden`}
        >
            {/* Close Button */}
            <button className="absolute top-10 right-5" onClick={() => setIsOpen(false)}>
                <X size={24} />
            </button>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col items-center mt-30 space-y-10">
                <Link
                    href="/"
                    className="relative text-xl text-black hover:text-gray-900 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    Home
                    <span
                        className={`absolute left-0 -bottom-2 h-0.5 transition-all duration-200 ${
                            pathname === "/" ? "w-full bg-black" : "w-0 bg-black/0"
                        }`}
                    ></span>
                </Link>
                <Link
                    href="/shop"
                    className="relative font-poppins text-xl text-black hover:text-gray-900 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                >       
                    Shop
                    <span
                        className={`absolute left-0 -bottom-2 h-0.5 transition-all duration-200 ${
                            pathname === "/shop" ? "w-full bg-black" : "w-0 bg-black/0"
                        }`}
                    ></span>
                </Link>
                <Link
                    href="/about"
                    className="relative text-xl text-black hover:text-gray-900 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    About
                    <span
                        className={`absolute left-0 -bottom-2 h-0.5 transition-all duration-200 ${
                            pathname === "/about" ? "w-full bg-black" : "w-0 bg-black/0"
                        }`}
                    ></span>
                </Link>
                <Link
                    href="/contact"
                    className="relative text-xl text-black hover:text-gray-900 transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                >
                    Contact
                    <span
                        className={`absolute left-0 -bottom-2 h-0.5 transition-all duration-200 ${
                            pathname === "/contact" ? "w-full bg-black" : "w-0 bg-black/0"
                        }`}
                    ></span>
                </Link>
            </nav>

            <button type="button" className="cursor-pointer absolute bottom-10 right-5" onClick={() => { handleAuthClick(); setIsOpen(false); }}>
                {user ? <LogOutIcon size={24} /> : <LogInIcon size={24} />}
            </button>

            <AuthModal isOpen={isAuthModalOpen} onClose={() => setAuthModalOpen(false)} />
            {/* Toastify Container */}
            <ToastContainer />
        </div>
    );
};

export default HamburgerMenu;
