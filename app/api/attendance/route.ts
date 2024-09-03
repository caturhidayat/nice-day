import { getHeaders } from "@/app/common/utils/fetch";

export async function POST(req: Request) {
  const data = await req.json();
  const tokenAuth = getHeaders();

  const res = await fetch("/attendance/check-in", {
    method: "POST",
    headers: {
      ...tokenAuth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return Response.json({
    message: "Attendance saved successfully",
    data: await res.json(),
  });
}
