import React, { useState } from 'react';
import TasksTable from '../components/TasksTable';
import AddDataGenTaskModal from '../components/AddDataGenTaskModal';

const DataGenHome: React.FC = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddTask = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Home</h1>
      <p className="mb-4 text-gray-600">
        Manage and create scheduled tasks for generating data exports.
      </p>
      <div className="flex items-center mb-4">
        <AddDataGenTaskModal onAddTask={handleAddTask} />
      </div>
      <TasksTable refreshTrigger={refreshTrigger} />
    </div>
  );
};

export default DataGenHome;
