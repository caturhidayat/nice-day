import { getAttendance, getProfile } from "../lib/action";

import MenuList from "../components/UI/MenuList";
import { AttendanceCard } from "../components/UI/AttendanceCard";

export default async function Page() {
  const attendance = await getAttendance();
  const me = await getProfile();

  console.log("attendance", attendance);

  return (
    <div className="bg-base-100">
      <div className="grid justify-center py-4 max-w-xl px-4">
        <h2 className="text-xl font-bold sm:text-2xl ">Hello {me?.name}! 👋</h2>
        <p className="mt-4 text-base-content">Semangat Kerja ya!</p>
      </div>
      <AttendanceCard attendance={attendance} />
      <div>
        <h2 className="text-xl font-bold sm:text-2xl mt-4">
          <MenuList />
        </h2>
      </div>
    </div>
  );
}
