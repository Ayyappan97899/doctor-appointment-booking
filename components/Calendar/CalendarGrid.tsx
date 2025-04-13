import dayjs from "dayjs";
import DayCell from "./DayCell";
import { getEventsForDate } from "@/utils/calendarUtils";

export default function CalendarGrid({
  days,
  currentMonth,
  allEvents,
  onDayClick,
}: {
  days: dayjs.Dayjs[];
  currentMonth: dayjs.Dayjs;
  allEvents: any[];
  onDayClick: (dateStr: string) => void;
}) {
  return (
    <>
      <div className="grid grid-cols-7 text-center text-sm font-medium text-gray-500 border-b mb-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="py-2 uppercase tracking-wide">
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-[1px] bg-gray-200 rounded-lg overflow-hidden">
        {days.map((day) => (
          <DayCell
            key={day.toString()}
            day={day}
            events={getEventsForDate(allEvents, day.format("YYYY-MM-DD"))}
            currentMonth={currentMonth}
            onClick={onDayClick}
          />
        ))}
      </div>
    </>
  );
}
