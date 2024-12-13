"use client";

import { format } from "date-fns";

export default function ClockDisplay() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-center">
        <div className="text-5xl font-bold text-secondary">{format(new Date(), "HH:MM")}</div>
      </div>
      <div className="flex items-center justify-center">
        <span className="text-md text-slate-300">
          <h2>{format(new Date(), "EEE, dd MMM yyyy")}</h2>
        </span>
      </div>
    </div>
  );
}
