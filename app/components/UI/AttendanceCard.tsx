"use client";

import { format } from "date-fns";
import ButtonAtt from "../ButtonAttendance";
import { Attendance } from "@/app/lib/action";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { OctagonAlert } from "lucide-react";

export function AttendanceCard({
  attendance: Attendance,
}: {
  attendance: Attendance;
}) {
  return (
    // <div className="p-4 bg-base-200 rounded-lg min-h-max pb-16">
    //   <div className="relative block overflow-hidden rounded-lg bg-base-100 border-gray-100 p-4 sm:p-6 lg:p-8 shadow-lg">
    //     <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

    //     <div className="sm:flex sm:justify-between sm:gap-4">
    //       <div>
    //         <h2>Today [ {format(new Date(), "EEEE dd, MMM yyyy")} ]</h2>
    //       </div>
    //     </div>

    //     <div className="mt-4">
    //       <div className="grid grid-cols-2 py-2 gap-1">
    //         <div className="flex flex-col gap-2 items-center">
    //           <p>
    //             {Attendance?.checkInTime
    //               ? format(new Date(Number(Attendance?.checkInTime)), "HH:mm")
    //               : "--:--"}
    //           </p>
    //           <ButtonAtt label="Masuk" param1="hr/preview/in" style="primary" />
    //         </div>
    //         <div className="flex flex-col gap-2 items-center">
    //           <p>
    //             {Attendance?.checkOutTime
    //               ? format(new Date(Number(Attendance?.checkOutTime)), "HH:mm")
    //               : "--:--"}
    //           </p>
    //           <ButtonAtt
    //             label="Pulang"
    //             param1="hr/preview/out"
    //             style="outline"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <Card>
      <CardHeader>
        {/* <h1 className="text-md">Today [ {format(new Date(), "EEEE dd, MMM yyyy")} ]</h1> */}
        <Alert>
          <AlertDescription>
            <span className="flex items-center">
              <OctagonAlert className="text-amber-600 h-4 w-4 mr-2" />
              Selfie photo is required for attendance
            </span>
          </AlertDescription>
        </Alert>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 py-2 gap-1">
          <div className="flex flex-col gap-2 items-center">
            <p className="text-md font-bold text-2xl pb-4">
              {Attendance?.checkInTime
                ? format(new Date(Number(Attendance?.checkInTime)), "HH:mm")
                : "--:--"}
            </p>
            <ButtonAtt label="Masuk" param1="hr/preview/in" style="primary" />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <p className="text-md font-bold text-2xl pb-4">
              {Attendance?.checkOutTime
                ? format(new Date(Number(Attendance?.checkOutTime)), "HH:mm")
                : "--:--"}
            </p>
            <ButtonAtt label="Pulang" param1="hr/preview/out" style="primary" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-amber-600">
          If you have any questions, please contact your HR
        </p>
      </CardFooter>
    </Card>
  );
}
