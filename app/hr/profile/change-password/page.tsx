import Link from "next/link";
import FormChangePassword from "./FormChangePassword";
import { Button } from "@/components/ui/button";
import { SquareChevronLeft } from "lucide-react";

export default function ChangePassword() {
  return (
    <div className="grid gap-2 m-auto p-4">
      <div>
        <Link href={"/hr/profile"}>
          <Button variant={"outline"} className="text-amber-600">
            <SquareChevronLeft className=" h-4 w-4" />
            Back
          </Button>
        </Link>
        <p className="text-xl font-bold">ChangePassword</p>
      </div>
      <div>
        <FormChangePassword />
      </div>
    </div>
  );
}
