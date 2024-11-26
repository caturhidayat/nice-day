import {
    CalendarCheck,
    CircleArrowOutDownRight,
    ClockArrowUp,
} from "lucide-react";

export default function MenuList() {
    return (
        <div className="grid grid-cols-3 gap-4 lg:grid-cols-3 lg:gap-8 p-4">
            <div className="h-24 rounded-lg bg-accent flex items-center justify-center">
                <ClockArrowUp size={39} className="text-secondary-content" />
            </div>
            <div className="h-24 rounded-lg bg-accent flex items-center justify-center">
                <CircleArrowOutDownRight
                    size={39}
                    className="text-secondary-content"
                />
            </div>
            <div className="h-24 rounded-lg bg-accent flex items-center justify-center">
                <CalendarCheck size={39} className="text-secondary-content" />
            </div>
        </div>
    );
}
