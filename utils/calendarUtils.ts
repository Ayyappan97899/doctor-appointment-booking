import dayjs from "dayjs";

export const getEventsForDate = (events: any[], dateStr: string) => {
  return events.filter((event) =>
    event.date ? event.date.startsWith(dateStr) : false
  );
};
