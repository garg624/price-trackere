import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { FaAngleDoubleDown } from "react-icons/fa";
import { Toaster } from "@/components/ui/sonner"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Price Tracker",
  description: "Helps to track amazon product so that you can grab best deals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
      <NextTopLoader
        color="#3061F2"
        showSpinner={false}
      />
        {children}
        <p className="fixed bottom-6 right-6 animate-bounce"> <FaAngleDoubleDown className='text-4xl'/></p>
        <Toaster />
        </body>
    </html>
  );
}
