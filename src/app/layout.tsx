import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import AjaxProgressBarProvider from "@/features/ajax-progress-bar/provider";
import { BackToTopButton } from "@/components/ui/back-to-top-btn";
import { AuthProvider } from "@/features/auth";
import {Toaster} from "@/components/ui/sonner";
const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Shopiew | Miscellaneous land",
    description: "A strange shopping sanctuary",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-50 relative`}
            >
                <AuthProvider>
                    <AjaxProgressBarProvider>

                        {children}
                        <BackToTopButton />
                    </AjaxProgressBarProvider>
                </AuthProvider>
                <Toaster/>
            </body>
        </html>
    );
}
