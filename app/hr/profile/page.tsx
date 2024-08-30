'use client';

import logout from "@/app/auth/logout";
import React from "react";

export default function page() {

    const handleLogout = async () => {
        await logout();
    }

    return (
        <div className="flow-root">
            <h1 className="flex justify-center text-center text-2xl font-bold tracking-tight sm:text-2xl">
                Profile
            </h1>
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">Title</dt>
                    <dd className="sm:col-span-2">Mr</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">Name</dt>
                    <dd className="sm:col-span-2">John Frusciante</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">Occupation</dt>
                    <dd className="sm:col-span-2">Guitarist</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">Salary</dt>
                    <dd className="sm:col-span-2">$1,000,000+</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">Bio</dt>
                    <dd className="sm:col-span-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Et facilis debitis explicabo doloremque impedit
                        nesciunt dolorem facere, dolor quasi veritatis quia
                        fugit aperiam aspernatur neque molestiae labore aliquam
                        soluta architecto?
                    </dd>
                </div>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <button onClick={handleLogout} className="btn btn-error btn-outline">Logout</button>
                </div>
            </dl>
        </div>
    );
}
