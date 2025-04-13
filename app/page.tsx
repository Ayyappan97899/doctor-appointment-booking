"use client";

import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import isToday from "dayjs/plugin/isToday";
import customParseFormat from "dayjs/plugin/customParseFormat";

import CalendarHeader from "@/components/Calendar/CalendarHeader";
import CalendarGrid from "@/components/Calendar/CalendarGrid";
import BookingModal from "@/components/Calendar/BookingModal";
import {
  CalendarProvider,
  useCalendarContext,
} from "@/context/CalendarContext";
import { useState } from "react";

dayjs.extend(weekday);
dayjs.extend(isToday);
dayjs.extend(customParseFormat);

function CalendarContent() {
  const {
    events,
    setEvents,
    setSelectedEvent,
    selectedDate,
    setSelectedDate,
    form,
    setForm,
    showModal,
    setShowModal,
  } = useCalendarContext();

  const [currentMonth, setCurrentMonth] = useState(dayjs());

  const startDate = currentMonth.startOf("month").startOf("week");
  const endDate = currentMonth.endOf("month").endOf("week");
  const days = [];

  let day = startDate;
  while (day.isBefore(endDate)) {
    days.push(day);
    day = day.add(1, "day");
  }

  const handleAddAppointment = (isExisting: boolean, id: string | null) => {
    console.log(isExisting);

    if (!form.title || !form.time || !selectedDate) return;

    const formattedDate = dayjs(selectedDate).format("YYYY-MM-DD");
    const dateTimeString = `${formattedDate}T${form.time}`;

    console.log(selectedDate, "date");

    console.log(form.time, "time");

    if (isExisting) {
      setEvents(
        [...events].map((event) => {
          return event.id === id
            ? {
                ...event,
                title: form.title,
                date: dateTimeString,
              }
            : {
                ...event,
              };
        })
      );
    } else {
      setEvents([
        ...events,
        {
          id: `${Date.now()}`,
          title: form.title,
          date: dateTimeString,
        },
      ]);
    }

    setForm({ title: "", time: "" });
    setSelectedDate("");
    setSelectedEvent("");
    setShowModal(false);
  };

  const handleDeleteAppointment = (id: string | null) => {
    const updatedEvents = [...events];
    const index = updatedEvents.findIndex((event) => event.id === id);

    if (index !== -1) {
      updatedEvents.splice(index, 1); // Remove 1 item at the found index
      setEvents(updatedEvents);
    }
  };

  console.log(events);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <CalendarHeader
        currentMonth={currentMonth}
        onPrev={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        onNext={() => setCurrentMonth(currentMonth.add(1, "month"))}
        onToday={() => setCurrentMonth(dayjs())}
      />
      <CalendarGrid
        days={days}
        currentMonth={currentMonth}
        allEvents={events}
        onDayClick={(date) => {
          const formattedDate = dayjs(date).format("YYYY-MM-DD");
          setSelectedDate(formattedDate);
          setShowModal(true);
        }}
      />
      {showModal && selectedDate && (
        <BookingModal
          selectedDate={selectedDate}
          form={form}
          setForm={setForm}
          onClose={() => {
            setForm({ title: "", time: "" });
            setSelectedDate("");
            setSelectedEvent("");
            setShowModal(false);
          }}
          onSave={handleAddAppointment}
          onDelete={handleDeleteAppointment}
        />
      )}
    </div>
  );
}

export default function CalendarPage() {
  return (
    <CalendarProvider>
      <CalendarContent />
    </CalendarProvider>
  );
}
