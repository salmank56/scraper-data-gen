import React, { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { Edit, Trash } from 'lucide-react';

interface Task {
  id: string;
  sector: string;
  data_module: string;
  export_frequency: string;
  last_run_time: string | null;
  status: string;
}

interface TasksTableProps {
  refreshTrigger: number;
}


const TasksTable: React.FC<TasksTableProps> = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  // const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    fetchTasks();
    // connectWebSocket();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_DATA_GEN_BASE_URL}scheduled_exports`);
      const data = await response.json();
      setTasks(data.scheduled_exports);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  // const connectWebSocket = () => {
  //   const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  //   const wsUrl = `${wsProtocol}//${import.meta.env.VITE_DATA_GEN_BASE_URL.replace(/^https?:\/\//, '')}ws`;
    
  //   console.log('Attempting to connect WebSocket to:', wsUrl);

  //   const ws = new WebSocket(wsUrl);
  //   setSocket(ws);

  //   ws.onopen = () => {
  //     console.log('WebSocket connected successfully');
  //   };

  //   ws.onmessage = (event) => {
  //     const data = JSON.parse(event.data);
  //     if (data.type === 'task_update') {
  //       setTasks((prevTasks) =>
  //         prevTasks.map((task) => (task.id === data.task.id ? data.task : task))
  //       );
  //     }
  //   };

  //   ws.onclose = (event) => {
  //     console.log('WebSocket closed:', event);
  //     // Attempt to reconnect after a delay
  //     setTimeout(connectWebSocket, 5000);
  //   };

  //   ws.onerror = (error) => {
  //     console.error('WebSocket error:', error);
  //   };
  // };

  const onDownload = (taskId: string) => {
    fetch(`${import.meta.env.VITE_DATA_GEN_BASE_URL}completed_export_csv_files/${taskId}`)
      .then(response => {
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No data available for this query.');
          }
          throw new Error('An error occurred while fetching the file.');
        }
        return response.json();
      })
      .then(data => {
        const s3Url = data.s3;
        if (!s3Url) {
          throw new Error('Invalid S3 URL received from the server.');
        }
        window.open(s3Url, '_blank');
      })
      .catch(error => {
        console.error('Download error:', error);
        alert(error.message);
      });
  };

  const handleEdit = (taskId: string) => {
    console.log(`Editing task with ID: ${taskId}`);
  };

  const handleDelete = (taskId: string) => {
    if (confirm('Are you sure you want to delete this scheduled export?')) {
      fetch(`${import.meta.env.VITE_DATA_GEN_BASE_URL}delete_scheduled_export/${taskId}`, {
        method: 'DELETE',
      })
        .then(response => response.json())
        .then(result => {
          console.log(result.message);
          fetchTasks(); // Refresh the table after deletion
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  };

    useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);


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
          <tr key={task.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
            <td className="p-2">{task.sector}</td>
            <td className="p-2">{task.data_module.replace(/_/g, ' ')}</td>
            <td className="p-2">{task.export_frequency.replace(/_/g, ' ')}</td>
            <td className="p-2">{task.last_run_time || '-'}</td>
            <td className="p-2">{task.status}</td>
            <td className="p-2 space-x-2 text-right">
              <button className="p-1 text-blue-500 hover:text-blue-700" onClick={() => handleEdit(task.id)}>
                <Edit size={16} />
              </button>
              <button className="p-1 text-red-500 hover:text-red-700" onClick={() => handleDelete(task.id)}>
                <Trash size={16} />
              </button>
              <button
                className={`p-1 ${
                  task.status.startsWith('Completed')
                    ? 'text-green-500 hover:text-green-700'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                onClick={() => task.status.startsWith('Completed') && onDownload(task.id)}
                disabled={!task.status.startsWith('Completed')}
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
