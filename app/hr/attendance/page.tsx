import React from "react";

import { CalendarCheck, Clock, MapPin, SquarePen } from "lucide-react";
import { getAttendances, getProfile } from "@/app/lib/action";
import EmplyAttendance from "@/app/components/UI/EmplyAttendance";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function Page() {
  // Get 3 last attendance records
  const attendance = await getAttendances();
  const userTimezone = "Asia/Jakarta";
  // console.log("attendance page : ", attendance);

  const me = await getProfile();

  return (
    <section className="h-[calc(100vh-6rem)] flex flex-col px-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">List of Request</h2>
        <div className="flex justify-end">
          <Link href="/hr/leaves/request">
            <Button variant={"default"}>
              <SquarePen className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </Link>
        </div>
      </div>
      {attendance.length === 0 ? (
        <EmplyAttendance />
      ) : (
        // <div className="grid grid-cols-1 gap-4 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 ">
        <div className="flex-1 overflow-y-auto space-y-4 pt-4 pr-2 pb-20">
          {attendance.map((item) => (
            // <div
            //   key={item.id}
            //   className="block rounded-lg p-4 bg-base-200 shadow-lg"
            // >
            //   <div className="mt-2">
            //     <dl>
            //       <div>
            //         <dt className="sr-only">Name</dt>

            //         <dd className="font-bold text-secondary">{me.name}</dd>
            //       </div>
            //       <div className="grid grid-cols-1 py-2 gap-2">
            //         <div className="text-xs">
            //           <span className="font-bold mr-2">Date:</span>
            //           {format(
            //             // new TZDate(
            //             //     Number(item.attendanceDate),
            //             //     "Asia/Jakarta"
            //             // ),
            //             toZonedTime(
            //               new Date(Number(item.attendanceDate)),
            //               userTimezone
            //             ),
            //             "EEEE, dd MMM yyyy"
            //           )}{" "}
            //         </div>
            //         <div className="grid grid-cols-2 py-2">
            //           <div className="items-center">
            //             <p className="text-teal-600">Check In</p>
            //             {item.checkInTime ? (
            //               <div className="items-center">
            //                 {format(
            //                   //   new TZDate(
            //                   //     Number(item.checkInTime),
            //                   //     "Asia/Jakarta"
            //                   //   ),
            //                   toZonedTime(
            //                     new Date(Number(item.checkInTime)),
            //                     userTimezone
            //                   ),
            //                   "HH:mm"
            //                 )}
            //               </div>
            //             ) : (
            //               <div className="items-center">--:--</div>
            //             )}
            //           </div>
            //           <div className="items-center">
            //             <p className="text-error">Check Out</p>
            //             {item.checkOutTime ? (
            //               <div className="items-center">
            //                 {format(
            //                   new TZDate(
            //                     Number(item.checkOutTime),
            //                     "Asia/Jakarta"
            //                   ),
            //                   "HH:mm"
            //                 )}
            //               </div>
            //             ) : (
            //               <div className="items-center">--:--</div>
            //             )}
            //           </div>
            //         </div>
            //         <div className="grid grid-cols-2 gap-6 pt-4 border-t-2 border-dashed text-xs">
            //           <span className="flex gap-2  items-center">
            //             <MapPin size={18} className="text-teal-600" /> : In{" "}
            //             {item.inLatitude}, {item.inLongitude}
            //           </span>
            //           <span className="flex gap-2  items-center">
            //             <MapPin size={18} className="text-error" /> : Out{" "}
            //             {item.outLatitude}, {item.outLongitude}
            //           </span>
            //           <span className="flex gap-2  items-center">
            //             <CalendarCheck size={18} className="text-secondary" /> :
            //             {item.status}
            //           </span>
            //           <span className="flex gap-2  items-center">
            //             <Clock
            //               size={18}
            //               className={
            //                 item.isLate ? "text-error" : "text-teal-600"
            //               }
            //             />{" "}
            //             :{item.isLate ? "Late" : "On Time"}
            //           </span>
            //         </div>
            //       </div>
            //     </dl>
            //   </div>
            // </div>
            <Card key={item.id}>
              <CardHeader className="bg-secondary">
                <CardTitle className="text-lg">
                  {/* {format(
                    new TZDate(Number(item.attendanceDate), "Asia/Jakarta"),
                    "EEE, dd MMM yyyy"
                  )} */}
                  {format(
                    new TZDate(
                      new Date(Number(item.attendanceDate)),
                      userTimezone
                    ),
                    "EEEE, dd MMM yyyy"
                  )}{" "}
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent>
                <div className="grid grid-cols-2 py-2 justify-center items-center">
                  <div className="flex flex-col items-center">
                    <p className="text-lg text-teal-600">Check In</p>
                    {item.checkInTime ? (
                      <div className="text-2xl font-semibold">
                        {/* {format(
                          new TZDate(Number(item.checkInTime), "Asia/Jakarta"),
                          "HH:mm"
                        )} */}
                        {format(
                          new TZDate(
                            new Date(Number(item.checkInTime)),
                            userTimezone
                          ),
                          "HH:mm"
                        )}
                      </div>
                    ) : (
                      <div className="text-2xl font-semibold text-primary/10">
                        --:--
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-center">
                    <p className="text-lg text-amber-600">Check Out</p>
                    {item.checkOutTime ? (
                      <div className="text-2xl font-semibold">
                        {/* {format(
                          new TZDate(Number(item.checkOutTime), "Asia/Jakarta"),
                          "HH:mm"
                        )} */}
                        {format(
                          new TZDate(
                            new Date(Number(item.checkOutTime)),
                            userTimezone
                          ),
                          "HH:mm"
                        )}
                      </div>
                    ) : (
                      <div className="text-2xl font-semibold text-primary/10">
                        --:--
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="grid grid-cols-2 gap-2 text-xs p-2">
                <div className="space-y-2">
                  <span className="flex gap-2  items-center">
                    <MapPin size={18} className="text-teal-600" /> :{" "}
                    {item.inLatitude}, {item.inLongitude}
                  </span>
                  <span className="flex gap-2  items-center">
                    <CalendarCheck size={18} className="text-cyan-600" /> :
                    {item.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <span className="flex gap-2  items-center">
                    <MapPin size={18} className="text-error" /> :{" "}
                    {item.outLatitude}, {item.outLongitude}
                  </span>
                  <span className="flex gap-2  items-center">
                    <Clock
                      size={18}
                      className={item.isLate ? "text-error" : "text-teal-600"}
                    />{" "}
                    :{item.isLate ? "Late" : "On Time"}
                  </span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
