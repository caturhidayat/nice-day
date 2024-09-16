export interface AttendanceResponse {
  id: string;
  employeeId: string;
  attendanceDate: Date;
  checkInTime?: Date;
  checkOutTime?: Date;
  checkInPhotoUrl?: string;
  checkOutPhotoUrl?: string;
  inLatitude?: number;
  inLongitude?: number;
  outLatitude?: number;
  outLongitude?: number;
  isLate?: boolean;
  status: AttendanceStatus;
  shiftId?: string;
}

export interface AttendanceContextValue {
  attendance: any[];
  setAttendance: () => void;
  removeAttendance: () => void;
  updateAttendance: () => void;
}

enum AttendanceStatus {
  PRESENT,
  ABSENT,
  LATE,
  ON_LEAVE,
}
