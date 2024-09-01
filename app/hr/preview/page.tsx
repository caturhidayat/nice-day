'use client';

import AttendancePreview from "@/app/components/UI/AttendancePreview";

export default function page() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-8">
      <AttendancePreview />
    </div>
  );
}
