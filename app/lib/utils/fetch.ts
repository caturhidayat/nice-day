import { cookies } from "next/headers";
import { API_URL } from "../constants/api";
import { getErrorMessage } from "./errors";

export const getHeaders = () => ({
  Cookie: cookies().toString(),
});

export const post = async (path: string, data: FormData) => {
  console.log("formData : ", data);
  // const body = data instanceof FormData ? Object.fromEntries(data) : data;

  console.log("request body ", data);
  const res = await fetch(`${API_URL}/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getHeaders() },
    body: JSON.stringify(Object.fromEntries(data)),
  });

  console.log("res", res);
  const parsedRes = await res.json();
  console.log("parsedRes", parsedRes);
  if (!res.ok) {
    return { error: getErrorMessage(parsedRes) };
  } else {
    return { data: parsedRes };
  }
};

// export const get = async <T>(path: string, tags?: string[]) => {
//   const res = await fetch(`${API_URL}/${path}`, {
//     headers: { ...getHeaders() },
//     next: { tags },
//   });
//   return res.json() as T;
// };

export const get = async <T>(path: string) => {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: { ...getHeaders() },
  });
  return res.json() as T;
};

export const getOne = async <T>(path: string, id: string) => {
  const res = await fetch(`${API_URL}/${path}/${id}`, {
    headers: { ...getHeaders() },
  });
  return res.json() as T;
};
