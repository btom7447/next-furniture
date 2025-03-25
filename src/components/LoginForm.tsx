"use client";

import { useState } from "react";
import { 
    signInWithEmailAndPassword, 
    signInWithPopup, 
} from "firebase/auth";
import { 
    auth, 
    googleProvider, 
} from "@/lib/firebase";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            onSuccess();
        } catch (err) {
            toast.error((err as Error).message || "Invalid email or password.", {
                position: "top-right",
                autoClose: 3000,
            });
           
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            onSuccess(); // Close modal on success
        } catch (err) {
            toast.error((err as Error).message || "Invalid email or password.", {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <form onSubmit={handleSubmit} className="px-5 md:px-10 py-0 pb-10 w-full h-90 flex flex-col items-start overflow-y-auto">
            <label className="mb-5 w-full flex flex-col text-lg text-black">
                Email
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="p-3 border border-gray-300 rounded-2xl"
                />
            </label>
            <label className="mb-5 w-full flex flex-col text-lg text-black">
                Password
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    className="p-3 border border-gray-300 rounded-2xl"
                />
            </label>
            <button 
                type="submit" 
                className="w-full bg-black text-white py-3 px-10 text-lg rounded-2xl hover:bg-white hover:text-black transition cursor-pointer"
            >
                Login
            </button>

            <div className="w-full flex items-center justify-center mt-10 gap-3">
                <button 
                    onClick={handleGoogleSignIn} 
                    className="flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <FaGoogle size={24} strokeWidth={1} />
                    <span>Sign in with Google</span>
                </button>

            </div>
        </form>
    );
};

export default LoginForm;
