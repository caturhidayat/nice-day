"use client";

import logout from "@/app/auth/logout";
import { Button } from "@/components/ui/button";

export function Logout() {
  const handleLogout = async () => {
    await logout();
  };

  return <Button variant={"destructive"} onClick={handleLogout}>Logout</Button>;
}
