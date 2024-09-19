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
    createdAt: string;
    updatedAt: string;
}

export type ProfileProps = {
    id: string;
    name: string;
    departement: string;
    branch: string;
};

// export const login = validatedAction(loginSchema, async (data, FormData) => {
//   // const { username, password } = data;
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });

//   const parsedRes = await res.json();
//   if (!res.ok) {
//     return { error: getErrorMessage(parsedRes), success: "" };
//   }

//   setAuthCookie(res);
//   redirect("/hr");
// });

export async function getProfile() {
    const result = await get<ProfileProps>("users/profile");
    // console.log("result", result);
    return result;
}

export async function getAttendance() {
    return get<Attendance>("attendances/last-attendance");
}

export async function getAttendances() {
    return get<Attendance[]>("attendances/last-attendances");
}

export async function createAttendance(formData: FormData) {
    const response = await post("attendances/check-in", formData);

    // console.log("res-action", response);
    // const attendanceImage = formData.get("image") as File;
    // if (attendanceImage instanceof File && response.error) {
    //     await uploadAttendanceImage(response.data.id, attendanceImage);
    // }
    revalidateTag("attendance");
    // setAttendanceCookie(response.data);
    // console.log("res-action", response);
    return response;
}

export async function updateAttendance(attendanceId: string, formData: FormData) {
    const response = await post(`attendances/${attendanceId}/check-out`, formData);
    revalidateTag("attendance");
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
