"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarDays, CalendarIcon, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ProfileProps } from "@/app/lib/action";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import DatePicker from "@/app/components/DatePicker";
import { boolean, string } from "zod";
import AttendanceCorrectionDetail, {
  AttendanceRecord,
} from "@/app/components/AttendanceCorrectionDetail";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function CorrectionForm({ profile }: { profile: ProfileProps }) {
  // Form State
  const [requestDate, setRequestDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");
  const [newClockIn, setNewClockIn] = useState<string>("");
  const [newClockOut, setNewClockOut] = useState<string>("");

  // Application State
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord | null>(
    null
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  return (
    <div>
      <div className="bg-teal-700 p-4">
        <div className="flex items-center">
          <Clock className="mr-3 h-6 w-6 text-white" />
          <h2 className="text-xl font-semibold text-white">
            Attendance Correction
          </h2>
        </div>
        <p className="text-white">
          Request correction for your attendance record
        </p>
        {/* <Alert className="bg-teal-700 text-white border-none">
          <Clock className="mr-3 h-6 w-6 text-white " />
          <AlertTitle>Attendance Correction</AlertTitle>
          <AlertDescription>
            Request correction for your attendance record
          </AlertDescription>
        </Alert> */}
      </div>
      <div className="py-4 px-6">
        <ScrollArea className="h-[calc(100vh-200px)]">
          <form className="space-y-4">
            <div>
              <input
                id="userId"
                name="userId"
                value={profile.id}
                readOnly
                hidden
              />
            </div>
            <div className="space-y-2">
              <DatePicker
                value={requestDate}
                onChange={setRequestDate}
                label="Request Date"
                isLoading={isLoading}
                disabled={isSubmitting}
              />
            </div>

            <AttendanceCorrectionDetail
              attendanceData={attendanceData!}
              newClockIn={newClockIn}
              newClockOut={newClockOut}
              onClockInChange={setNewClockIn}
              onClockOutChange={setNewClockOut}
            />
          </form>
        </ScrollArea>
      </div>
    </div>
  );
}
