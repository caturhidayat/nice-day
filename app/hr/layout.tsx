import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "NiceDay",
};

export default function HrLayout({ children }: { children: React.ReactNode }) {
    return (
        <section className="max-w-screen-xl py-20 px-8 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
            {children}
        </section>
    );
}
