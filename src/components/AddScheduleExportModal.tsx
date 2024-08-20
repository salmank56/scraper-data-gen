import React, { useState, useRef } from "react";
import { Task, useTaskStore } from "../hooks/useTaskStore";

interface Log {
  message: string;
  color: string;
}

interface AddScheduledExportProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (exportData: ExportData) => void;
  onLogUpdate: (log: Log) => void;
  resetLogs: () => void;
}

interface ExportData {
  csvFile: File | null;
  sector: string;
}

const AddScheduledExport: React.FC<AddScheduledExportProps> = ({
  isOpen,
  onClose,
  onLogUpdate,
  resetLogs,
}) => {
  const initialExportData: ExportData = {
    csvFile: null,
    sector: "",
  };

  const [exportData, setExportData] = useState<ExportData>(initialExportData);

  const handleSectorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExportData((prev) => ({ ...prev, sector: e.target.value }));
  };

  const addTask = useTaskStore((state) => state.addTask);
  const updateTask = useTaskStore((state) => state.updateTask);

  const [isUploading, setIsUploading] = useState(false);
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;

    setExportData((prev) => ({ ...prev, csvFile: file }));
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("details", exportData.sector);

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/input/`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed.");
      }

      alert("File uploaded successfully!");
      setIsFileUploaded(true);
    } catch (error) {
      alert("Upload failed. Please try again.");
      setExportData((prev) => ({ ...prev, csvFile: null }));
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setIsFileUploaded(false);
    } finally {
      setIsUploading(false);
    }
  };

  const resetForm = () => {
    setExportData(initialExportData);
    setIsFileUploaded(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFileUploaded) return;

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
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/run`, {
        method: "POST",
      });

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

          // Adjusted regex to avoid splitting on mid-log timestamps
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

      alert("Process Completed");
      resetForm();
    } catch (error) {
      console.log(error);

      updateTask(newTask.id, {
        state: "Failed",
        lastRunTime: new Date().toLocaleString(),
      });
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
              <option value={"other"}>Other</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              CSV File:
            </label>
            <div className="flex items-center mt-1">
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
                id="csvFile"
                accept=".csv"
                ref={fileInputRef}
                disabled={!exportData.sector} // Disable file input if no sector is selected
              />
              <label
                htmlFor="csvFile"
                className={`px-3 py-2 text-sm font-medium leading-4 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  !exportData.sector ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Choose file
              </label>
              <span className="ml-3 text-sm text-gray-500">
                {exportData.csvFile
                  ? exportData.csvFile.name
                  : "No file chosen"}
              </span>
              {isUploading && (
                <svg
                  className="w-5 h-5 ml-3 text-gray-500 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
              )}
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
                !isFileUploaded
                  ? "bg-tertiary/60"
                  : "bg-tertiary/90 hover:bg-tertiary "
              } px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
              disabled={!isFileUploaded}
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
