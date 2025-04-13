"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type EventType = {
  id: string;
  title: string;
  time?: string;
  date: string;
  url?: string;
};

type FormType = {
  title: string;
  time: string;
};

type CalendarContextType = {
  events: EventType[];
  setEvents: React.Dispatch<React.SetStateAction<EventType[]>>;
  selectedEvent: string | null;
  setSelectedEvent: React.Dispatch<React.SetStateAction<string | null>>;
  selectedDate: string | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>;
  form: FormType;
  setForm: React.Dispatch<React.SetStateAction<FormType>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CalendarContext = createContext<CalendarContextType | undefined>(
  undefined
);

export function CalendarProvider({ children }: { children: ReactNode }) {
  const [events, setEvents] = useState<EventType[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [form, setForm] = useState<FormType>({ title: "", time: "" });
  const [showModal, setShowModal] = useState(false);

  return (
    <CalendarContext.Provider
      value={{
        events,
        setEvents,
        selectedEvent,
        setSelectedEvent,
        selectedDate,
        setSelectedDate,
        form,
        setForm,
        showModal,
        setShowModal,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

export function useCalendarContext() {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error(
      "useCalendarContext must be used within a CalendarProvider"
    );
  }
  return context;
}
