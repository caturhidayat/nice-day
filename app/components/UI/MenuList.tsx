"use client";

import { AuthContext } from "@/app/auth/auth-context";
import { CalendarArrowDown, CalendarClock, CalendarCog, CircleArrowOutDownRight, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext } from "react";

export type menuListItem = {
  icon: JSX.Element;
  text: string;
  path: string;
};

export const menuList: menuListItem[] = [
  // {
  //   icon: <CalendarArrowDown />,
  //   text: "Leave Request",
  //   path: "/hr/leaves",
  // },
  {
    icon: <CalendarCog />,
    text: "Attendance Correction Request",
    path: "/hr/corrections",
  },
  // {
  //   icon: <CircleArrowOutDownRight />,
  //   text: "Undertime",
  //   path: "/hr/undertime",
  // },
  
];

const MenuListItem = ({ icon, text, path }: menuListItem) => {
  const currentPath = usePathname();
  return (
    <Link
      href={path}
      className={`p-2 group hover:text-primary-content hover:bg-gray-100 rounded-md w-full md:w-32 ${
        currentPath === path ? "text-primary" : ""
      }`}
    >
      <button
        className={`inline-flex space-y-2 flex-col items-center justify-center w-full text-gray-600 group-hover:text-primary ${
          currentPath === path ? "text-primary" : ""
        }`}
      >
        <Icon icon={icon} />
        <span className="text-xs text-center w-full">{text}</span>
      </button>
    </Link>
  );
};

export default function MenuList() {
  const isAuthenticated = useContext(AuthContext);
  return (
    <div className="pb-8">
      {isAuthenticated ? (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:flex md:flex-wrap md:justify-start max-w-full">
          {menuList.map((button, index) => (
            <MenuListItem key={index} {...button} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

const Icon = ({ icon }: { icon: JSX.Element }) => {
  return (
    <span className="inline-block rounded-sm p-4 text-white bg-gradient-to-tl from-teal-400 to-teal-700 shadow-md">
      {icon}
    </span>
  );
};
