import {
  getAttendance,
  getAttendances,
  getProfile,
  getShiftToday,
} from "../lib/action";

import MenuList from "../components/UI/MenuList";
import { AttendanceCard } from "../components/UI/AttendanceCard";
import ClockDisplay from "../components/ClockDisplay";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LocalTimeView from "../components/LocalTimeView";
import { MapPinXInside } from "lucide-react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Page() {
  const attendance = await getAttendance();
  const attendances = await getAttendances();
  const me = await getProfile();
  const shiftToday = await getShiftToday(me?.id);

  console.log("attendances : ", attendances);

  const initialFallback = me?.name[0].toUpperCase();

  return (
    <div className="bg-base-100">
      <div className="bg-rose-700 pb-4">
        <h2 className="text-center text-xl font-semibold py-2 text-white">
          ✨ Hello {me?.name}! 👋
        </h2>
        <div className="grid justify-center max-w-xl">
          <p className="text-center text-lg text-secondary">
            Live Attendance
          </p>
          <ClockDisplay />
          <div>
            <AttendanceCard
              attendance={attendance}
              me={me}
              shiftToday={shiftToday}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4">
        <h3 className="text-sm py-2 font-semibold">Last Attendances</h3>
        {attendances.length !== 0 ? (
          attendances.map((att) => (
            <Card key={att.id}>
              <CardContent>
                <div className="grid col-span-1">
                  <p className="text-xs">
                    {format(
                      new Date(+att?.attendanceDate),
                      "EEE, dd MMM yyyy"
                    )}
                  </p>
                  <Separator />
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-sm flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{initialFallback}</AvatarFallback>
                      </Avatar>
                      <LocalTimeView dbTime={att.checkInTime} />
                    </div>
                    <div className="text-sm flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>{initialFallback}</AvatarFallback>
                      </Avatar>
                      <LocalTimeView dbTime={att.checkOutTime} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div>
            <Alert>
              <AlertTitle>Recent attendances</AlertTitle>
              <AlertDescription>No attendances recorded</AlertDescription>
            </Alert>
          </div>
        )}
      </div>
      <div className="grid max-w-xl pb-12">
        <h2 className="text-xl font-bold sm:text-2xl mt-4">
          {/* <MenuList /> */}
        </h2>
      </div>
    </div>
  );
}
