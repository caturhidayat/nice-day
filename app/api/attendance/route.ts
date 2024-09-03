import { API_URL } from "@/app/common/constants/api";
import { getHeaders } from "@/app/common/utils/fetch";

export async function POST(req: Request) {
  const formData = await req.json ();
  const tokenAuth = getHeaders();

  console.log("formData", formData);
  
  const res = await fetch(`${API_URL}/attendance/check-in`, {
    method: "POST",
    headers: {
      ...tokenAuth,
      "Content-Type": "application/json",
    },
    body: formData
  });

  console.log("res", res);

  if (res.ok) {
    return Response.json({
      message: "Attendance saved successfully",
      data: await res.json(),
    });
  } else {
    return Response.json({
      message: "Failed to save attendance",
      data: await res.json(),
    });
  }

  // return Response.json({
  //   message: "Attendance saved successfully",
  //   data: await res.json(),
  // });
}
