"use client";

import React, { useEffect, useState } from "react";
import { getDate } from "../common/utils/get-date";
import dayjs from "dayjs";
import { get } from "../common/utils/fetch";
import { getAttendance } from "./attendance/actions/get-attendance";

const redirectToPreview = () => {
  window.location.href = "/hr/preview";
};

interface Attendance {
  id: string;
  checkInTime: string;
  checkOutTime: string;
}

export default function page() {
  const [attendanceData, setAttendanceData] = useState<Attendance>();
  // Get Attendance Data from server
  useEffect(() => {
    const fetchData = async () => {
      const res: any = await getAttendance();
      setAttendanceData(res);
      console.log("res", res);
    };
    fetchData();
  }, []);
  
  
  // Get Hour and Minute from checkInTime
  const checkInTime = attendanceData ? attendanceData.checkInTime : "--:--";
  const checkOutTime = attendanceData ? attendanceData.checkOutTime : "--:--";
  const checkInView = dayjs(checkInTime).format("HH:mm");
  const checkOutView = dayjs(checkOutTime).format("HH:mm");

  // Check checkOutTime, if checkOut Time greater than current time 3 hours, don't show attendance
  // const currentTime = dayjs();
  // const checkOutTimePlus3Hours = dayjs(checkOutTime).add(3, "hour");
  // if (checkOutTimePlus3Hours.isBefore(currentTime)) {
  //   return (
  //     <div className="bg-base-100">
  //       <div className="grid justify-center py-4 max-w-xl px-4">
  //         <h2 className="text-xl font-bold sm:text-2xl ">
  //           Hello Catur Hidayat!
  //         </h2>
  //         <p className="mt-4 text-base-content">Semangat Kerja ya!</p>
  //       </div>
  //       <div className="p-4 bg-slate-50 rounded-xl min-h-max pb-16">
  //         <div className="relative block overflow-hidden rounded-xl bg-base-100 border-gray-100 p-4 sm:p-6 lg:p-8 shadow-lg">
  //           <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

  //           <div className="sm:flex sm:justify-between sm:gap-4">
  //             <div>
  //               <h2 className="text-md font-bold">{getDate()}</h2>

  //               <p className="mt-1 text-xs font-medium text-gray-600">
  //                 Jam kerja Kamu pukul 08:00 - 17:00
  //               </p>
  //             </div>
  //           </div>

  //           <div className="mt-4">
  //             <div className="grid grid-cols-2 py-2 gap-1">
  //               <div className="flex flex-col gap-2 items-center">
  //                 <h2 className="text-lg text-success font-bold py-4">
  //                   {checkInTime ? checkInView : "--:--"}
  //                 </h2>
  //                 <button
  //                   className="btn btn-block btn-primary"
  //                   onClick={redirectToPreview}
  //                 >
  //                   Masuk
  //                 </button>
  //               </div>
  //               <div className="flex flex-col gap-2 items-center">
  //                 <h2 className="text-lg text-error font-bold py-4">
  //                   {checkOutTime ? checkOutView : "--:--"}
  //                 </h2>
  //                 <button className="btn btn-block btn-outline">Pulang</button>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-base-100">
      <div className="grid justify-center py-4 max-w-xl px-4">
        <h2 className="text-xl font-bold sm:text-2xl ">Hello Catur Hidayat!</h2>
        <p className="mt-4 text-base-content">Semangat Kerja ya!</p>
      </div>
      <div className="p-4 bg-slate-50 rounded-xl min-h-max pb-16">
        <div className="relative block overflow-hidden rounded-xl bg-base-100 border-gray-100 p-4 sm:p-6 lg:p-8 shadow-lg">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h2 className="text-md font-bold">{getDate()}</h2>

              <p className="mt-1 text-xs font-medium text-gray-600">
                Jam kerja Kamu pukul 08:00 - 17:00
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-2 py-2 gap-1">
              <div className="flex flex-col gap-2 items-center">
                <h2 className="text-lg text-success font-bold py-4">
                  {checkInTime ? checkInView : "--:--"}
                </h2>
                <button
                  className="btn btn-block btn-primary"
                  onClick={redirectToPreview}
                >
                  Masuk
                </button>
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h2 className="text-lg text-error font-bold py-4">
                  {checkOutTime ? checkOutView : "--:--"}
                </h2>
                <button className="btn btn-block btn-outline">Pulang</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
