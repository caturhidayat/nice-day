"use client";

import { format } from "date-fns";
import ButtonAtt from "../ButtonAttendance";
import { Attendance, ProfileProps, UserShift } from "@/app/lib/action";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarClock, MapPin } from "lucide-react";
import LocalTimeView from "../LocalTimeView";
import { Separator } from "@/components/ui/separator";

export function AttendanceCard({
  attendance,
  me,
  shiftToday,
}: {
  attendance: Attendance;
  me: ProfileProps;
  shiftToday: UserShift;
}) {
  // Menambahkan logika untuk validasi waktu attendance
  const currentTime = new Date();
  console.log("attendance Date : ", attendance.attendanceDate);

  // New attendance validation logic
  let shouldShowTimes = false;

  if (attendance.checkInTime && !attendance.checkOutTime) {
    // Tampilkan checkIn jika ada, walau attendanceDate tidak sama dengan hari ini
    shouldShowTimes = true;
  } else if (!attendance.checkInTime && attendance.checkOutTime) {
    // Jika hanya memiliki checkOut, tampilkan checkOut selama masih dalam 2 jam setelahnya
    const checkOutTime = new Date(attendance.checkOutTime);
    const diffHours =
      (currentTime.getTime() - checkOutTime.getTime()) / (1000 * 60 * 60);
    if (diffHours <= 2) {
      shouldShowTimes = true;
    }
  } else if (attendance.checkInTime && attendance.checkOutTime) {
    // Jika ada checkIn dan checkOut, tampilkan hanya jika attendanceDate adalah hari ini
    if (attendance.attendanceDate) {
      const attendanceDateStr = format(
        new Date(+attendance.attendanceDate),
        "yyyy-MM-dd"
      );
      const currentDateStr = format(currentTime, "yyyy-MM-dd");
      if (attendanceDateStr === currentDateStr) {
        shouldShowTimes = true;
      }
    }
  }

  // console.log("name : ", me?.name);
  const initialFallback = me?.name[0].toUpperCase();

  // console.log("attendance : ", attendance);
  // console.log("shiftToday : ", shiftToday);
  return (
    // <Card>
    //   <CardContent>
    //     <div className="pt-2">
    //       <span className="flex items-center">
    //         <CalendarClock className="h-4 w-4 mr-2 text-sky-600" />
    //         <p className="text-xs">{shiftToday?.name} </p>
    //         {/* [{shiftToday?.startTime ? <LocalTimeView dbTime={shiftToday?.startTime} /> : "--:--"} -{" "}
    //         {shiftToday?.endTime ? <LocalTimeView dbTime={shiftToday?.endTime} /> : "--:--"}] */}
    //       </span>
    //       <Separator className="my-2" />
    //     </div>
    //     <div className="grid grid-cols-2 py-2 gap-1">
    //       <div className="flex flex-col gap-2 items-center">
    //         <div className="grid grid-cols-2 gap-2">
    //           <span className="text-sm self-center">
    //             {shouldShowTimes ? (
    //               <LocalTimeView dbTime={attendance?.checkInTime} />
    //             ) : (
    //               "--:--"
    //             )}
    //           </span>
    //         </div>
    //         <ButtonAtt label="Masuk" param1="hr/preview/in" style="outline" />
    //       </div>
    //       <div className="flex flex-col gap-2 items-center">
    //         <div className="grid grid-cols-2 gap-2">
    //           <p className="text-sm self-center">
    //             {shouldShowTimes ? (
    //               <LocalTimeView dbTime={attendance?.checkOutTime} />
    //             ) : (
    //               "--:--"
    //             )}
    //           </p>
    //         </div>
    //         <ButtonAtt label="Pulang" param1="hr/preview/out" style="primary" />
    //       </div>
    //     </div>
    //   </CardContent>
    //   <CardFooter>
    //     <p className="text-xs text-amber-600">
    //       * If you have any questions, please contact HR
    //     </p>
    //   </CardFooter>
    // </Card>

    <div className="p-2">
      <div className="pt-2">
        <span className="flex items-center">
          <CalendarClock className="h-6 w-6 mr-2 text-amber-300" />
          <p className="text-sm text-white">{shiftToday?.name} </p>          
        </span>
        <Separator className="my-2" />
      </div>
      <div className="grid grid-cols-2 py-2 gap-4">
        <div className="flex flex-col gap-2 items-center">
          <div className="grid grid-cols-2 gap-2">
            <span className="text-white self-center">
              {shouldShowTimes ? (
                <LocalTimeView dbTime={attendance?.checkInTime} />
              ) : (
                "--:--"
              )}
            </span>
          </div>
          <ButtonAtt label="Clock In" param1="hr/preview/in" style="warning" />
        </div>
        <div className="flex flex-col gap-2 items-center">
          <div className="grid grid-cols-2 gap-2">
            <p className="text-white self-center">
              {shouldShowTimes ? (
                <LocalTimeView dbTime={attendance?.checkOutTime} />
              ) : (
                "--:--"
              )}
            </p>
          </div>
        <ButtonAtt label="Clock Out" param1="hr/preview/out" style="warning" />
        </div>
      </div>
    </div>
  );
}
