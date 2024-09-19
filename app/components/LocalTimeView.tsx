"use client";

import dayjs from "dayjs";
import LocalizeFormat from "dayjs/plugin/localizedFormat";
import { Suspense } from "react";

dayjs.extend(LocalizeFormat);

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
  const localTime = dayjs(dbTime).format("LT");
  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <h2 className={`text-lg text-${style} font-bold py-4`}>
        {dbTime ? localTime : "--:--"}
      </h2>
    </Suspense>
  );
}
