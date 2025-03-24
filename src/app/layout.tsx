import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../styles/globals.css";
import RootLayoutClient from "@/components/RootLayoutClient";
import { ShopProvider } from "../components/ShopContext";
import { AuthProvider } from "@/components/AuthContext";

const PoppinsSans = Poppins({
  variable: "--font-Poppins-sans",
  subsets: ["latin"],
  weight: "400",
});


export const metadata: Metadata = {
  title: "Next Furniture",
  description: "A Furniture Stored created with Next JS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${PoppinsSans.variable} antialiased`}>
        <AuthProvider>
          <ShopProvider>
            <RootLayoutClient>
              {children}
            </RootLayoutClient>
          </ShopProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
