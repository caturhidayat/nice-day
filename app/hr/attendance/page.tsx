import React from "react";
import { getAttendances } from "./actions/get-attendance";
import getMe from "@/app/get-me";
import dayjs from "dayjs";
import { CalendarCheck, LocateIcon, MapPin, Pin } from "lucide-react";

export default async function page() {
  interface Attendance {
    id: string;
    attendanceDate: Date;
    userId: string;
    checkInTime: string;
    checkOutTime: string;
  }

  type ProfileProps = {
    id: string;
    name: string;
    departement: string;
    branch: string;
  };

  // Get 3 last attendance records
  const attendance = (await getAttendances()) as Attendance[];
  const me = (await getMe()) as ProfileProps;

  // console.log("attendance", attendance);
  return (
    <section className="mx-auto max-w-screen-xl px-6 justify-center lg:flex  lg:items-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
        {attendance.map((item) => (
          <div
            key={item.id}
            className="block rounded-lg p-4 shadow-sm shadow-indigo-100"
          >
            <div className="mt-2">
              <dl>
                <div>
                  <dt className="sr-only">Name</dt>

                  <dd className="font-medium text-primary">{me.name}</dd>
                </div>
                <div className="grid grid-cols-1 py-2 gap-2">
                  <div className="text-accent">Date: {dayjs(item.attendanceDate).format("YYYY-MM-DD")} </div>
                  <div className="grid grid-cols-2 py-2">
                    <div className="items-center">
                      <text className="text-teal-600">Check In</text>
                      {item.checkInTime ? (
                        <div className="items-center">
                          {dayjs(item.checkInTime).format("HH:mm")}
                        </div>
                      ) : (
                        <div className="items-center">--:--</div>
                      )}
                    </div>
                    <div className="items-center">
                      <text className="text-error">Check Out</text>
                      {item.checkOutTime ? (
                        <div className="items-center">
                          {dayjs(item.checkOutTime).format("HH:mm")}
                        </div>
                      ) : (
                        <div className="items-center">--:--</div>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-6 pt-4 border-t-2">
                    <MapPin size={18} className="text-teal-600"/>
                    <CalendarCheck size={18} className="text-teal-600"/>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
