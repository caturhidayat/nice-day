"use client";

import { Button } from "@/components/ui/button";
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
    // <button className={`btn btn-block btn-${style}`} onClick={handleClick}>
    //     {label}
    // </button>
    <Button
      onClick={handleClick}
      className="w-full bg-teal-700 hover:bg-teal-800"
    >
      {label}
    </Button>
  );
}
