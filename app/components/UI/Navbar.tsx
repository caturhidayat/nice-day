"use client";

import { AuthContext } from "@/app/auth/auth-context";
import Image from "next/image";
import { useContext } from "react";
import NetworkInformation from './NetworkInformation';

export default function Navbar() {
  const isAuthenticated = useContext(AuthContext);

  return (
    <nav>
      {isAuthenticated ? (
        <div className="navbar bg-base-100 fixed ">
          <div className="flex-1">
            <div className="avatar">
              <div className="w-12 rounded">
                <Image
                  src="/images/Logo.png"
                  alt="Avatar Tailwind CSS Component"
                  width={128}
                  height={128}
                />
              </div>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-polynesian  to-ceruline bg-clip-text text-transparent ">
              NiceDay
            </h2>
          </div>
          <div className="flex-none">
          <NetworkInformation />
          </div>
        </div>
      ) : null}
      
    </nav>
  );
}
