import { useCalendarContext } from "@/context/CalendarContext";
import { useEffect } from "react";

type Event = {
  id: string;
  title: string;
  date: string;
  url?: string;
};

type EventListModalProps = {
  isOpen: boolean;
  onClose: () => void;
  events: Event[];
  onSelect: (event: Event) => void;
};

const EventListModal: React.FC<EventListModalProps> = ({
  isOpen,
  onClose,
  events,
  onSelect,
}) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    } else {
      document.removeEventListener("keydown", handleEsc);
    }
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl transform transition-all scale-100 sm:scale-95"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Events</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {events.map((event) => (
            <div
              key={event.id}
              onClick={() => {
                onSelect(event);
                onClose();
              }}
              className="flex items-center justify-between px-4 py-3 bg-blue-50 rounded-lg hover:bg-blue-100 cursor-pointer transition"
            >
              <div className="flex-1 min-w-0">
                {event.url ? (
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={event.url}
                    className="block text-sm font-medium text-blue-700 truncate"
                  >
                    {event.title}
                  </a>
                ) : (
                  <span
                    title={event.title}
                    className="block text-sm font-medium text-gray-800 truncate"
                  >
                    {event.title}
                  </span>
                )}
              </div>
              <span className="ml-2 text-xs text-gray-500 whitespace-nowrap">
                {new Date(event.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListModal;
