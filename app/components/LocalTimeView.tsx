"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

type LocalTimeViewProps = {
    dbTime: string;
    timezone?: string;
};

export default function LocalTimeView({
    dbTime,
    timezone,
}: LocalTimeViewProps) {
    const localTime = dayjs.utc(dbTime);
    return (
        <h2 className="text-lg text-success font-bold py-4">
            {dbTime ? localTime.format("HH:mm").toString() : "--:--"}
        </h2>
    );
}
