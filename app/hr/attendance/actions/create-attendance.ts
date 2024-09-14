'use server';

import { API_URL } from "@/app/common/constants/api";
import { getHeaders, post } from "@/app/common/utils/fetch";
import { revalidateTag } from "next/cache";


export async function createAttendance(formData: FormData) {
    const response = await post("attendance/check-in", formData);

    console.log("res-action", response);
    const attendanceImage = formData.get("image") as File;
    if (attendanceImage instanceof File && response.error) {
        await uploadAttendanceImage(response.data.id, attendanceImage);
    }
    revalidateTag("last-attendance");
    return response;
}


async function uploadAttendanceImage(attendanceId: string, file: File) {
    const formData = new FormData();
    formData.append("image", file);
    await fetch(`${API_URL}/attendance/${attendanceId}/image`, {
        body: formData,
        method: "POST",
        headers: getHeaders()
    })
}