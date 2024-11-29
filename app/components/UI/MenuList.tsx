import { Button } from "@/components/ui/button";
import {
  CalendarCheck,
  CircleArrowOutDownRight,
  ClockArrowUp,
} from "lucide-react";
import Link from "next/link";

export default function MenuList() {
  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-3 lg:gap-8 p-4 bg-base-200 px-2">
      <Link href={"/hr/leaves"}>
        <div className="rounded-lg  flex items-center justify-center">
          <ClockArrowUp size={39} className="text-primary" />
        </div>
      </Link>
      <div className="rounded-lg  flex items-center justify-center">
        <CircleArrowOutDownRight size={39} className="text-primary" />
      </div>
      <div className="rounded-lg  flex items-center justify-center">
        <CalendarCheck size={39} className="text-primary" />
      </div>
    </div>
  );
}
