import LeaveCard from "@/app/components/UI/LeaveCard";
import { getLeave } from "../../actions";
import { Button } from "@/components/ui/button";
import { SquareChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function page({ params }: { params: { id: string } }) {
  const leave = await getLeave(params.id);
  return (
    <div className="grid gap-2 m-auto p-4">
      <div>
        <Link href={"/hr/leaves"}>
          <Button variant={"outline"}>
            <SquareChevronLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
      </div>
      <div>
        <LeaveCard leave={leave} />
      </div>
      <div className="grid justify-end">
        <Button variant={"destructive"}>Cancel</Button>
      </div>
    </div>
  );
}
