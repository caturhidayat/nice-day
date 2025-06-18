import React, { useState } from "react";
import { format } from "date-fns";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  label: string;
  isLoading?: boolean;
  disabled?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  label,
  isLoading = false,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    value ? new Date(value) : undefined
  );

  const handleSave = () => {
    if (selectedDate) {
      onChange(format(selectedDate, "yyyy-MM-dd"));
      setIsOpen(false);
    }
  };

  const formattedDate = value ? format(new Date(value), "PPP") : "Select date";

  return (
    <div className="relative mb-4">
      <label
        htmlFor="date-picker"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div
        className={`
          relative cursor-pointer
          block w-full px-4 py-2.5 rounded-lg border
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"}
          ${
            isLoading
              ? "border-blue-300 shadow-sm"
              : "border-gray-300 shadow-sm hover:border-blue-500"
          }
          transition-all duration-200 ease-in-out
        `}
        onClick={() => !disabled && !isLoading && setIsOpen(true)}
      >
        <div className="flex items-center justify-between">
          <span className={!value ? "text-gray-500" : ""}>{formattedDate}</span>
          <CalendarIcon className="h-5 w-5 text-gray-400" />
        </div>
      </div>

      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Select Date</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              initialFocus
            />
          </div>
          <DrawerFooter>
            <button className="btn bg-polynesian text-white hover:bg-polynesian/90" onClick={handleSave} disabled={!selectedDate}>
              Save Date
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="btn btn-outline"
            >
              Cancel
            </button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <svg
            className="animate-spin h-5 w-5 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
