import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/UI/Navbar";
import BottomNav from "./components/UI/BottomNav";
import Providers from "./providers";
import authenticated from "./auth/authenticated";
import { Suspense } from "react";
import Loading from "./loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const isAuthenticated = await authenticated();
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers authenticated={isAuthenticated}>
                    <Navbar />
                    <Suspense fallback={<Loading />}>
                        <main className="max-w-screen-xl py-16 px-2 sm:px-4 sm:py-14 lg:px-8 lg:py-14 h-dvh">
                            {children}
                        </main>
                    </Suspense>
                    <BottomNav />
                </Providers>
            </body>
        </html>
    );
}
