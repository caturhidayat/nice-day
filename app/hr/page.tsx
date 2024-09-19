import dayjs from "dayjs";
import LocalizeFormat from "dayjs/plugin/localizedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";

import ButtonAtt from "../components/ButtonAttendance";
import LocalTimeView from "../components/LocalTimeView";
import { getAttendance, getProfile } from "../common/action";

dayjs.extend(LocalizeFormat);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);

export default async function Page() {
  const userTimezone = "Asia/Jakarta";
  const startDay = dayjs().startOf("day").valueOf();
  console.log("startDay", startDay);
  const endDay = dayjs().endOf("day").valueOf();

  const lastAttendance = await getAttendance();
  console.log("lastAttendance", lastAttendance);
  const attDate = +dayjs(Number(lastAttendance.attendanceDate));
  const attendanceDate = dayjs(attDate).startOf("day").valueOf();
  console.log("attendance Date : ", attendanceDate);
  const me = await getProfile();

  if (
    +dayjs(lastAttendance.attendanceDate) > startDay &&
    +dayjs(lastAttendance.attendanceDate) < endDay
  ) {
  }

  const checkInTime = dayjs(Number(lastAttendance.checkInTime))
    .tz(userTimezone)
    .format("HH:mm")
    .toString();
  const checkOutTime = dayjs(Number(lastAttendance.checkOutTime))
    .tz(userTimezone)
    .format("HH:mm")
    .toString();

  //   console.log("lastAttendance checkIn : ", lastAttendance);
  const today = dayjs()
    .tz("Asia/Jakarta")
    .format("dddd, MMM D, YYYY h:mm A")
    .toString();
  // console.log("me", me);

  return (
    <div className="bg-base-100">
      <div className="grid justify-center py-4 max-w-xl px-4">
        <h2 className="text-xl font-bold sm:text-2xl ">Hello {me?.name}!</h2>
        <p className="mt-4 text-base-content">Semangat Kerja ya!</p>
      </div>
      <div className="p-4 bg-slate-50 rounded-xl min-h-max pb-16">
        <div className="relative block overflow-hidden rounded-xl bg-base-100 border-gray-100 p-4 sm:p-6 lg:p-8 shadow-lg">
          <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

          <div className="sm:flex sm:justify-between sm:gap-4">
            <div>
              <h2>{today}</h2>

              <p className="mt-1 text-xs font-medium text-gray-600">
                Jam kerja Kamu pukul 08:00 - 17:00
              </p>
            </div>
          </div>

          <div className="mt-4">
            <div className="grid grid-cols-2 py-2 gap-1">
              <div className="flex flex-col gap-2 items-center">
                <p className="text-success font-semibold text-lg py-4">
                  {/* {lastAttendance.checkInTime ? checkInTime : "--:--"} */}
                  {startDay === attendanceDate ? checkInTime : "--:--"}
                </p>
                <ButtonAtt
                  label="Masuk"
                  param1="hr/preview/in"
                  style="primary"
                />
              </div>
              <div className="flex flex-col gap-2 items-center">
                <p className="text-error font-semibold text-lg py-4">
                  {/* {lastAttendance.checkOutTime ? checkOutTime : "--:--"} */}
                  {startDay === attendanceDate && lastAttendance.checkOutTime
                    ? checkOutTime
                    : "--:--"}
                </p>
                <ButtonAtt
                  label="Pulang"
                  param1="hr/preview/out"
                  style="outline"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
