import { useCalendarContext } from "@/context/CalendarContext";
import { useState } from "react";
import DeleteWarning from "../Warning/DeleteWarning";

export default function BookingModal({
  selectedDate,
  form,
  setForm,
  onClose,
  onSave,
  onDelete,
}: {
  selectedDate: string;
  form: { title: string; time: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ title: string; time: string }>
  >;
  onClose: () => void;
  onSave: (isExisting: boolean, id: string | null) => void;
  onDelete: (id: string | null) => void;
}) {
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { selectedEvent } = useCalendarContext();
  const isExisting = !!selectedEvent;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      {isDelete ? (
        <DeleteWarning
          onClose={() => setIsDelete(false)}
          onConfirm={() => {
            onDelete(selectedEvent);
            onClose();
          }}
        />
      ) : (
        <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-2xl relative space-y-4">
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
          <h3 className="text-lg font-semibold text-gray-900">
            {isExisting ? "Edit Appointment" : "Add Appointment"} –{" "}
            {selectedDate}
          </h3>
          <input
            type="text"
            placeholder="Title"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            type="time"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
          <div className="w-full">
            {isExisting ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => onSave(true, selectedEvent)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Update Appointment
                </button>
                <button
                  onClick={() => setIsDelete(true)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ) : (
              <button
                onClick={() => onSave(false, selectedEvent)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Save Appointment
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
