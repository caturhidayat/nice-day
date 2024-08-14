import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
    title: "NiceDay",
};

export default function HrLayout({ children }: { children: React.ReactNode }) {
    return <section className="pt-16">{children}</section>;
}
