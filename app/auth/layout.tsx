import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "Sign In",
    description: "Sign in to your account",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section className="pt-16">{children}</section>;
}
