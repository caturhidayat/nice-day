import { User } from "lucide-react";
import React from "react";

export default function Navbar() {
    return (
        <div className="navbar bg-base-100 fixed">
            <div className="flex-1">
                <a className="btn btn-ghost text-xl">NiceDay</a>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <div className="w-10 rounded-full">
                            <User />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-md"
                    >
                        <li>
                            <a className="justify-between">Profile</a>
                        </li>
                        <li className="text-orange-600">
                            <a>Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
