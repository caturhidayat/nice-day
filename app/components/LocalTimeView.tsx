"use client";

import { Suspense } from "react";
import { format, parseISO } from "date-fns";

type LocalTimeViewProps = {
  dbTime: string;
  timezone?: string;
  style?: string;
};

export default function LocalTimeView({
  dbTime,
  timezone,
  style,
}: LocalTimeViewProps) {
  console.log("dbTime : ", dbTime);
  const localTime = format(parseISO(dbTime), "p");
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <h2 className={`text-lg text-${style} font-bold py-4`}>
        {dbTime ? localTime : "--:--"}
      </h2>
    </Suspense>
  );
}
