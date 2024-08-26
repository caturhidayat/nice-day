import { House, UserCheck, UserRound } from "lucide-react";
import React from "react";
import Link from "next/link";

type ButtonItem = {
    icon: JSX.Element;
    text: string;
    path: string;
};

const buttons: ButtonItem[] = [
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
        icon: <UserRound />,
        text: "Profile",
        path: "/hr/profile",
    },
];

const BottomItemNav = ({ icon, text, path }: ButtonItem) => {
    return (
        <Link
            href={path}
            className="px-5 hover:bg-gray-50 dark:hover:bg-accent group"
        >
            <button className="inline-flex flex-col items-center justify-center text-base-100 dark:text-gray-400 group-hover:text-secondary dark:group-hover:text-secondary">
                {icon}
                <span className="btm-nav-label">
                    {text}
                </span>
            </button>
        </Link>
    );
};

export default function BottomNav() {
    return (
        <div className="btm-nav shadow-xl border-t-2 border-primary">
            {buttons.map((button, index) => (
                <BottomItemNav key={index} {...button} />
            ))}
        </div>
    );
}
