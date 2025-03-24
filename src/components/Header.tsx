"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import HamburgerMenu from "./HamburgerMenu";
import NavButtons from "./NavButtons";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 0);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";


    return (
        <header
            className={`w-full flex items-center justify-between md:justify-around p-5 fixed top-0 left-0 z-50 transition-all duration-300 ${
                isScrolled ? "bg-white shadow-md" : "bg-transparent"
            }`}
        >
            <Link href="/">
                <Image src="/images/logo.png" alt="Furniture store logo" width={50} height={50} className="object-contain" unoptimized />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-12">
                <Link
                    href="/"
                    className="relative text-[16px] text-black hover:text-gray-900 transition-colors duration-300"
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
                    className="relative font-poppins text-[16px] text-black hover:text-gray-900 transition-colors duration-300"
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
                    className="relative text-[16px] text-black hover:text-gray-900 transition-colors duration-300"
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
                    className="relative text-[16px] text-black hover:text-gray-900 transition-colors duration-300"
                >
                    Contact
                    <span
                        className={`absolute left-0 -bottom-2 h-0.5 transition-all duration-200 ${
                            pathname === "/contact" ? "w-full bg-black" : "w-0 bg-black/0"
                        }`}
                    ></span>
                </Link>
            </nav>

            <NavButtons />
            <button className="md:hidden text-black" onClick={() => setIsOpen(!isOpen)}>
                <Menu size={28} />
            </button>
            <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </header>
    );
};

export default Header;