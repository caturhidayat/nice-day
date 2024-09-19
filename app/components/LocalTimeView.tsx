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
    const localTime = dayjs(dbTime).format("HH:mm").toString();
    return (
        <h2 className={`text-lg text-${style} font-bold py-4`}>
            {dbTime ? localTime : "--:--"}
        </h2>
    );
}
