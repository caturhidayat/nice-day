"use client";

import logout from "@/app/auth/logout";
import { getProfile } from "@/app/lib/action";
import React, { useEffect, useState } from "react";

export default function Page() {
    const [profile, setProfile] = useState<ProfileProps>({
        id: "",
        name: "",
        departement: "",
        branch: "",
    });

    type ProfileProps = {
        id: string;
        name: string;
        departement: string;
        branch: string;
    };

    useEffect(() => {
        const fetchData = async () => {
            const res = await getProfile();
            setProfile(res);
        };
        fetchData();
    }, []);

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="px-6 flow-root">
            <div className="grid grid-col-1 justify-center py-6 gap-2">
                <h1 className="flex justify-center text-center text-2xl font-bold tracking-tight sm:text-2xl">
                    Profile
                </h1>
                <div className="flex justify-center avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-12 rounded-full">
                        <span>
                            {profile.name ? profile.name.charAt(0) : "?"}
                        </span>
                    </div>
                </div>
            </div>
            <dl className="-my-3 divide-y divide-gray-100 text-sm">
                {/* <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">Title</dt>
                    <dd className="sm:col-span-2">Mr</dd>
                </div> */}

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">Name</dt>
                    <dd className="sm:col-span-2">{profile.name}</dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">Departement</dt>
                    <dd className="sm:col-span-2">
                        {profile.departement ? profile.departement : "--"}
                    </dd>
                </div>

                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">Branch</dt>
                    <dd className="sm:col-span-2">
                        {profile.branch ? profile.branch : "--"}
                    </dd>
                </div>
                {/* 
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <dt className="font-medium">Bio</dt>
                    <dd className="sm:col-span-2">
                        Lorem ipsum dolor, sit amet consectetur adipisicing
                        elit. Et facilis debitis explicabo doloremque impedit
                        nesciunt dolorem facere, dolor quasi veritatis quia
                        fugit aperiam aspernatur neque molestiae labore aliquam
                        soluta architecto?
                    </dd>
                </div> */}
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                    <button
                        onClick={handleLogout}
                        className="btn btn-error btn-outline"
                    >
                        Logout
                    </button>
                </div>
            </dl>
        </div>
    );
}
