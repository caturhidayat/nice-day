import {  getAttendance, getProfile } from "../lib/action";

import MenuList from "../components/UI/MenuList";
import { AttendanceCard } from "../components/UI/AttendanceCard";
import ClockDisplay from "../components/ClockDisplay";

export default async function Page() {
  const attendance = await getAttendance();
  const me = await getProfile();

  // console.log("attendance", attendance);

  return (
    <div className="bg-base-100">
      <h2 className="mt-4 text-center text-xl font-semibold pb-6">
        ✨ Hello {me?.name}! 👋
      </h2>
      <div className="grid justify-center max-w-xl pb-2 space-y-4 bg-rose-700">
        <p className="mt-4 text-center text-xl font-semibold text-secondary">
          Live Attendance
        </p>
        <ClockDisplay />
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
