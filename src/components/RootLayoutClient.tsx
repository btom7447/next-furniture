"use client";

import { useEffect, useState } from "react";
import Modal from "react-modal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted && document.getElementById("__next")) {
            Modal.setAppElement("#__next");
        }
    }, [isMounted]);

    if (!isMounted) return null; 

    return (
        <>
            <Header />
                {children}
            <Footer />
        </>
    );
}
