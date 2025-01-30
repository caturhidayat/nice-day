"use server";

import { Leaves } from "@/app/lib/action";
import { API_URL } from "@/app/lib/constants/api";
import { get, getHeaders, getOne, post } from "@/app/lib/utils/fetch";
import { revalidateTag } from "next/cache";

export async function createLeaves(formData: FormData) {
  console.log("formData", formData);
  const response = await post(`leaves`, formData);
  const leaveImage = formData.get("image");
  console.log("leaveImage : ", leaveImage);
  if (leaveImage instanceof Blob && !response.error) {
    const fileName = response.data.id;
    await uploadLeaveImage(fileName, leaveImage);
  }
  revalidateTag("leaves");
  return response;
}

async function uploadLeaveImage(leaveId: string, file: File) {
  const token = await getHeaders();
  const formData = new FormData();
  formData.append("image", file);
  await fetch(`${API_URL}/leaves/${leaveId}/image`, {
    body: formData,
    method: "POST",
    headers: token,
  });
}

// Get ALl Leaves by userId
export async function getLeaves() {
  return get<Leaves[]>(`leaves`);
}

// Get Single Leaves by id
export async function getLeave(id: string) {
  return getOne<Leaves>("leaves", id);
}
