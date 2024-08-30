import React, { useState } from "react";
import { FaGear } from "react-icons/fa6";
import { toast } from "react-toastify";

const CustomizePromptModel: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [promptText, setPromptText] = useState<string>("");

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleSave = async () => {
    if (!promptText.trim()) {
      toast.error("Prompt cannot be empty.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/save_prompt/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: promptText }),
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      toast.success("Prompt saved successfully!");
      closeModal();
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong! Try again.");
    }
  };

  return (
    <div>
      <button
        title="Customize Prompt"
        onClick={openModal}
        className="text-white rounded-md"
      >
        <FaGear size={24} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg min-w-[28rem] max-w-[28rem]">
            <h2 className="mb-4 text-2xl font-bold">Customize Prompt</h2>
            <textarea
              className="w-full p-3 mb-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={6}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              placeholder="Enter your prompt here..."
            />
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={closeModal}
                className="px-4 py-2 mr-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className={`${
                  !promptText.trim()
                    ? "bg-teal-600/60 cursor-not-allowed"
                    : "bg-teal-600 hover:bg-teal-700"
                } px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500`}
                disabled={!promptText.trim()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizePromptModel;
