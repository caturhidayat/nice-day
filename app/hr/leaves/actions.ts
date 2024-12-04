'use server';

import { post } from "@/app/lib/utils/fetch";

export async function createLeaves(formData: FormData) {

    console.log("formData", formData);
    const response = await post(`leaves`, formData);
    // revalidateTag("attendance");
    return response;
  }