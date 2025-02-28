import {
  getAttendance,
  getProfile,
  getShiftToday,
} from "../lib/action";

import { AttendanceCard } from "../components/UI/AttendanceCard";
import ClockDisplay from "../components/ClockDisplay";


export default async function Page() {
  const attendance = await getAttendance();
  // const attendances = await getAttendances();
  const me = await getProfile();
  const shiftToday = await getShiftToday(me?.id);

  console.log("attendance : ", attendance);

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
     
      <div className="grid max-w-xl pb-12">
        <h2 className="text-xl font-bold sm:text-2xl mt-4">
          {/* <MenuList /> */}
        </h2>
      </div>
    </div>
  );
}
