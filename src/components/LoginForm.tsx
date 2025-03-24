"use client";

import { useState } from "react";
import { 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signInWithCredential,
    PhoneAuthProvider
} from "firebase/auth";
import { 
    auth, 
    googleProvider, 
    setupRecaptcha, 
    signInWithPhoneNumber 
} from "@/lib/firebase";
import { PhoneIcon } from "lucide-react"; 
import { FaGoogle } from "react-icons/fa";

const LoginForm = ({ onSuccess }: { onSuccess: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [otp, setOtp] = useState("");
    const [verificationId, setVerificationId] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            onSuccess();
        } catch (err) {
            setError("Invalid email or password.");
        }
    };

    const handlePhoneSignIn = async () => {
        try {
            const recaptchaVerifier = setupRecaptcha("recaptcha-container");
            const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
            setVerificationId(confirmation.verificationId);
        } catch (error) {
            console.error("Phone sign-in error:", error);
        }
    };
    
    const verifyOtp = async () => {
        try {
            const credential = PhoneAuthProvider.credential(verificationId, otp);
            await signInWithCredential(auth, credential);
            onSuccess(); // Close modal on success
        } catch (error) {
            console.error("OTP verification failed:", error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            onSuccess(); // Close modal on success
        } catch (error) {
            console.error("Google sign-in error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="px-10 py-0 pb-10 w-full h-90 flex flex-col items-start overflow-y-auto">
            {error && <p className="text-red-500">{error}</p>}
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

            <div className="w-full flex items-center justify-between mt-10 gap-3">
                <button 
                    onClick={handleGoogleSignIn} 
                    className="flex-1/2 flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <FaGoogle size={24} strokeWidth={1} />
                    <span>Google</span>
                </button>

                <button 
                    type="button" 
                    onClick={handlePhoneSignIn}
                    className="flex-1/2 flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                >
                    <PhoneIcon size={24} strokeWidth={1} fill="#000" />
                    <span>Phone</span>
                </button>
            </div>
            
            {/* Hidden Recaptcha */}
            <div id="recaptcha-container"></div>
        </form>
    );
};

export default LoginForm;
