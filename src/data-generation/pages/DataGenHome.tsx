import React from "react";
import { Button } from "@/components/ui/button";
import TasksTable from "../components/TasksTable";

const DataGenHome: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold">Home</h1>
      <p className="mb-4 text-gray-600">
        Manage and create scheduled tasks for generating data exports.
      </p>
      <div className="flex items-center gap-4 mb-4">
        <Button className="flex items-center gap-2 px-4 py-2 mr-2 text-white bg-teal-600 rounded">
          New Task
        </Button>
        <Button>Edit Inputs</Button>
      </div>
      <TasksTable />
    </div>
  );
};

export default DataGenHome;
