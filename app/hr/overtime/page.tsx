import OvertimeCard from "@/app/components/UI/OvertimeCard";
import { Construction } from "lucide-react";

export default async function Page() {
  return (
    <div className="grid gap-4 p-4">
      {/* <h1 className="py-4 font-semibold text-xl">List of Overtime</h1> */}
      <div>
        {/* <OvertimeCard /> */}
        <span className="flex flex-col items-center justify-center">
          <Construction className="h-12 w-12 text-yellow-500" />

          <span className="text-xl">This page Under Construction</span>
        </span>
      </div>
    </div>
  );
}
