"use client";

import { useState } from "react";
import Modal from "react-modal";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { motion, AnimatePresence } from "framer-motion"; 
import { XIcon } from "lucide-react";

export default function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [isLogin, setIsLogin] = useState(true);

    const handleLoginSuccess = () => {
        onClose(); 
    };

    const handleRegisterSuccess = () => {
        setIsLogin(true);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onRequestClose={onClose}
                    ariaHideApp={false} 
                    className="fixed inset-0 flex items-start justify-end"
                    overlayClassName="fixed inset-0 bg-[#1A1A1A3D] z-1000 flex items-start justify-end p-5 pointer-events-auto"
                >
                    <motion.div
                        key="auth-modal"
                        initial={{ y: -50, opacity: 0 }} 
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -50, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative bg-white shadow-lg w-[85dvw] md:w-120"
                    >
                        <button className="cursor-pointer fixed top-10 right-10" onClick={onClose}>
                            <XIcon size={25} />
                        </button>
                        <h2 className="m-10 text-2xl font-bold mb-5 border-gray-300 border-b-1 pb-7 w-[80%]">
                            {isLogin ? "Login" : "Register"}
                        </h2>
                        
                        {isLogin ? <LoginForm onSuccess={handleLoginSuccess} /> : <RegisterForm onSuccess={handleRegisterSuccess} />}

                        <div className="w-full pt-5 px-5 md:px-10 border-t-1 border-gray-300 flex items-center space-x-2">
                            <p className="text-lg md:text-xl text-black">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                            </p>
                            <button onClick={() => setIsLogin(!isLogin)} className="border-0 text-lg md:text-xl text-[#6b5a22] cursor-pointer">
                                {isLogin ? "Register" : "Login"}
                            </button>
                        </div>
                        <div className="w-full py-2 px-5 md:px-10 flex items-center space-x-2">
                            <button onClick={() => setIsLogin(!isLogin)} className="border-0 text-lg md:text-xl text-[#6b5a22] cursor-pointer">
                                Forgot password?
                            </button>
                        </div>
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
}
