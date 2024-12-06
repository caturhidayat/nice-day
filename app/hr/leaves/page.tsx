import { Button } from "@/components/ui/button";
import { SearchX, SquarePen } from "lucide-react";
import Link from "next/link";
import { getLeaves } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LeaveCard from "@/app/components/UI/LeaveCard";

export default async function Leaves() {
  const leaves = await getLeaves();

  console.log("getLeaves", leaves);
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col px-4">
      <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold">List of Request</h2>
        <div className="flex justify-end">
          <Link href="/hr/leaves/request">
            <Button variant={"default"}>
              <SquarePen className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </Link>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto space-y-4 pt-4 pr-2 pb-20">
        {leaves.length > 0 ? (
          leaves.map((leave) => (
            <Link href={`/hr/leaves/details/${leave.id}`} key={leave.id}>
              <LeaveCard leave={leave} />
            </Link>
          ))
        ) : (
          <div className="text-center">
            <Alert>
              <AlertTitle>
                <div className="flex items-center justify-center">
                  <SearchX className="mr-2 h-4 w-4 text-destructive" />
                  <span className="font-semibold text-destructive">
                    No Leave Request Found
                  </span>
                </div>
              </AlertTitle>
              <AlertDescription>
                <p>
                  You don&apos;t have any leave request. Please create a new
                  request.
                </p>
              </AlertDescription>
            </Alert>
          </div>
        )}
      </div>
    </div>
  );
}
