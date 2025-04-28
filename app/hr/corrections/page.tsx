import React from "react";
import CorrectionForm from "./correction-form";
import { getProfile } from "@/app/lib/action";

export default async function Page() {

  const profile = await getProfile();
  return (
    <div className="mx-auto max-w-screen-xl">
      <CorrectionForm profile={profile} />
    </div>
  );
}
