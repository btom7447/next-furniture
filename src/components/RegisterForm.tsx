"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "react-toastify";

const RegisterForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Only check confirmPassword if showPassword is false (hidden confirm password)
        if (!showPassword && password !== confirmPassword) { 
            toast.error("Passwords do not match.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, email, password);
            onSuccess();
        } catch (err) {
            toast.error((err as Error).message || "Failed to create account. Try again.", {
                position: "top-right",
                autoClose: 3000,
            });        }
    };

    return (
        <form onSubmit={handleSubmit} className="px-5 md:px-10 pb-10 w-full h-90 flex flex-col items-start overflow-y-auto">
            <label className="mb-5 w-full flex flex-col text-lg text-black">
                Name
                <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="p-3 border border-gray-300 rounded-2xl"
                />
            </label>
            <label className="mb-5 w-full flex flex-col text-lg text-black">
                Email
                <input 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="p-3 border border-gray-300 rounded-2xl"
                />
            </label>
            <label className="mb-5 w-full gap-2 flex flex-col text-lg text-black text-left">
                Password
                <div className="relative">
                    <input 
                        type={showPassword ? "text" : "password"} 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        className="p-3 border border-gray-300 rounded-2xl text-black text-left w-full"
                    />
                    <button 
                        type="button" 
                        onClick={() => {
                            setShowPassword(!showPassword);
                            setConfirmPassword(""); // Reset confirm password when toggling visibility
                        }} 
                        className="absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                        {showPassword ? <EyeOffIcon size={15} /> : <EyeIcon size={15} />}
                    </button>
                </div>
            </label>

            {/* Hide confirm password field when showPassword is true */}
            {!showPassword && (
                <label className="mb-5 w-full gap-2 flex flex-col text-lg text-black text-left">
                    Confirm Password
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        className="p-3 border border-gray-300 rounded-2xl text-black text-left"
                    />
                </label>
            )}

            <button type="submit" className="w-full border-1 border-black bg-black text-white py-3 px-10 text-lg rounded-2xl hover:bg-white hover:text-black transition cursor-pointer">
                Register
            </button>
        </form>
    );
};

export default RegisterForm;
