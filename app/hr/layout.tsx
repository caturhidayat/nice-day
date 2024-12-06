import type { Metadata } from "next";
import "../globals.css";
import Navbar from "../components/UI/Navbar";
import BottomNav from "../components/UI/BottomNav";

export const metadata: Metadata = {
  title: "NiceDay",
};

export default function HrLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navbar />
      <section className="max-w-screen-xl py-16  sm:py-14 lg:py-14 h-dvh">
        {children}
        <BottomNav />
      </section>
    </div>
  );
}
