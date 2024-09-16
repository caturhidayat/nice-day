import { get } from "@/app/common/utils/fetch";
import { API_URL } from "@/app/common/constants/api";
import { getHeaders } from "@/app/common/utils/fetch";

export default function getLastAttendance() {
  return fetch(`${API_URL}/attendance/last`, {
    method: "GET",
    headers: { "Content-Type": "application/json", ...getHeaders() },
  });
}
