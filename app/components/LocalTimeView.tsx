"use client";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

type LocalTimeViewProps = {
    dbTime: string;
    timezone?: string;
    style?: string;
};

export default function LocalTimeView({
    dbTime,
    timezone,
    style,
}: LocalTimeViewProps) {
    const localTime = dayjs.utc(dbTime);
    return (
        <h2 className={`text-lg text-${style} font-bold py-4`}>
            {dbTime ? localTime.format("HH:mm").toString() : "--:--"}
        </h2>
    );
}
