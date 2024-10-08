"use client";

import ButtonAtt from "../components/ButtonAttendance";
import {
    Attendance,
    getAttendance,
    getProfile,
    getShiftToday,
    ProfileProps,
} from "../common/action";
import { MapPinned } from "lucide-react";
import { useEffect, useState } from "react";
import { format, endOfDay, getTime } from "date-fns";

export default function Page() {

    const [today, setToday] = useState(getTime(new Date()));

    useEffect(() => {
      const interval = setInterval(() => {
        setToday(getTime(new Date()));
      }, 1000); // Update every second

      return () => clearInterval(interval); // Cleanup on unmount
    }, []);
    console.log("startDay", today);
    const endDay = getTime(endOfDay(new Date()));
    const now = getTime(new Date());

    const [lastAttendance, setLastAttendance] = useState<Attendance>();
    const [me, setMe] = useState<ProfileProps>();
    const [userShift, setUserShift] = useState<any>();

    useEffect(() => {
        const fetchData = async () => {
            const lastAttendance = await getAttendance();
            const me = await getProfile();
            const userShift = await getShiftToday(me.id);
            setLastAttendance(lastAttendance);
            setMe(me);
            setUserShift(userShift);
        };

        fetchData();
    }, []);

    // Get last attendance for today
    // const lastAttendance = await getAttendance();
    console.log("lastAttendance", lastAttendance);
    const attDate = lastAttendance
        ? new Date(Number(lastAttendance.attendanceDate))
        : new Date();
    // const attendanceDate = dayjs(attDate).startOf("day").valueOf();
    console.log("attendance Date : ", lastAttendance?.attendanceDate);
    // const me = await getProfile();

    // Function to get user shift today
    // const userShift = await getShiftToday(me.id);

    console.log("userShift : ", userShift);
    const shiftToday = () => {
        if (userShift) {
            if (userShift.name === "OFF") {
                return (
                    <p className="mt-1 text-xs font-medium text-error">
                        Shift : [ {userShift.name} ] - {format(today, "EEEE")}
                    </p>
                );
            } else {
                return (
                    <p className="mt-1 text-xs font-medium text-gray-600">
                        Shift :{" "}
                        {format(new Date(Number(userShift.startTime)), "HH:mm")}
                        - {format(new Date(Number(userShift.endTime)), "HH:mm")}
                    </p>
                );
            }
        } else {
            return (
                <p className="mt-1 text-xs font-medium text-gray-600">
                    Shift : -
                </p>
            );
        }
    };

    const checkInTime = lastAttendance
        ? format(new Date(Number(lastAttendance.checkInTime)), "HH:mm")
        : "--:--";
    const checkOutTime = lastAttendance
        ? format(new Date(Number(lastAttendance.checkOutTime)), "HH:mm")
        : "--:--";

    // Function to display check in time
    const displayCheckInDate = () => {
        if (
            // dayjs(attendanceDate).isSame(today, "day") &&
            // lastAttendance?.checkInTime
            lastAttendance?.checkInTime
        ) {
            return (
                <span className="text-success py-4 flex justify-center items-center gap-2">
                    <p className="font-semibold text-lg">{checkInTime}</p>
                    <MapPinned size={16} />
                </span>
            );
        } else if (
            lastAttendance?.checkOutTime &&
            new Date(Number(lastAttendance.checkOutTime)).getTime() +
                4 * 60 * 60 * 1000 >
                now &&
            format(attDate, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
        ) {
            return (
                <span className="text-success py-4 flex justify-center items-center gap-2">
                    <p className="font-semibold text-lg">--:--</p>;
                </span>
            );
        } else {
            return (
                <span className="text-success py-4 flex justify-center items-center gap-2">
                    <p className="font-semibold text-lg">--:--</p>;
                </span>
            );
        }
    };

    const displayCheckOutDate = () => {
        if (
            // dayjs(attendanceDate).isSame(today, "day") &&
            // lastAttendance?.checkOutTime
            lastAttendance?.checkOutTime
        ) {
            return (
                <span className="text-error py-4 flex justify-center items-center gap-2">
                    <p className="font-semibold text-lg">{checkOutTime}</p>
                    <MapPinned size={16} />
                </span>
            );
        } else if (
            new Date(Number(lastAttendance?.checkOutTime)).getTime() +
                4 * 60 * 60 * 1000 >
            now
        ) {
            return (
                <span className="text-error py-4 flex justify-center items-center gap-2">
                    <p className="font-semibold text-lg">--:--</p>
                </span>
            );
        } else {
            return (
                <span className="text-error py-4 flex justify-center items-center gap-2">
                    <p className="font-semibold text-lg">--:--</p>
                </span>
            );
        }
    };

    return (
        <div className="bg-base-100">
            <div className="grid justify-center py-4 max-w-xl px-4">
                <h2 className="text-xl font-bold sm:text-2xl ">
                    Hello {me?.name}!
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
                                {format(new Date(today), "EEEE, MMM d, yyyy")}]
                            </h2>
                            {shiftToday()}
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
        </div>
    );
}
