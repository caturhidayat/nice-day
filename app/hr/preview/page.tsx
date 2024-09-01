import LoadingDot from "@/app/components/LoadingDot";
import AttendancePreview from "@/app/components/UI/AttendancePreview";
import React, { Suspense } from "react";

export default function page() {
  return (
    <Suspense fallback={<LoadingDot />}>
      <section className="mx-auto max-w-screen-xl lg:flex  lg:items-center">
        <AttendancePreview />
      </section>
    </Suspense>
  );
}
