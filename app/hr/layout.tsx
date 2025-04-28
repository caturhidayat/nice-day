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
      {/* <Navbar /> */}
      <div className="w-svw h-dvh">
        {/* <div className=""> */}
          {children}
        {/* </div> */}
        <BottomNav />
      </div>
    </div>
  );
}
