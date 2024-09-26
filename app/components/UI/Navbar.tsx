"use client";

import { AuthContext } from "@/app/auth/auth-context";
import { useContext } from "react";

export default function Navbar() {
    const isAuthenticated = useContext(AuthContext);

    return (
        <div>
            {isAuthenticated ? (
                <div className="navbar bg-base-100 fixed ">
                    <div className="flex-1">
                        <a className="btn btn-ghost text-2xl bg-gradient-to-r from-violet-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">App Name</a>
                    </div>
                    <div className="flex-none"></div>
                </div>
            ) : null}
        </div>
    );
}
