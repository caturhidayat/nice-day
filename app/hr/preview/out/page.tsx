import LoadingDot from "@/app/components/LoadingDot";
import AttendancePreview from "@/app/components/UI/AttendancePreview";
import React, { Suspense } from "react";

export default async function Page() {
    return (
        <Suspense fallback={<LoadingDot />}>
            <section className="mx-auto max-w-screen-xl justify-center lg:flex  lg:items-center">
                <AttendancePreview mode="out" />
            </section>
        </Suspense>
    );
}
