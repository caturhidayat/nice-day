"use client";

import TimeInput from "./TimeInput";

export interface AttendanceRecord {
  id: string;
  userId: string;
  date: string;
  clockIn: string;
  clockOut: string;
}

interface AttendanceDetailsProps {
  attendanceData: AttendanceRecord;
  newClockIn: string;
  newClockOut: string;
  onClockInChange: (value: string) => void;
  onClockOutChange: (value: string) => void;
}

export default function AttendanceCorrectionDetail({
  attendanceData,
  newClockIn,
  newClockOut,
  onClockInChange,
  onClockOutChange,
}: AttendanceDetailsProps) {
  return (
    <div className="">
      <h3 className="text-sm font-medium ">Current Attendance record</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Current Clock In</span>
          <span className="text-sm font-medium">{attendanceData?.clockIn}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">Current Clock Out</span>
          <span className="text-sm font-medium">
            {attendanceData?.clockOut}
          </span>
        </div>
      </div>

      <h3 className="text-sm font-medium">Correction Request</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <TimeInput
          id="correction-clock-in"
          label="Correction Clock In"
          value={newClockIn}
          onChange={onClockInChange}
        />
        <TimeInput
          id="correction-clock-out"
          label="Correction Clock Out"
          value={newClockOut}
          onChange={onClockOutChange}
        />
      </div>

      <div className="mb-4">
        <div>
          <label htmlFor="reason">Reason</label>
          <label className="form-control">
            <textarea
              className="textarea textarea-bordered h-24"
              placeholder="Please provide a detailed explanation for this correction request..."
            ></textarea>
          </label>
        </div>
      </div>

      <div className="flex pb-8">
        <button className="btn bg-polynesian text-white hover:bg-polynesian/90 w-full">
          Submit
        </button>
      </div>
    </div>
  );
}
