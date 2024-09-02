import React from "react";
import { Button } from "@/components/ui/button";
import TasksTable from "../components/TasksTable";
import AddDataGenTaskModal from "../components/AddDataGenTaskModal";

const DataGenHome: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="mb-2 text-2xl font-bold">Home</h1>
      <p className="mb-4 text-gray-600">
        Manage and create scheduled tasks for generating data exports.
      </p>
      <div className="flex items-center gap-4 mb-4">
        <AddDataGenTaskModal />
        <Button>Edit Inputs</Button>
      </div>
      <TasksTable />
    </div>
  );
};

export default DataGenHome;
