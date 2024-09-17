"use client";

import { useRouter } from "next/navigation";

interface ButtonAttProps {
  label: string;
  param: string;
  style: string
}

export default function ButtonAtt({ label, param, style }: ButtonAttProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${param}`);
  };

  return <button className={`btn btn-block ${style}`} onClick={handleClick}>{label}</button>;
}
