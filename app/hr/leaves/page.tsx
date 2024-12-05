import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { SearchX, SquarePen } from "lucide-react";
import Link from "next/link";
import { getLeaves } from "./actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Leaves() {
  const leaves = await getLeaves();

  console.log("getLeaves", leaves);
  return (
    <div className="h-[calc(100vh-6rem)] flex flex-col px-4">
      <div className="flex flex-col gap-4 py-4">
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
      <div className="flex-1 overflow-y-auto space-y-4 pr-2 pb-20">
        {leaves.length > 0 ? (
          leaves.map((leave) => (
            <Card key={leave.id}>
              <CardHeader>
                <h1 className="text-md font-bold">Request No : {leave.id}</h1>
              </CardHeader>
              <CardContent>
                <div className="flow-root">
                  <dl className="-my-3 divide-y divide-gray-100 text-sm">
                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Request For</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        Catur Hidayat
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Leave Type</dt>
                      <dd className="text-gray-700 font-bold sm:col-span-2">
                        {leave.leaveType}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Start Date</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {format(
                          new Date(Number(leave.startDate)),
                          "dd/MM/yyyy"
                        )}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">End Date</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        {format(new Date(Number(leave.endDate)), "dd/MM/yyyy")}
                      </dd>
                    </div>

                    <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
                      <dt className="font-medium text-gray-900">Status</dt>
                      <dd className="text-gray-700 sm:col-span-2">
                        <Badge
                          className={
                            leave.status === "APPROVED"
                              ? "bg-green-100 text-green-800"
                              : leave.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : ""
                          }
                        >
                          {leave.status}
                        </Badge>
                      </dd>
                    </div>
                  </dl>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center">
            <Alert>
              <AlertTitle>
                <div className="flex items-center justify-center">
                  <SearchX className="mr-2 h-4 w-4 text-destructive" />
                  <span className="font-semibold text-destructive">No Leave Request Found</span>
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
