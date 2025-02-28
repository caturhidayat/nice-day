"use client";

import { ChartNoAxesColumnIncreasing } from "lucide-react";
import React, { useState, useEffect } from "react";

const NetworkInformation: React.FC = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <>
      {/* {isOnline ? (
        <div className="flex text-sm items-center text-green-500">
          <ChartNoAxesColumnIncreasing /> Online
        </div>
      ) : (
        <div className="flex text-sm items-center text-red-500">
          <ChartNoAxesColumnIncreasing /> Offline
        </div>
      )} */}
      <div className={`flex text-sm items-center ${isOnline ? "text-green-500" : "text-red-500"}`}>
        <ChartNoAxesColumnIncreasing /> {isOnline ? "Online" : "Offline"}
      </div>
    </>
  );
};

export default NetworkInformation;
