import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import authenticated from "./auth/authenticated";
import { Suspense } from "react";
import Loading from "./loading";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Niceday",
  description: "Niceday is a platform for managing your daily Attendance",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuthenticated = authenticated();
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers authenticated={isAuthenticated}>
          <Suspense fallback={<Loading />}>
            <main className="max-w-screen-xl h-dvh">{children}</main>
          </Suspense>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
