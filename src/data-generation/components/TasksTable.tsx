import { FaDownload } from "react-icons/fa";
import { Edit, Trash } from "lucide-react";

const tasks = [
  {
    sector: "Space",
    dataModule: "Management Change",
    exportFrequency: "One Time",
    lastRunTime: "2024-08-31 at 01:53:00",
    state: "Completed (One-time)",
  },
  {
    sector: "Space",
    dataModule: "Funding Round",
    exportFrequency: "One Time",
    lastRunTime: "2024-08-31 at 01:50:00",
    state: "Completed (One-time)",
  },
  {
    sector: "Space",
    dataModule: "Funding Round",
    exportFrequency: "One Time",
    lastRunTime: "2024-08-31 at 01:48:00",
    state: "Failed: No Relevant Data",
  },
  {
    sector: "Climate",
    dataModule: "Partnership",
    exportFrequency: "One Time",
    lastRunTime: "2024-08-31 at 01:45:00",
    state: "Completed (One-time)",
  },
  {
    sector: "Metaverse",
    dataModule: "Partnership",
    exportFrequency: "One Time",
    lastRunTime: "2024-08-31 at 01:44:00",
    state: "Completed (One-time)",
  },
  {
    sector: "Quantum",
    dataModule: "Partnership",
    exportFrequency: "One Time",
    lastRunTime: "2024-08-31 at 01:42:00",
    state: "Completed (One-time)",
  },
  {
    sector: "Space",
    dataModule: "Partnership",
    exportFrequency: "One Time",
    lastRunTime: "2024-08-31 at 01:40:00",
    state: "Completed (One-time)",
  },
];

const TasksTable = () => {
  const onDownload = (taskId: string) => {
    console.log(`Downloading task with ID: ${taskId}`);
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-white bg-gray-700">
          <th className="p-2 text-left">Sector</th>
          <th className="p-2 text-left">Data Module</th>
          <th className="p-2 text-left">Export Frequency</th>
          <th className="p-2 text-left">Last Run Time (ET)</th>
          <th className="p-2 text-left">State</th>
          <th className="p-2 text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr
            key={index}
            className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
          >
            <td className="p-2">{task.sector}</td>
            <td className="p-2">{task.dataModule}</td>
            <td className="p-2">{task.exportFrequency}</td>
            <td className="p-2">{task.lastRunTime}</td>
            <td className="p-2">{task.state}</td>
            <td className="p-2 space-x-2 text-right">
              <button className="p-1 text-blue-500 hover:text-blue-700">
                <Edit size={16} />
              </button>
              <button className="p-1 text-red-500 hover:text-red-700">
                <Trash size={16} />
              </button>
              <button
                className={`p-1 ${
                  task.state.startsWith("Completed")
                    ? "text-green-500 hover:text-green-700"
                    : "text-gray-400 cursor-not-allowed"
                }`}
                onClick={() =>
                  task.state.startsWith("Completed") && onDownload(index.toString())
                }
                disabled={!task.state.startsWith("Completed")}
              >
                <FaDownload size={16} />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TasksTable;
