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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PUBLIC_API_URL } from "@/app/lib/constants/api";

export function AttendanceCard({
  attendance,
  me,
  shiftToday,
}: {
  attendance: Attendance;
  me: ProfileProps;
  shiftToday: UserShift;
}) {
  // console.log("name : ", me?.name);
  const initialFallback = me?.name[0].toUpperCase();

  return (
    <Card>
      <CardContent>
        <div className="pt-2">
          <Alert>
            <AlertDescription>
              <span className="flex items-center">
                <CalendarClock className="h-4 w-4 mr-2 text-orange-600" />
                Shift : {shiftToday?.name} :{" "}
                [{shiftToday?.startTime ? format(new Date(shiftToday?.startTime), "HH:mm") : "--:--"} -{" "}
                {shiftToday?.endTime ? format(new Date(shiftToday?.endTime), "HH:mm") : "--:--"}]
              </span>
            </AlertDescription>
          </Alert>
        </div>
        <div className="grid grid-cols-2 py-2 gap-1">
          <div className="flex flex-col gap-2 items-center">
            <div className="grid grid-cols-2 gap-2">
              <Avatar>
                <AvatarImage src={`${PUBLIC_API_URL}/attendances/check-in/${attendance?.id}`} />
                <AvatarFallback>{initialFallback}</AvatarFallback>
              </Avatar>
              <p className="text-md font-bold text-md self-center">
                {attendance?.checkInTime
                  ? format(new Date(attendance?.checkInTime), "HH:mm")
                  : "--:--"}
              </p>
            </div>
            <ButtonAtt label="Masuk" param1="hr/preview/in" style="primary" />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="grid grid-cols-2 gap-2">
              <Avatar>
                <AvatarImage src={`${PUBLIC_API_URL}/attendances/check-out/${attendance?.id}`} />
                <AvatarFallback>{initialFallback}</AvatarFallback>
              </Avatar>
              <p className="text-md font-bold text-md self-center">
                {attendance?.checkOutTime
                  ? format(new Date(attendance?.checkOutTime), "HH:mm")
                  : "--:--"}
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
