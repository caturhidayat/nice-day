"use server";

import { API_URL } from "@/app/common/constants/api";
import { ATTENDANCE_COOKIE } from "@/app/common/constants/attendance_cookie";
import { getHeaders, post } from "@/app/common/utils/fetch";
import { cookies } from "next/headers";

export async function createAttendance(formData: FormData) {

  const response = await post("attendances/check-in", formData);

  // console.log("res-action", response);
  // const attendanceImage = formData.get("image") as File;
  // if (attendanceImage instanceof File && response.error) {
  //     await uploadAttendanceImage(response.data.id, attendanceImage);
  // }
  // revalidateTag("last-attendance");
  // setAttendanceCookie(response.data);
  console.log("res-action", response);
  return response;
}

async function uploadAttendanceImage(attendanceId: string, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  await fetch(`${API_URL}/attendance/${attendanceId}/image`, {
    body: formData,
    method: "POST",
    headers: getHeaders(),
  });
}


const setAttendanceCookie = (response: Response) => {
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    cookies().set({
      name: ATTENDANCE_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
    });
  }
};