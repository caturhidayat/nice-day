import React from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import getMe from "@/app/get-me";
import { CalendarCheck, MapPin } from "lucide-react";
import { getAttendances } from "@/app/common/action";
import EmplyAttendance from "@/app/components/UI/EmplyAttendance";

dayjs.extend(utc);

export default async function Page() {
    // Get 3 last attendance records
    const attendance = await getAttendances();
    const me = await getMe();

    return (
        <section className="mx-auto max-w-screen-xl px-6 pb-16 justify-center lg:flex  lg:items-center">
            {attendance.length === 0 ? (
                <EmplyAttendance />
            ) : (
                <div className="grid grid-cols-1 gap-4 justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
                    {attendance.map((item) => (
                        <div
                            key={item.id}
                            className="block rounded-lg p-4 shadow-lg shadow-indigo-100"
                        >
                            <div className="mt-2">
                                <dl>
                                    <div>
                                        <dt className="sr-only">Name</dt>

                                        <dd className="font-bold text-primary">
                                            {me.name}
                                        </dd>
                                    </div>
                                    <div className="grid grid-cols-1 py-2 gap-2">
                                        <div className="text-gray-400 text-sm">
                                            Date:{" "}
                                            {dayjs
                                                .utc(item.attendanceDate)
                                                .format("YYYY-MM-DD")}{" "}
                                        </div>
                                        <div className="grid grid-cols-2 py-2">
                                            <div className="items-center">
                                                <p className="text-teal-600">
                                                    Check In
                                                </p>
                                                {item.checkInTime ? (
                                                    <div className="items-center">
                                                        {dayjs
                                                            .utc(
                                                                item.checkInTime
                                                            )
                                                            .format("HH:mm")}
                                                    </div>
                                                ) : (
                                                    <div className="items-center">
                                                        --:--
                                                    </div>
                                                )}
                                            </div>
                                            <div className="items-center">
                                                <p className="text-error">
                                                    Check Out
                                                </p>
                                                {item.checkOutTime ? (
                                                    <div className="items-center">
                                                        {dayjs.utc(
                                                            item.checkOutTime
                                                        ).format("HH:mm")}
                                                    </div>
                                                ) : (
                                                    <div className="items-center">
                                                        --:--
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex gap-6 pt-4 border-t-2">
                                            <MapPin
                                                size={18}
                                                className="text-teal-600"
                                            />
                                            <CalendarCheck
                                                size={18}
                                                className="text-teal-600"
                                            />
                                        </div>
                                    </div>
                                </dl>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
