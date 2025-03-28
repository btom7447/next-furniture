import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";
import { ShopProvider } from "../components/ShopContext";
import { AuthProvider } from "@/components/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PoppinsSans = Poppins({
  variable: "--font-Poppins-sans",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Next Furniture",
  description: "A Furniture Store created with Next.js",
};

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${PoppinsSans.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ShopProvider>
              <RootLayoutClient>{children}</RootLayoutClient>
            </ShopProvider>
          </AuthProvider>
          <ToastContainer />
        </QueryClientProvider>
      </body>
    </html>
  );
}
