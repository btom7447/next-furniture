"use client";
import Link from "next/link";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";
const HamburgerMenu = ({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (value: boolean) => void }) => {
    const pathname = usePathname();
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
            <nav className="flex flex-col items-center mt-30 space-y-8">
                <Link
                    href="/"
                    className="relative text-2xl text-black hover:text-gray-900 transition-colors duration-300"
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
                    className="relative font-poppins text-2xl text-black hover:text-gray-900 transition-colors duration-300"
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
                    className="relative text-2xl text-black hover:text-gray-900 transition-colors duration-300"
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
                    className="relative text-2xl text-black hover:text-gray-900 transition-colors duration-300"
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

        </div>
    );
};

export default HamburgerMenu;
