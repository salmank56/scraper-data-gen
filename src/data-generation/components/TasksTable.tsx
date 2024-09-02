import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Edit, Trash, Download } from "lucide-react"

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
]

export default function TasksTable() {
  return (
    <Table>
      <TableCaption>A list of scheduled tasks for generating data exports.</TableCaption>
      <TableHeader>
        <TableRow className="!dark:text-white dark:bg-primary hover:dark:bg-primary">
          <TableHead>Sector</TableHead>
          <TableHead>Data Module</TableHead>
          <TableHead>Export Frequency</TableHead>
          <TableHead>Last Run Time (ET)</TableHead>
          <TableHead>State</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.map((task, index) => (
          <TableRow key={index} className={`${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`}>
            <TableCell className="font-medium">{task.sector}</TableCell>
            <TableCell>{task.dataModule}</TableCell>
            <TableCell>{task.exportFrequency}</TableCell>
            <TableCell>{task.lastRunTime}</TableCell>
            <TableCell>{task.state}</TableCell>
            <TableCell className="space-x-2 text-right">
              <button className="text-blue-500 hover:text-blue-700">
                <Edit size={16} />
              </button>
              <button className="text-red-500 hover:text-red-700">
                <Trash size={16} />
              </button>
              <button className="text-green-500 hover:text-green-700">
                <Download size={16} />
              </button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
