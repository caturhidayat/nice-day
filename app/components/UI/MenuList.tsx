"use client";

import { AuthContext } from "@/app/auth/auth-context";
import { CalendarArrowDown, CircleArrowOutDownRight, RefreshCcw } from "lucide-react";
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
    icon: <CalendarArrowDown className="text-teal-600" />,
    text: "Leave Request",
    path: "/hr/leaves",
  },
  {
    icon: <RefreshCcw className="text-orange-600" />,
    text: "Future Update",
    path: "",
  },
  // {
  //   icon: <CircleArrowOutDownRight className="text-purple-600" />,
  //   text: "Undertime",
  //   path: "/hr/undertime",
  // },
];

const MenuListItem = ({ icon, text, path }: menuListItem) => {
  const currentPath = usePathname();
  return (
    <Link
      href={path}
      className={`p-4 group hover:text-primary-content hover:bg-gray-100 rounded-md ${
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
    <div className="pb-8">
      {isAuthenticated ? (
        <div className="flex gap-2">
          {menuList.map((button, index) => (
            <MenuListItem key={index} {...button} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
