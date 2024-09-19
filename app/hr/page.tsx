import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import ButtonAtt from "../components/ButtonAttendance";
import LocalTimeView from "../components/LocalTimeView";
import { getAttendance, getProfile } from "../common/action";

dayjs.extend(utc);
dayjs.extend(timezone);

export default async function Page() {
    const lastAttendance = await getAttendance();
    const me = await getProfile();

    const today = dayjs()
        .tz("Asia/Jakarta")
        .format("dddd, MMM D, YYYY")
        .toString();
    // console.log("me", me);
    // const userTimezone = "Asia/Jakarta";

    return (
        <div className="bg-base-100">
            <div className="grid justify-center py-4 max-w-xl px-4">
                <h2 className="text-xl font-bold sm:text-2xl ">
                    Hello {me?.name}!
                </h2>
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
                                <LocalTimeView
                                    dbTime={lastAttendance.checkInTime}
                                    style="success"
                                />
                                <ButtonAtt
                                    label="Masuk"
                                    param1="hr/preview/in"
                                    style="primary"
                                />
                            </div>
                            <div className="flex flex-col gap-2 items-center">
                                <LocalTimeView
                                    dbTime={lastAttendance.checkOutTime}
                                    style="error"
                                />
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
