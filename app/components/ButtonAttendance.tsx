"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ClockIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonAttProps {
  label: string;
  param1: string;
  param2?: string;
  style?: string;
  mode?: string;
}

export default function ButtonAtt({
  label,
  param1,
  param2,
  style,
  mode,
}: ButtonAttProps) {
  const router = useRouter();
  const handleClick = () => {
    // router.push(`/${param1}/${mode}/${param2}`);
    router.push(`/${param1}`);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn btn-sm w-full btn-${style}`}
    >
      <span className="flex items-center gap-2">
      {label}
      <ClockIcon className="h-4 w-4 text-primary" />
      </span>
    </button>
  );
}
