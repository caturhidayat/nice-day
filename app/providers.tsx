"use client";

import { AuthContext } from "./auth/auth-context";
import { AttendanceContext } from "./hr/attendance/attendance-context";

interface ProviderProps {
  children: React.ReactNode;
  authenticated: boolean;
}

export default function Providers({ children, authenticated }: ProviderProps) {
  return (
    <AuthContext.Provider value={authenticated}>
      {children}
    </AuthContext.Provider>
  );
}
