import React from "react";
import { FaDownload } from "react-icons/fa";

interface Task {
  id: string;
  sector: string;
  lastRunTime: string;
  state: string;
}

interface TasksTableProps {
  tasks: Task[];
  onDownload: (taskId: string) => void;
}

const TasksTable: React.FC<TasksTableProps> = ({ tasks, onDownload }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="text-white bg-gray-700">
          <th className="p-2 text-left">Sector</th>
          <th className="p-2 text-left">Last Run Time (ET)</th>
          <th className="p-2 text-left">State</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task, index) => (
          <tr
            key={task.id}
            className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}
          >
            <td className="p-2">{task.sector}</td>
            <td className="p-2">{task.lastRunTime}</td>
            <td className="p-2">{task.state}</td>
            <td className="p-2">
              <button
                className={`p-2 mr-2 text-white rounded-md ${
                  task.state === "Completed"
                    ? "bg-tertiary"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                onClick={() =>
                  task.state === "Completed" && onDownload(task.id)
                }
                disabled={task.state !== "Completed"}
              >
                <FaDownload />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TasksTable;
