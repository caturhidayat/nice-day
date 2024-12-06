import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default async function OvertimeCard() {
  return (
    <Card className="mb-4 cursor-pointer">
      <CardHeader>
        <h1 className="text-md font-bold">Request No :</h1>
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
                Overtime
              </dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Start Date</dt>
              <dd className="text-gray-700 sm:col-span-2">placeholder</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">End Date</dt>
              <dd className="text-gray-700 sm:col-span-2">placeholder</dd>
            </div>

            <div className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-3 sm:gap-4">
              <dt className="font-medium text-gray-900">Reason</dt>
              <dd className="text-gray-700 sm:col-span-2">placeholder</dd>
            </div>
          </dl>
        </div>
      </CardContent>
    </Card>
  );
}
