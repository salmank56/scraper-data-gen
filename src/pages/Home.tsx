// import React, { useState } from "react";
// import { FaEdit, FaPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import LogDisplay from "../components/LogsDisplay";
// import { useTaskStore } from "../hooks/useTaskStore";
// import TasksTable from "../components/TasksTable";
// import AddScheduledExport from "../components/AddScheduleExportModal";

// interface ExportData {
//   csvFile: File | null;
//   sector: string;
// }

// interface Log {
//   message: string;
//   color: string;
// }

// const Home: React.FC = () => {
//   const tasks = useTaskStore((state) => state.tasks);

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [logs, setLogs] = useState<Log[]>([]);

//   const handleSubmit = (exportData: ExportData) => {
//     console.log(exportData);
//     setIsModalOpen(false);
//   };

//   const handleLogUpdate = (newLog: Log) => {
//     setLogs((prevLogs) => [...prevLogs, newLog]);
//   };

//   const resetLogs = () => {
//     setLogs([]);
//   };

//   return (
//     <div className="relative w-full h-full overflow-hidden ">
//       <h1 className="mb-2 text-2xl font-bold">Home</h1>
//       <p className="mb-4 text-gray-600">
//         Manage and create scheduled tasks for generating data exports.
//       </p>
//       <div className="flex mb-4">
//         <button
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center gap-2 px-4 py-2 mr-2 text-white bg-teal-600 rounded"
//         >
//           <FaPlus /> <span>New Scrapping</span>
//         </button>
//         <Link to={"/edit-prompts"}>
//           <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-200 rounded ">
//             <FaEdit />
//             <span>Edit Inputs</span>
//           </button>
//         </Link>
//         <AddScheduledExport
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           onSubmit={handleSubmit}
//           onLogUpdate={handleLogUpdate}
//           resetLogs={resetLogs}
//         />
//       </div>

//       <TasksTable tasks={tasks} />
//       <LogDisplay logs={logs} />
//     </div>
//   );
// };

// export default Home;

import React, { useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import LogDisplay from "../components/LogsDisplay";
import { useTaskStore } from "../hooks/useTaskStore";
import TasksTable from "../components/TasksTable";
import AddScheduledExport from "../components/AddScheduleExportModal";

interface ExportData {
  csvFile: File | null;
  sector: string;
}

interface Log {
  message: string;
  color: string;
}

const Home: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logs, setLogs] = useState<Log[]>([]);

  const handleSubmit = (exportData: ExportData) => {
    console.log(exportData);
    setIsModalOpen(false);
  };

  const handleLogUpdate = (newLog: Log) => {
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  const resetLogs = () => {
    setLogs([]);
  };

  const handleDownload = async (taskId: string) => {
    try {
      const response = await fetch(
        // `${import.meta.env.VITE_BASE_URL}/output/${taskId}`,
        `${import.meta.env.VITE_BASE_URL}/outputs`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = `export_${taskId}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download the file. Please try again.");
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden ">
      <h1 className="mb-2 text-2xl font-bold">Home</h1>
      <p className="mb-4 text-gray-600">
        Manage and create scheduled tasks for generating data exports.
      </p>
      <div className="flex mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 mr-2 text-white bg-teal-600 rounded"
        >
          <FaPlus /> <span>New Scrapping</span>
        </button>
        <Link to={"/edit-prompts"}>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-200 rounded ">
            <FaEdit />
            <span>Edit Inputs</span>
          </button>
        </Link>
        <AddScheduledExport
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleSubmit}
          onLogUpdate={handleLogUpdate}
          resetLogs={resetLogs}
        />
      </div>

      <TasksTable tasks={tasks} onDownload={handleDownload} />
      <LogDisplay logs={logs} />
    </div>
  );
};

export default Home;
