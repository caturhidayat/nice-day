"use client";

import { Suspense } from "react";
import { format, parseISO } from "date-fns";

type LocalTimeViewProps = {
  dbTime: string;
  style?: string;
};

export default function LocalTimeView({ dbTime, style }: LocalTimeViewProps) {
  const formatTime = (timeStr: string) => {
    try {
      // First try parsing as ISO string
      // if (timeStr.includes('T') || timeStr.includes('-')) {
      //   return format(parseISO(timeStr), "HH:mm");
      // }
      
      // Then try parsing as timestamp
      const timestamp = Number(timeStr);
      if (!isNaN(timestamp)) {
        return format(new Date(timestamp), "HH:mm");
      }

      return "--:--";
    } catch (error) {
      console.error("Error formatting time:", error, "Value:", timeStr);
      return "--:--";
    }
  };

  return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <h2 className={`text-${style}`}>{formatTime(dbTime)}</h2>
    </Suspense>
  );
}
