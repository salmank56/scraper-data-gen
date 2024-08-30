import { useState } from "react";
import { toast } from "react-toastify";

const EditPrompt = () => {
  const [promptText, setPromptText] = useState("");

  const handlePromptUpdate = async () => {
    if (!promptText) {
      toast.error("Please enter a prompt to update.");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/update_prompt`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt: promptText }),
        }
      );

      if (response.ok) {
        toast.success("Prompt updated successfully!");
      } else {
        toast.error("Failed to update prompt.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while updating the prompt.");
    }
  };

  return (
    <div className="p-4">
      <div className="p-6 mt-4 border border-gray-300 rounded-md shadow-md">
        <h2 className="mb-4 text-xl font-semibold">Edit Prompt</h2>
        <div className="mb-4">
          <label
            className="block mb-1 text-sm font-medium text-gray-700"
            htmlFor="prompt"
          >
            Prompt
          </label>
          <textarea
            id="prompt"
            className="block w-full p-2 mt-1 border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            rows={12}
            value={promptText}
            onChange={(e) => setPromptText(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-2 mt-4 text-white rounded-md bg-tertiary"
          onClick={handlePromptUpdate}
        >
          Update Prompt
        </button>
      </div>
    </div>
  );
};

export default EditPrompt;
