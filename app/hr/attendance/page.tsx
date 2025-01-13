import React from "react";

import {
  CalendarCheck,
  Clock,
  MapPin,
  MapPinCheckInside,
  MapPinXInside,
  User2,
} from "lucide-react";
import {
  Attendance,
  getAttendances,
  getProfile,
  ProfileProps,
} from "@/app/lib/action";
import EmplyAttendance from "@/app/components/UI/EmplyAttendance";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { get } from "@/app/lib/utils/fetch";
import LocalTimeView from "@/app/components/LocalTimeView";

export default async function Page() {
  // Get attendance records
  const attendance = await getAttendances();

  const me = await getProfile();

  return (
    <section className="h-[calc(100vh-6rem)] flex flex-col px-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">Attendance List</h2>
        <div className="flex justify-end pb-2">
        </div>
      </div>
      {attendance.length === 0 ? (
        <EmplyAttendance />
      ) : (
        // <div className="grid grid-cols-1 gap-4 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8 ">
        <div className="flex-1 overflow-y-auto space-y-4 pt-4 pb-20">
          {attendance.map((item) => (
            <Card key={item.id}>
              <CardHeader className="bg-secondary">
                <CardTitle className="text-md">
                  <div className="flex items-center">
                    <User2 className="mr-2 h-4 w-4" />
                    <p className="font-medium">
                      {me?.name} {me?.department}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
              <Separator />
              <CardContent>
                <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                  <dt>Date</dt>
                  <dd className="sm:col-span-2 text-sm">
                    {format(
                      new Date(Number(item.attendanceDate)),
                      "EEE, dd MMM yyyy"
                    )}
                  </dd>
                </div>
                <div className="grid grid-cols-2 py-2 justify-center items-center">
                  <div className="grid col-span-1">
                    <p className=" text-teal-600">Check In</p>
                    {item.checkInTime ? (
                      <div className="text-sm flex items-center">
                        <MapPinCheckInside
                          size={18}
                          className="text-teal-600 mr-1"
                        />
                        {/* {format(new Date(Number(item.checkInTime)), "HH:mm")} */}
                        <LocalTimeView dbTime={item.checkInTime} />
                      </div>
                    ) : (
                      <div className="text-sm flex items-center">
                        <MapPinXInside size={18} className="text-error mr-1" />
                        --:--
                      </div>
                    )}
                  </div>
                  <div className="grid col-span-1 p-2">
                    <p className="text-amber-600">Check Out</p>
                    {item.checkOutTime ? (
                      <div className="text-sm flex items-center">
                        <MapPinCheckInside
                          size={18}
                          className="text-teal-600 mr-1"
                        />
                        {/* {format(new Date(Number(item.checkOutTime)), "HH:mm")} */}
                        <LocalTimeView dbTime={item.checkOutTime} />
                      </div>
                    ) : (
                      <div className="text-sm flex items-center">
                        <MapPinXInside size={18} className="text-error mr-1" />
                        --:--
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <Separator />
              <CardFooter className="grid grid-cols-2 gap-2 text-xs p-2">
                <div className="space-y-2">
                  {/* <span className="flex gap-2  items-center">
                    <MapPin size={18} className="text-teal-600" /> :{" "}
                    {item.inLatitude}, {item.inLongitude}
                  </span> */}
                  <span className="flex gap-2  items-center">
                    <CalendarCheck size={18} className="text-cyan-600" /> :
                    {item.status}
                  </span>
                </div>
                <div className="space-y-2">
                  {/* <span className="flex gap-2  items-center">
                    <MapPin size={18} className="text-error" /> :{" "}
                    {item.outLatitude}, {item.outLongitude}
                  </span> */}
                  <span className="flex gap-2  items-center">
                    <Clock
                      size={18}
                      className={item.isLate ? "text-error" : "text-teal-600"}
                    />{" "}
                    : {item.isLate ? "Late" : "Early"}
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
