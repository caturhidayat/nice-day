"use server";

import { z } from "zod";
import { validatedAction } from "./middleware";
import { API_URL } from "./constants/api";
import { getErrorMessage } from "./utils/errors";
import { redirect } from "next/navigation";
import { setAuthCookie } from "../auth/login/login";
import { get, getHeaders, post } from "./utils/fetch";
import { revalidateTag } from "next/cache";
import { ATTENDANCE_COOKIE } from "./constants/attendance_cookie";
import { cookies } from "next/headers";

const loginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(100),
});

export type AttendanceResponse = {
  id: string;
  attendanceDate: Date;
  userId: string;
  checkInTime: string;
  checkOutTime: string;
};

export interface Attendance {
  id: string;
  attendanceDate: string;
  userId: string;
  checkInTime: string;
  checkOutTime: string;
  inLatitude: number;
  inLongitude: number;
  outLatitude: number;
  outLongitude: number;
  isLate: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export type ProfileProps = {
  id: string;
  name: string;
  departement: string;
  branch: string;
};

export type UserShift = {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  isDynamic: boolean;
  createdAt: string;
  updatedAt: string;
};

export interface Leaves {
  id: string;
  startDate: string;
  endDate: string;
  reason: string;
  leaveType: string;
  status: string;
  approvedById: string;
  createdAt: string;
  updatedAt: string;
}

export async function getProfile() {
  const result = await get<ProfileProps>("users/profile");
  // console.log("result", result);
  return result;
}

export async function getAttendance() {
  return get<Attendance>("attendances/today");
}

export async function getAttendances() {
  return get<Attendance[]>("attendances/last-attendances");
}

export async function createAttendance(formData: FormData) {
  // console.log("formData", formData);
  const image = formData.get("image");
  formData.delete("image");

  const response = await post("attendances/check-in", formData);

  // console.log("res-action", response);
  if (image instanceof Blob && !response.error) {
    const fileName = response.data.id;
    await uploadAttendanceInImage(fileName, image);
  }
  revalidateTag("attendance");
  return response;
}

export async function updateAttendance(formData: FormData) {
  // console.log("formData", formData);
  const image = formData.get("image");
  formData.delete("image");

  const response = await post(`attendances/check-out`, formData);

  if (image instanceof Blob && !response.error) {
    const fileName = response.data.id;
    await uploadAttendanceOutImage(fileName, image);
  }
  revalidateTag("attendance");
  return response;
}

async function uploadAttendanceInImage(attendanceId: string, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  await fetch(`${API_URL}/attendances/${attendanceId}/in`, {
    body: formData,
    method: "POST",
    headers: getHeaders(),
  });
}
async function uploadAttendanceOutImage(attendanceId: string, file: File) {
  const formData = new FormData();
  formData.append("image", file);
  await fetch(`${API_URL}/attendances/${attendanceId}/out`, {
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

export async function getShiftToday(userId: string) {
  return get<UserShift>(`users-shift/${userId}/today`);
}
