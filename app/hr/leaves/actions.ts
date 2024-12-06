"use server";

import { Leaves } from "@/app/lib/action";
import { get, getOne, post } from "@/app/lib/utils/fetch";
import { revalidateTag } from "next/cache";

export async function createLeaves(formData: FormData) {
  console.log("formData", formData);
  const response = await post(`leaves`, formData);
  revalidateTag("leaves");
  return response;
}

// Get ALl Leaves by userId
export async function getLeaves() {
  return get<Leaves[]>(`leaves`);
}

// Get Single Leaves by id
export async function getLeave(id: string) {
  return getOne<Leaves>("leaves", id);
}
