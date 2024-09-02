import React, { useState, useRef } from "react";
import { Task, useTaskStore } from "../hooks/useTaskStore";
import { toast } from "react-toastify";

interface Log {
  message: string;
  color: string;
}

interface AddScheduledExportProps {
  isOpen: boolean;
  onClose: () => void;
  // onSubmit: (exportData: ExportData) => void;
  onLogUpdate: (log: Log) => void;
  resetLogs: () => void;
}

interface ExportData {
  companyCsv: File | null;
  sector: string;
}

const AddScheduledExport: React.FC<AddScheduledExportProps> = ({
  isOpen,
  onClose,
  onLogUpdate,
  // onSubmit,
  resetLogs,
}) => {
  const initialExportData: ExportData = {
    companyCsv: null,
    sector: "",
  };

  const [exportData, setExportData] = useState<ExportData>(initialExportData);
  const fileInputRefs = {
    companyCsv: useRef<HTMLInputElement>(null),
  };

  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  if (!isOpen) return null;

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof ExportData
  ) => {
    const file = e.target.files ? e.target.files[0] : null;
    setExportData((prev) => ({ ...prev, [field]: file }));
  };

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExportData((prev) => ({ ...prev, sector: e.target.value }));
  };

  const resetForm = () => {
    setExportData(initialExportData);
    Object.values(fileInputRefs).forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!exportData.companyCsv) return;

    const formData = new FormData();
    formData.append("company_file", exportData.companyCsv);
    formData.append("details", exportData.sector);

    const newTask: Task = {
      id: Date.now().toString(),
      sector: exportData.sector,
      lastRunTime: new Date().toLocaleString(),
      state: "Processing",
    };

    addTask(newTask);
    onClose();
    resetLogs();

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/upload_and_run`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error("ReadableStream not supported or empty response body.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let logBuffer = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          logBuffer += decoder.decode(value, { stream: !done });

          const logEntries = logBuffer.split(
            /(?<=\n)(?=\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}[.,]\d{0,3} - [\w.]+ - [A-Z]+ - )/
          );

          logEntries.forEach((entry, index) => {
            if (index === logEntries.length - 1 && !done) {
              logBuffer = entry;
            } else {
              const logMessage = entry.trim();
              if (logMessage) {
                const color = logMessage.includes("ERROR")
                  ? "#FF0000"
                  : logMessage.includes("WARNING")
                  ? "#FFFF00"
                  : logMessage.includes("SUCCESS")
                  ? "#00FF00"
                  : logMessage.includes("DEBUG")
                  ? "#00FFFF"
                  : logMessage.includes("INFO")
                  ? "#FFFFFF"
                  : "#D3D3D3";

                onLogUpdate({ message: logMessage, color });
              }
            }
          });
        }
      }

      updateTask(newTask.id, {
        state: "Completed",
        lastRunTime: new Date().toLocaleString(),
      });

      toast.success("Process Completed");
      resetForm();
    } catch (error) {
      updateTask(newTask.id, {
        state: "Failed",
        lastRunTime: new Date().toLocaleString(),
      });
      toast.error(`Something went wrong! Try again`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg min-w-[28rem] max-w-[28rem]">
        <h2 className="mb-4 text-2xl font-bold">Add Scheduled Export</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Sector:
            </label>
            <select
              name="sector"
              value={exportData.sector}
              onChange={handleSectorChange}
              className="block w-full px-3 py-2 mt-1 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="" disabled>
                Select a sector
              </option>
              <option value={"quantum"}>Quantum</option>
              <option value={"climate"}>Climate</option>
              <option value={"space"}>Space</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Company CSV File:
            </label>
            <div className="flex items-center mt-1">
              <input
                type="file"
                onChange={(e) => handleFileChange(e, "companyCsv")}
                className="hidden"
                id="companyCsvFile"
                accept=".csv"
                ref={fileInputRefs.companyCsv}
                disabled={!exportData.sector}
              />
              <label
                htmlFor="companyCsvFile"
                className={`px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  !exportData.sector ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Choose file
              </label>
              <span className="ml-3 text-sm text-gray-500">
                {exportData.companyCsv
                  ? exportData.companyCsv.name
                  : "No file chosen"}
              </span>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`${
                !exportData.companyCsv
                  ? "bg-tertiary/60"
                  : "bg-tertiary/90 hover:bg-tertiary "
              } px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
              disabled={!exportData.companyCsv}
            >
              Start Export
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScheduledExport;
