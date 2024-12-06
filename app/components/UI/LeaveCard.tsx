import { Leaves } from "@/app/lib/action";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export default async function LeaveCard({ leave }: { leave: Leaves }) {
  return (
    <Card className="mb-4 cursor-pointer">
      <CardHeader>
        <h1 className="text-md font-bold">Request No : {leave.id}</h1>
      </CardHeader>
      <CardContent>
        <div className="flow-root">
          <dl className="-my-3 divide-y divide-gray-100 text-sm">
            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Request For</dt>
              <dd className="text-gray-700 sm:col-span-2">Catur Hidayat</dd>
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
                {format(new Date(Number(leave.startDate)), "dd/MM/yyyy")}
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
  );
}
