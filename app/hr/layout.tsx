import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "NiceDay",
};

export default function HrLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="max-w-screen-xl py-4 px-4 sm:px-6 sm:py-12 lg:px-8">
            {children}
        </section>
    );
}
