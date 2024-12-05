"use server";

import { Leaves } from "@/app/lib/action";
import { get, post } from "@/app/lib/utils/fetch";
import { revalidateTag } from "next/cache";

export async function createLeaves(formData: FormData) {
  console.log("formData", formData);
  const response = await post(`leaves`, formData);
  revalidateTag("leaves");
  return response;
}



export async function getLeaves() {
  return get<Leaves[]>(`leaves`);
}