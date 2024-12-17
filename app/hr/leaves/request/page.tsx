import { SquareChevronLeft } from "lucide-react";
import { InputForm } from "../LeavesForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import FormInput from "../FormInput";

export default function LeavesRequest() {
  return (
    <div className="grid gap-2 m-auto p-4">
      <div className="flex justify-start">
        <Link href={"/hr/leaves"}>
          <Button variant={"outline"} className="text-amber-600">
            <SquareChevronLeft className=" h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <div className="text-xl font-bold">Leave Request Form</div>
      <InputForm />
      {/* <FormInput /> */}
    </div>
  );
}
