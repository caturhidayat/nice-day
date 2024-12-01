"use client";

import { AuthContext } from "@/app/auth/auth-context";
import { CalendarArrowDown, CircleArrowOutDownRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export type menuListItem = {
  icon: JSX.Element;
  text: string;
  path: string;
};

export const menuList: menuListItem[] = [
  {
    icon: <CalendarArrowDown />,
    text: "Leave Request",
    path: "/hr/leaves",
  },
  {
    icon: <CircleArrowOutDownRight />,
    text: "Overtime",
    path: "/hr/overtime",
  },
  {
    icon: <CircleArrowOutDownRight />,
    text: "Undertime",
    path: "/hr/undertime",
  },
];

const MenuListItem = ({ icon, text, path }: menuListItem) => {
  const currentPath = usePathname();
  return (
    <Link
      href={path}
      className={`px-4 group hover:text-primary-content ${
        currentPath === path ? "text-primary" : ""
      }`}
    >
      <button
        className={`inline-flex space-y-2 flex-col items-center justify-center text-gray-600 group-hover:text-primary ${
          currentPath === path ? "text-primary" : ""
        }`}
      >
        {icon}
        <span className="text-xs">{text}</span>
      </button>
    </Link>
  );
};

export default function MenuList() {
  const isAuthenticated = useContext(AuthContext);
  return (
    <div>
      {isAuthenticated ? (
        <div className="flex gap-2 p-4">
          {menuList.map((button, index) => (
            <MenuListItem key={index} {...button} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
