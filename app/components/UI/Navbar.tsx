"use client";

import { AuthContext } from "@/app/auth/auth-context";
import { useContext } from "react";

export default function Navbar() {
    const isAuthenticated = useContext(AuthContext);

    return (
        <div>
            {isAuthenticated ? (
                <div className="navbar bg-slate-50 fixed ">
                    <div className="flex-1 justify-center">
                        <a className="btn btn-ghost text-2xl bg-gradient-to-r from-violet-600 via-teal-600 to-purple-600 bg-clip-text text-transparent">NiceDay</a>
                    </div>
                    <div className="flex-none"></div>
                </div>
            ) : null}
        </div>
    );
}
