"use client";

import { AuthContext } from "@/app/auth/auth-context";
import Image from "next/image";
import { useContext } from "react";

export default function Navbar() {
  const isAuthenticated = useContext(AuthContext);

  return (
    <nav>
      {isAuthenticated ? (
        <div className="navbar bg-teal-700">
          <div className="flex-1">
            <div className="avatar">
              <div className="w-10 bg-white rounded-lg">
                <Image
                  src="/images/Logo-new.png"
                  alt="Avatar Tailwind CSS Component"
                  width={128}
                  height={128}
                />
              </div>
            </div>
            {/* <h2 className="ml-8 text-lg font-bold">
              NiceDay
            </h2> */}
          </div>
          <div className="flex-none">
          
          </div>
        </div>
      ) : null}
      
    </nav>
  );
}
