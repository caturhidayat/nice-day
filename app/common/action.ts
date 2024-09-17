"use server";

import { z } from "zod";
import { validatedAction } from "./middleware";
import { API_URL } from "./constants/api";
import { getErrorMessage } from "./utils/errors";
import { redirect } from "next/navigation";
import { setAuthCookie } from "../auth/login/login";

const loginSchema = z.object({
  username: z.string().min(3).max(20),
  password: z.string().min(6).max(100),
});

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
