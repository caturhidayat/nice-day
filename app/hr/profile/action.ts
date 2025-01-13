"use server";

import { ProfileProps } from "@/app/lib/action";
import { get, patch } from "@/app/lib/utils/fetch";

export async function changePassword(formData: FormData) {
  console.log("formData", formData);
  const response = await patch(`users/change-password`, formData);
  return response;
}


