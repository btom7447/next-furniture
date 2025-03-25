"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion"; 
import SearchCard from "./SearchCard";
import { Product, getAllProducts } from "@/lib/airtable"; // Import the function to fetch products

const SearchModal: React.FC<{ isOpen: boolean; onRequestClose: () => void }> = ({
    isOpen,
    onRequestClose,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    // Fetch all products when modal opens
    useEffect(() => {
        if (isOpen) {
        setLoading(true);
        getAllProducts()
            .then((data) => setProducts(data))
            .catch((err) => console.error("Error fetching products:", err))
            .finally(() => setLoading(false));
        }
    }, [isOpen]); // Fetch only when modal opens

  // Filter products based on search term
    const filteredProducts: Product[] = searchTerm
        ? products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

  return (
    <AnimatePresence>
        {isOpen && (
            <Modal
                isOpen={isOpen}
                onRequestClose={onRequestClose}
                contentLabel="Search Modal"
                ariaHideApp={false}
                className="fixed top-0 right-0 w-[85dvw] md:w-120 z-500"
                overlayClassName="fixed inset-0 bg-[#1A1A1A3D] z-1000 flex items-start justify-end p-5 pointer-events-auto"
            >
                <motion.div
                    key="search-modal"
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="pointer-events-auto flex flex-col justify-between items-start bg-white shadow-lg h-full"
                >
                    <button onClick={onRequestClose} className="cursor-pointer fixed top-10 right-10">
                        <X size={25} />
                    </button>
                   
                    <h2 className="my-10 mx-5 md:m-10 text-2xl md:text-3xl font-bold mb-5 border-gray-300 border-b-1 pb-7 w-[80%]">
                        Search Products
                    </h2>
                    <div className="px-10 w-full">
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-2xl"
                        />

                        <div className="mt-5 flex flex-col gap-3 overflow-y-auto h-[300px]">
                            {loading ? (
                                <p className="text-gray-500 block m-auto text-center">Loading products...</p>
                            ) : filteredProducts.length > 0 ? (
                                    filteredProducts.map((product: Product) => (
                                        <SearchCard key={product.id} product={product} onRequestClose={onRequestClose} />
                                     ))
                                ) : (
                                <p className="text-gray-500 m-auto text-center">No products found.</p>
                            )}
                        </div>
                    </div>
                    

                    
                </motion.div>
            </Modal>
    )}
    </AnimatePresence>
    );
};

export default SearchModal;
