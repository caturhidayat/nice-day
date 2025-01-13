"use client";

import { Suspense } from "react";
import { format } from "date-fns";

type LocalTimeViewProps = {
  dbTime: string;
  style?: string;
};

export default function LocalTimeView({ dbTime, style }: LocalTimeViewProps) {
  console.log("dbTime : ", dbTime);
  const localTime = format(new Date(Number(dbTime)), "HH:mm");
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <h2 className={`text-${style} py-4`}>{dbTime ? localTime : "--:--"}</h2>
    </Suspense>
  );
}
