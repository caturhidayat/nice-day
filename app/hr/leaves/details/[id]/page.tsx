import LeaveCard from "@/app/components/UI/LeaveCard";
import { getLeave } from "../../actions";
import { Button } from "@/components/ui/button";
import { SquareChevronLeft } from "lucide-react";
import Link from "next/link";

type Params = Promise<{ id: string }>;
// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Page({
  params,
}: {
  params: Params;
  // searchParams: SearchParams;
}) {
  const id = (await params).id;
  const leave = await getLeave(id);
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
