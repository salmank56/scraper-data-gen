import React, { useState } from "react";
import { toast } from "react-toastify";

const EditTaxonomy: React.FC = () => {
  const [activeTab, setActiveTab] = useState("edit");
  const [selectedModule, setSelectedModule] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!selectedModule || !file) {
      alert("Please select a module and upload a CSV file.");
      return;
    }

    const formData = new FormData();
    formData.append("details", selectedModule);
    formData.append("file", file);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/edit_taxonomy`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        toast.success("Taxonomy updated successfully!");
      } else {
        toast.error("Failed to update taxonomy.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating taxonomy.");
    }
  };

  return (
    <div className="p-4">
      <div className="w-full mb-4 border-b border-gray-200">
        <nav className="flex w-full space-x-8">
          <button
            className={`px-4 py-2 border-x border-t border-gray-400 font-medium text-md w-full ${
              activeTab === "edit"
                ? "text-tertiary bg-white border-b-[3px] border-b-tertiary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("edit")}
          >
            Edit Taxonomy
          </button>
        </nav>
      </div>

      <div className="p-6 mt-4 border border-gray-300 rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Customize Taxonomy</h2>
        <div className="mb-4">
          <label
            className="block mb-1 text-sm font-medium text-gray-700"
            htmlFor="module"
          >
            Select Scope
          </label>
          <select
            id="module"
            className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
          >
            <option value="" disabled>
              Select a module
            </option>
            <option value={"quantum"}>Quantum</option>
            <option value={"climate"}>Climate</option>
            <option value={"space"}>Space</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block mb-1 text-sm font-medium text-gray-700"
            htmlFor="file"
          >
            Upload CSV File
          </label>
          <input
            type="file"
            id="file"
            accept=".csv"
            className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            onChange={handleFileChange}
          />
        </div>
        <button
          className="px-4 py-2 mt-4 text-white rounded-md bg-tertiary"
          onClick={handleSubmit}
        >
          Update Taxonomy
        </button>
      </div>
    </div>
  );
};

export default EditTaxonomy;
