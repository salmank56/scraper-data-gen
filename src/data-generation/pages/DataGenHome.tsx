import React from "react";
import TasksTable from "../components/TasksTable";
import AddDataGenTaskModal from "../components/AddDataGenTaskModal";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const DataGenHome: React.FC = () => {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Home</h1>
      <p className="mb-4 text-gray-600">
        Manage and create scheduled tasks for generating data exports.
      </p>
      <div className="flex items-center mb-4">
        <AddDataGenTaskModal />
        <Link to={"/data-gen/edit-task"}>
          <button className="flex items-center gap-2 px-4 py-2 rounded dark:bg-gray-600 dark:text-gray-100 ">
            <FaEdit />
            <span>Edit Taxonomy</span>
          </button>
        </Link>
      </div>
      <TasksTable />
    </div>
  );
};

export default DataGenHome;
