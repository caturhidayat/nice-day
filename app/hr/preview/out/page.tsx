import { getAttendance } from "@/app/common/action";
import LoadingDot from "@/app/components/LoadingDot";
import AttendancePreview from "@/app/components/UI/AttendancePreview";
import React, { Suspense } from "react";

export default async function Page() {
  const attendance = await getAttendance();
  console.log("lastAttendance ID : ", attendance.id);
  return (
    <Suspense fallback={<LoadingDot />}>
      <section className="mx-auto max-w-screen-xl justify-center lg:flex  lg:items-center">
        <AttendancePreview mode="out" attendanceId={attendance.id} />
      </section>
    </Suspense>
  );
}
