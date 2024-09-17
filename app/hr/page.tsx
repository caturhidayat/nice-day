// import React, { useEffect, useState } from "react";
import { getDate } from "../common/utils/get-date";
import dayjs from "dayjs";
import { getAttendance } from "./attendance/actions/get-attendance";
import ButtonAtt from "../components/ButtonAttendance";

interface Attendance {
  id: string;
  checkInTime: string;
  checkOutTime: string;
}

export default async function page() {
  // const [attendanceData, setAttendanceData] = useState<Attendance>();
  // // Get Attendance Data from server
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res: any = await getAttendance();
  //     setAttendanceData(res);
  //     console.log("res", res);
  //   };
  //   fetchData();
  // }, []);

  const lastAttendance = (await getAttendance()) as Attendance;


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
                  {lastAttendance?.checkInTime
                    ? dayjs(lastAttendance?.checkInTime).format("HH:mm")
                    : "--:--"}
                </h2>
                <ButtonAtt
                  label="Masuk"
                  param="hr/preview"
                  style="btn-primary"
                />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <h2 className="text-lg text-error font-bold py-4">
                  {lastAttendance?.checkOutTime
                    ? dayjs(lastAttendance?.checkOutTime).format("HH:mm")
                    : "--:--"}
                </h2>
                <ButtonAtt
                  label="Pulang"
                  param="hr/preview"
                  style="btn-outline"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
