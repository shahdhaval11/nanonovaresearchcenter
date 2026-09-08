import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import ToastProvider from "@/components/layout/ToastProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "NanoNova Research Training Centre",
    template: "%s | NanoNova Research Training Centre",
  },
  description:
    "Industry-oriented training, research guidance and hands-on laboratory experience in Microbiology, Biotechnology, Bioinformatics, Medical Laboratory Science and more.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingContact />
        <ToastProvider />
      </body>
    </html>
  );
}
