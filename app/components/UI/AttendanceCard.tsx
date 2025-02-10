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
import { CalendarClock } from "lucide-react";
import LocalTimeView from "../LocalTimeView";

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
  const sameDate = attendance.attendanceDate ?
    format(new Date(attendance.attendanceDate), "yyyy-MM-dd") === format(currentTime, "yyyy-MM-dd") : false;
  let timeValid = true;
  if (attendance.checkOutTime) {
    const checkOutTime = new Date(attendance.checkOutTime);
    const diffHours =
      (currentTime.getTime() - checkOutTime.getTime()) / (1000 * 60 * 60);
    if (diffHours > 2) {
      timeValid = false;
    }
  }
  const shouldShowTimes = sameDate && timeValid;

  // console.log("name : ", me?.name);
  const initialFallback = me?.name[0].toUpperCase();

  // console.log("attendance : ", attendance);
  // console.log("shiftToday : ", shiftToday);
  return (
    <Card>
      <CardContent>
        <div className="pt-2">
          <Alert>
            <AlertDescription>
              <span className="flex items-center">
                <CalendarClock className="h-4 w-4 mr-2 text-orange-600" />
                <p className="text-xs">Shift : {shiftToday?.name} </p>
                {/* [{shiftToday?.startTime ? <LocalTimeView dbTime={shiftToday?.startTime} /> : "--:--"} -{" "}
                {shiftToday?.endTime ? <LocalTimeView dbTime={shiftToday?.endTime} /> : "--:--"}] */}
              </span>
            </AlertDescription>
          </Alert>
        </div>
        <div className="grid grid-cols-2 py-2 gap-1">
          <div className="flex flex-col gap-2 items-center">
            <div className="grid grid-cols-2 gap-2">
              {/* <Avatar>
                <AvatarImage src={`${PUBLIC_API_URL}/attendances/check-in/${attendance?.id}`} />
                <AvatarFallback>{initialFallback}</AvatarFallback>
              </Avatar> */}
              <p className="text-sm self-center">
                {shouldShowTimes ? (
                  <LocalTimeView dbTime={attendance?.checkInTime} />
                ) : (
                  "--:--"
                )}
              </p>
            </div>
            <ButtonAtt label="Masuk" param1="hr/preview/in" style="primary" />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="grid grid-cols-2 gap-2">
              {/* <Avatar>
                <AvatarImage src={`${PUBLIC_API_URL}/attendances/check-out/${attendance?.id}`} />
                <AvatarFallback>{initialFallback}</AvatarFallback>
              </Avatar> */}
              <p className="text-sm self-center">
                {shouldShowTimes ? (
                  <LocalTimeView dbTime={attendance?.checkOutTime} />
                ) : (
                  "--:--"
                )}
              </p>
            </div>
            <ButtonAtt label="Pulang" param1="hr/preview/out" style="primary" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-xs text-amber-600">
          * If you have any questions, please contact HR
        </p>
      </CardFooter>
    </Card>
  );
}
