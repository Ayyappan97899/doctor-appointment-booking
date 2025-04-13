import dayjs from "dayjs";

export default function CalendarHeader({
  currentMonth,
  onPrev,
  onNext,
  onToday,
}: {
  currentMonth: dayjs.Dayjs;
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onPrev}
          className="px-3 py-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
        >
          ←
        </button>
        <button
          onClick={onToday}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Today
        </button>
        <button
          onClick={onNext}
          className="px-3 py-2 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition"
        >
          →
        </button>
      </div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
        {currentMonth.format("MMMM YYYY")}
      </h2>
    </div>
  );
}
