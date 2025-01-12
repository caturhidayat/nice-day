import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

export const getHeaders = async () => ({
  Cookie: (await cookies()).toString(),
});


export async function post(path: string, data: FormData) {
  const token = await getHeaders();
  // console.log("formData : ", data);
  console.log("request body ", data);
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...token },
    body: JSON.stringify(Object.fromEntries(data)),
  });

  // console.log("res", res);
  const parsedRes = await res.json();
  console.log("parsedRes", parsedRes);
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  } else {
    return {error: "", data: parsedRes };
  }
};

export async function get<T>(path: string) {
  const token = await getHeaders();
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...token, "Content-Type": "application/json" },
  });
  return res.json() as T;
};

export async function getOne<T>(path: string, id: string) {
  const token = await getHeaders();
  const res = await fetch(`${API_URL}/${path}/${id}`, {
    headers: { ...token, "Content-Type": "application/json" },
  });
  return res.json() as T;
};

export async function patch(path: string, data: FormData) {
  const token = await getHeaders();
  const res = await fetch(`${API_URL}/${path}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", ...token },
    body: JSON.stringify(Object.fromEntries(data)),
  });
  return res.json();
}
