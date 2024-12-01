import type { Metadata } from "next";
import { WebContainerProvider } from "./contexts/web-container-context";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import "@radix-ui/themes/styles.css";
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <WebContainerProvider>
            <Navbar />
            {children}
        </WebContainerProvider>
      </body>
    </html>
  );
}
