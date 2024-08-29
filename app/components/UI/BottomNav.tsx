"use client";

import { CalendarCog, House, UserCheck, UserRound } from "lucide-react";
import React, { useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/app/auth/auth-context";

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
        icon: <CalendarCog />,
        text: "Corrections",
        path: "/hr/corrections",
    },
    {
        icon: <UserRound />,
        text: "Profile",
        path: "/hr/profile",
    },
];

const BottomItemNav = ({ icon, text, path }: ButtonItem) => {
    return (
        <Link
            href={path}
            className="px-2 hover:bg-primary group hover:text-primary-content rounded-full"
        >
            <button className="inline-flex flex-col items-center justify-center text-primary group-hover:text-primary-content">
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
                <div className="btm-nav m-2 w-auto rounded-full border">
                    {buttons.map((button, index) => (
                        <BottomItemNav key={index} {...button} />
                    ))}
                </div>
            ) : null}
        </div>
    );
}
