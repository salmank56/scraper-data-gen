// src/components/EditPrompts.tsx

import React, { useState } from "react";

const EditPrompts: React.FC = () => {
  const [activeTab, setActiveTab] = useState("edit");

  return (
    <div className="p-4">
      <div className="border-b border-gray-200 mb-4 w-full">
        <nav className="flex space-x-8 w-full">
          <button
            className={`px-4 py-2 border-x border-t border-gray-400 font-medium text-md w-full ${
              activeTab === "edit"
                ? "text-tertiary bg-white border-b-[3px] border-b-tertiary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("edit")}
          >
            Edit Prompts
          </button>
          <button
            className={`p-4 border-x border-t border-gray-400  font-medium text-md w-full ${
              activeTab === "queries"
                ? "text-tertiary border-b-[3px] bg-white border-b-tertiary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("queries")}
          >
            Perigon Queries
          </button>
        </nav>
      </div>

      {activeTab === "edit" && (
        <div className="shadow-md border border-gray-300 rounded-md p-6 mt-4">
          <h2 className="text-xl font-semibold mb-4">Edit Prompts</h2>
          <div className="mb-4 ">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="module"
            >
              Select Module
            </label>
            <select
              id="module"
              className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            >
              <option>Partnership</option>
              <option>Funding Round</option>
            </select>
          </div>
          <div className="bg-white p-4">
            <h3 className="font-semibold text-xl">Partnership</h3>
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="prompt"
              >
                Prompt
              </label>
              <textarea
                id="prompt"
                className="block p-2 w-full mt-1 bg-[#F7F7F7] border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                rows={6}
              >
                Extract partnership details from the article.
              </textarea>
            </div>
          </div>
          <button className="mt-4 bg-tertiary text-white px-4 py-2 rounded-md">
            Update Prompts
          </button>
        </div>
      )}

      {activeTab === "queries" && (
        <div className="shadow-md border border-gray-300 rounded-md p-6 mt-4">
          <h2 className="text-xl font-semibold mb-4">Perigon Queries</h2>
          <div className="mb-4 flex items-center space-x-4 bg-white p-4 shadow-lg rounded-md">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="data-module"
              >
                Data Module
              </label>
              <select
                id="data-module"
                className="block p-2 min-w-48 w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option>Partnership</option>
                <option>Other</option>
              </select>
            </div>
            <div className="w-full">
              <textarea
                rows={5}
                className="block overflow-y-scroll p-2 w-full mt-1 bg-[#F7F7F7] border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>
          <div className="mb-4 flex items-center space-x-4 bg-white p-4 shadow-lg rounded-md">
            <div>
              <label
                className="block text-sm font-medium text-gray-700 mb-1"
                htmlFor="data-module"
              >
                Sector
              </label>
              <select
                id="data-module"
                className="block p-2 min-w-48 w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option>Quantum</option>
                <option>Other</option>
              </select>
            </div>
            <div className="w-full">
              <textarea
                rows={5}
                className="block overflow-y-scroll p-2 w-full mt-1 bg-[#F7F7F7] border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              />
            </div>
          </div>

          <button className="mt-4 bg-tertiary text-white px-4 py-2 rounded-md">
            Update Queries
          </button>
        </div>
      )}
    </div>
  );
};

export default EditPrompts;
