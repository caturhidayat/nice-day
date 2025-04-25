import {
  getAttendance,
  getProfile,
  getShiftToday,
} from "../lib/action";

import { AttendanceCard } from "../components/UI/AttendanceCard";
import ClockDisplay from "../components/ClockDisplay";
import MenuList from "../components/UI/MenuList";


export default async function Page() {
  const attendance = await getAttendance();
  // const attendances = await getAttendances();
  const me = await getProfile();
  const shiftToday = await getShiftToday(me?.id);

  console.log("attendance : ", attendance);

  const initialFallback = me?.name[0].toUpperCase();

  return (
    <div className="bg-base-100">
      <div className="bg-teal-700 pb-4 rounded-b-2xl p-4">
        <h2 className="pl-4 text-xl font-semibold text-white">
          Hello {me?.name}! 👋
        </h2>
        <div className="grid p-4">
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
          <MenuList />
        </h2>
      </div>
    </div>
  );
}
