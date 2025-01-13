import { getAttendance, getProfile } from "../lib/action";

import MenuList from "../components/UI/MenuList";
import { AttendanceCard } from "../components/UI/AttendanceCard";
import ClockDisplay from "../components/ClockDisplay";

export default async function Page() {
  const attendance = await getAttendance();
  const me = await getProfile();

  // console.log("attendance", attendance);

  return (
    <div className="bg-base-100">
      <div className="bg-rose-700 pb-4">
        <h2 className="text-center text-xl font-semibold py-2 text-white">
          ✨ Hello {me?.name}! 👋
        </h2>
        <div className="grid justify-center max-w-xl space-y-2 ">
          <p className="text-center text-xl font-semibold text-secondary">
            Live Attendance
          </p>
          <ClockDisplay />
          <div className="p-1">
            <AttendanceCard attendance={attendance} />
          </div>
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
