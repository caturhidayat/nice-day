"use server";

import { get } from "@/app/common/utils/fetch";

export async function getAttendance() {
  return get("attendances/last-attendance", ["attendance"]);
}
