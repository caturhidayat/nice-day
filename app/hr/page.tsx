import ButtonAtt from "../components/ButtonAttendance";
import { getAttendance, getProfile } from "../lib/action";

import { format, startOfToday } from "date-fns";
import { TZDate } from "@date-fns/tz";
import MenuList from "../components/UI/MenuList";

// const today = startOfToday().getTime();
const today = Date.now();

// function to return component for check in time and check out time
async function displayCheckInDate() {
    const attendance = await getAttendance();
    if (!attendance) return false;

    const attendanceDate = new TZDate(
        new Date(Number(attendance.attendanceDate)),
        "Asia/Jakarta"
    );
    const todayDate = new TZDate(new Date(today), "Asia/Jakarta");

    const isSameDate =
        format(attendanceDate, "yyyy-MM-dd") ===
        format(todayDate, "yyyy-MM-dd");

    if (!isSameDate) return <p className="text-sm">--:--</p>;

    const checkInDate = attendance.checkInTime
        ? format(
              new TZDate(
                  new Date(Number(attendance.checkInTime)),
                  "Asia/Jakarta"
              ),
              "HH:mm"
          )
        : "--:--";
    return <p className="text-sm">{checkInDate}</p>;
}

async function displayCheckOutDate() {
    const attendance = await getAttendance();
    if (!attendance) return false;

    const attendanceDate = new TZDate(
        new Date(Number(attendance.attendanceDate)),
        "Asia/Jakarta"
    );
    const todayDate = new TZDate(new Date(today), "Asia/Jakarta");

    const isSameDate =
        format(attendanceDate, "yyyy-MM-dd") ===
        format(todayDate, "yyyy-MM-dd");

    if (!isSameDate) return <p className="text-sm">--:--</p>;

    const checkOutDate = attendance.checkOutTime
        ? format(
              new TZDate(
                  new Date(Number(attendance.checkOutTime)),
                  "Asia/Jakarta"
              ),
              "HH:mm"
          )
        : "--:--";
    return <p className="text-sm">{checkOutDate}</p>;
}

export default async function Page() {
    const me = await getProfile();
    // 1. Get Profile
    // 2. Get Attendance
    // 3. Get Shift Today
    // 4. check if today is the same as the last attendance
    // 5. if not, render --:-- for check in and check out
    // 6. if yes, render the check in and check out time
    // 7. if check out time 4 hours before current time, render check out as --:--

    return (
        <div className="bg-base-100">
            <div className="grid justify-center py-4 max-w-xl px-4">
                <h2 className="text-xl font-bold sm:text-2xl ">
                    Hello {me?.name}! 👋
                </h2>
                <p className="mt-4 text-base-content">Semangat Kerja ya!</p>
            </div>
            <div className="p-4 bg-base-200 rounded-lg min-h-max pb-16">
                <div className="relative block overflow-hidden rounded-lg bg-base-100 border-gray-100 p-4 sm:p-6 lg:p-8 shadow-lg">
                    <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

                    <div className="sm:flex sm:justify-between sm:gap-4">
                        <div>
                            <h2>
                                Today [{" "}
                                {format(
                                    new TZDate(new Date(today)),
                                    "EEEE, MMM d, yyyy"
                                )}
                                ]
                            </h2>
                        </div>
                    </div>

                    <div className="mt-4">
                        <div className="grid grid-cols-2 py-2 gap-1">
                            <div className="flex flex-col gap-2 items-center">
                                {displayCheckInDate()}
                                <ButtonAtt
                                    label="Masuk"
                                    param1="hr/preview/in"
                                    style="primary"
                                />
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                {displayCheckOutDate()}
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
            <div>
                <h2 className="text-xl font-bold sm:text-2xl mt-4">
                    <MenuList />
                </h2>
            </div>
        </div>
    );
}
