"use server";

import { FormResponse } from "@/app/lib/interfaces/form-response.interface";
import { API_URL } from "@/app/lib/constants/api";
import { getErrorMessage } from "@/app/lib/utils/errors";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AUTHENTICATION_COOKIE } from "../../lib/constants/auth-cookie";
import { z } from "zod";

// export default async function login(_prevState: FormResponse, formData: FormData) {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(Object.fromEntries(formData)),
//   });

//   const parsedRes = await res.json();
//   if (!res.ok) {
//     return { error: getErrorMessage(parsedRes), success: "" };
//   }
  
//   setAuthCookie(res);
//   redirect("/hr");
// }


export interface AuthFormData {
  username: string;
  password: string;
}

export interface ActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AuthFormData]?: string[];
  };
  inputs?: AuthFormData;
}

const AuthSchema = z.object({
  username: z
    .string({ required_error: "Username is required" })
    .min(4, { message: "Username must be at least 4 characters" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export default async function login(
  _prevState: ActionResponse,
  formData: FormData
): Promise<ActionResponse> {
  try {
    const rawData = {
      username: formData.get("username") as string,
      password: formData.get("password") as string,
    };

    // Validate data
    const validatedData = AuthSchema.safeParse(rawData);

    if (!validatedData.success) {
      return {
        success: false,
        message: "Please fix the following errors / credentials are incorrect",
        errors: validatedData.error.flatten().fieldErrors,
        inputs: rawData,
      };
    }
    console.log("Form Data server action : ", validatedData.data);
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData.data),
    });

    // console.log("res from API : ", res.ok);

    if (!res.ok) {
      return {
        success: false,
        message: "Credentials are incorrect",
        errors: { username: [getErrorMessage(res)] },
        inputs: rawData,
      };
    }

    await setAuthCookie(res);
    // await new Promise((resolve) => setTimeout(resolve, 800))
    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    return {
      success: false,
      message: "Failed to log in",
    };
  }
}



export const setAuthCookie = async (response: Response) => {
  const cookieStore = await cookies();
  const setCookieHeader = response.headers.get("Set-Cookie");
  if (setCookieHeader) {
    const token = setCookieHeader.split(";")[0].split("=")[1];
    cookieStore.set({
      name: AUTHENTICATION_COOKIE,
      value: token,
      secure: true,
      httpOnly: true,
      expires: new Date(jwtDecode(token).exp! * 1000),
    });
  }
};
