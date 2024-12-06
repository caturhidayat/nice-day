"use client";

import { House, UserCheck, UserRound, ClockArrowUp } from "lucide-react";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/auth/auth-context";
import { usePathname } from "next/navigation";

export type ButtonItem = {
  icon: JSX.Element;
  text: string;
  path: string;
};

export const buttons: ButtonItem[] = [
  {
    icon: <House />,
    text: "Home",
    path: "/hr",
  },
  {
    icon: <UserCheck />,
    text: "Attendance",
    path: "/hr/attendance",
  },
  {
    icon: <ClockArrowUp />,
    text: "Overtime",
    path: "/hr/overtime",
  },
  {
    icon: <UserRound />,
    text: "Profile",
    path: "/hr/profile",
  },
];

const BottomItemNav = ({ icon, text, path }: ButtonItem) => {
  const currentPath = usePathname();
  return (
    <Link
      href={path}
      className={`px-2 group hover:text-primary-content ${
        currentPath === path ? "text-primary" : ""
      }`}
    >
      <button
        className={`inline-flex flex-col items-center justify-center text-gray-600 group-hover:text-primary ${
          currentPath === path ? "text-primary" : ""
        }`}
      >
        {icon}
        <span className="btm-nav-label text-xs">{text}</span>
      </button>
    </Link>
  );
};

export default function BottomNav() {
  const isAuthenticated = useContext(AuthContext);
  return (
    <div>
      {isAuthenticated ? (
        <div className="btm-nav w-auto border-t">
          {buttons.map((button, index) => (
            <BottomItemNav key={index} {...button} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
