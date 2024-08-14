import { House, UserCheck, UserRound } from "lucide-react";
import React from "react";
import Link from "next/link";

export default function BottomNav() {
    return (
        <div className="btm-nav">
            <button>
                <Link href="/hr">
                    <House />
                    <span className="btm-nav-label">Home</span>
                </Link>
            </button>
            <button className="btm-nav-label">
                <Link href="/hr/attendance">
                    <UserCheck />
                    <span className="btm-nav-label">Attendance</span>
                </Link>
            </button>
            <button>
                <Link href="/hr/profile">
                    <UserRound />
                    <span className="btm-nav-label">Profile</span>
                </Link>
            </button>
        </div>
    );
}
