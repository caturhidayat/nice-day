import React from "react";

import { CalendarCheck, Clock, MapPin } from "lucide-react";
import { getAttendances, getProfile } from "@/app/lib/action";
import EmplyAttendance from "@/app/components/UI/EmplyAttendance";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";
import { toZonedTime } from "date-fns-tz";

export default async function Page() {
  // Get 3 last attendance records
  const attendance = await getAttendances();
  const userTimezone = "Asia/Jakarta";
  // console.log("attendance page : ", attendance);

  const me = await getProfile();

  return (
    <section className="mx-auto max-w-screen-xl px-6 pb-16 justify-center lg:flex  lg:items-center">
      {attendance.length === 0 ? (
        <EmplyAttendance />
      ) : (
        <div className="grid grid-cols-1 gap-4 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 ">
          {attendance.map((item) => (
            <div
              key={item.id}
              className="block rounded-lg p-4 bg-base-200 shadow-lg"
            >
              <div className="mt-2">
                <dl>
                  <div>
                    <dt className="sr-only">Name</dt>

                    <dd className="font-bold text-secondary">{me.name}</dd>
                  </div>
                  <div className="grid grid-cols-1 py-2 gap-2">
                    <div className="text-xs">
                      <span className="font-bold mr-2">Date:</span>
                      {format(
                        // new TZDate(
                        //     Number(item.attendanceDate),
                        //     "Asia/Jakarta"
                        // ),
                        toZonedTime(
                          new Date(Number(item.attendanceDate)),
                          userTimezone
                        ),
                        "EEEE, dd MMM yyyy"
                      )}{" "}
                    </div>
                    <div className="grid grid-cols-2 py-2">
                      <div className="items-center">
                        <p className="text-teal-600">Check In</p>
                        {item.checkInTime ? (
                          <div className="items-center">
                            {format(
                              //   new TZDate(
                              //     Number(item.checkInTime),
                              //     "Asia/Jakarta"
                              //   ),
                              toZonedTime(
                                new Date(Number(item.checkInTime)),
                                userTimezone
                              ),
                              "HH:mm"
                            )}
                          </div>
                        ) : (
                          <div className="items-center">--:--</div>
                        )}
                      </div>
                      <div className="items-center">
                        <p className="text-error">Check Out</p>
                        {item.checkOutTime ? (
                          <div className="items-center">
                            {format(
                              new TZDate(
                                Number(item.checkOutTime),
                                "Asia/Jakarta"
                              ),
                              "HH:mm"
                            )}
                          </div>
                        ) : (
                          <div className="items-center">--:--</div>
                        )}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6 pt-4 border-t-2 border-dashed text-xs">
                      <span className="flex gap-2  items-center">
                        <MapPin size={18} className="text-teal-600" /> : In{" "}
                        {item.inLatitude}, {item.inLongitude}
                      </span>
                      <span className="flex gap-2  items-center">
                        <MapPin size={18} className="text-error" /> : Out{" "}
                        {item.outLatitude}, {item.outLongitude}
                      </span>
                      <span className="flex gap-2  items-center">
                        <CalendarCheck size={18} className="text-secondary" /> :
                        {item.status}
                      </span>
                      <span className="flex gap-2  items-center">
                        <Clock
                          size={18}
                          className={
                            item.isLate ? "text-error" : "text-teal-600"
                          }
                        />{" "}
                        :{item.isLate ? "Late" : "On Time"}
                      </span>
                    </div>
                  </div>
                </dl>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
