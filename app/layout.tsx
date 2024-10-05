import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
// import "@/assets/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import 'photoswipe/dist/photoswipe.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "lappy-t | Find your best laptop",
  description: "Find your best laptop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar />
          {children}
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
}
