import { getAttendance, getProfile } from "../lib/action";

import MenuList from "../components/UI/MenuList";
import { AttendanceCard } from "../components/UI/AttendanceCard";
import ClockDisplay from "../components/ClockDisplay";
import { format } from "date-fns";
import { TZDate } from "@date-fns/tz";

export default async function Page() {
  const attendance = await getAttendance();
  const me = await getProfile();

  console.log("attendance", attendance);

  return (
    <div className="bg-base-100">
      <h2 className="mt-4 text-center text-xl font-semibold pb-6">
        ✨ Hello {me?.name}! 👋
      </h2>
      <div className="grid justify-center max-w-xl pb-2 space-y-4 bg-rose-700">
        <p className="mt-4 text-center text-xl font-semibold text-secondary">
          Live Attendance
        </p>
        {/* <ClockDisplay /> */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center">
            <div className="text-5xl font-bold text-secondary">
              {format(new TZDate(new Date(), "Asia/Jakarta"), "HH:mm")}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <span className="text-md text-slate-300">
              <h2>{format(new Date(), "EEE, dd MMM yyyy")}</h2>
            </span>
          </div>
        </div>
        <div className="p-1">
          <AttendanceCard attendance={attendance} />
        </div>
      </div>
      <div className="grid max-w-xl pb-12">
        <h2 className="text-xl font-bold sm:text-2xl mt-4">
          <MenuList />
        </h2>
      </div>
    </div>
  );
}
