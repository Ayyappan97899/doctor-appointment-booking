/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCalendarContext } from "@/context/CalendarContext";
import dayjs from "dayjs";
import EventListModal from "./EventListModal";
import { useState } from "react";
import { truncate } from "@/utils/stringUtils";

export default function DayCell({
  day,
  events,
  currentMonth,
  onClick,
}: {
  day: dayjs.Dayjs;
  events: any[];
  currentMonth: dayjs.Dayjs;
  onClick: (dateStr: string) => void;
}) {
  const dateStr = day.format("YYYY-MM-DD");
  const isCurrentMonth = day.month() === currentMonth.month();
  const isToday = day.isToday();

  const { setForm, setSelectedEvent, setSelectedDate, setShowModal } =
    useCalendarContext();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSelectEvent = (event: any) => {
    const formattedDate = dayjs(event.date).format("YYYY-MM-DD");
    const formattedTime = dayjs(event.date).format("HH:mm");
    setSelectedDate(formattedDate);
    setShowModal(true);
    setSelectedEvent(event.id);
    setForm({ title: event.title, time: formattedTime });
  };

  return (
    <div
      key={day.toString()}
      onClick={() => onClick(dateStr)}
      className={`cursor-pointer h-28 sm:h-32 p-2 text-xs sm:text-sm flex flex-col justify-between bg-white hover:bg-blue-50 transition  ${
        !isCurrentMonth ? "bg-gray-50 text-gray-400" : ""
      }`}
    >
      <div className="text-right text-[10px] sm:text-xs font-medium">
        <span
          className={`inline-block px-1.5 py-0.5 rounded-full ${
            isToday ? "bg-red-500 text-white" : ""
          }`}
        >
          {day.date()}
        </span>
      </div>
      <div className="space-y-1 overflow-hidden">
        {events.slice(0, 1).map((event) => (
          <div
            key={event.id}
            className="truncate text-[10px] sm:text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full w-fit max-w-full"
            onClick={(e) => {
              e.stopPropagation();
              handleSelectEvent(event);
            }}
          >
            {event.url ? (
              <a
                href={event.url}
                target="_blank"
                rel="noopener noreferrer"
                title={event.url}
                className="block truncate hover:underline"
              >
                {truncate(event.title, 10)}
              </a>
            ) : (
              <span title={event.title} className="block truncate">
                {truncate(event.title, 10)}
              </span>
            )}
          </div>
        ))}
        {events.length > 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsModalOpen(true);
            }}
            className="text-[10px] sm:text-xs text-blue-600 hover:underline px-2 py-0.5 rounded transition-colors duration-200"
          >
            + {events.length - 1} more
          </button>
        )}
      </div>

      <EventListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        events={events}
        onSelect={handleSelectEvent}
      />
    </div>
  );
}
