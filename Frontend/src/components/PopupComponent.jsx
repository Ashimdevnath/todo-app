import React, { useEffect, useState } from "react";
import axios from "axios";

function PopupComponent({ PopupCloseF, selectedTodo, Title, labelTitle, labelDescription, submitTitle }) {
  const [title, setTitle] = useState(selectedTodo ? selectedTodo.title : "");
  const [description, setDescription] = useState(selectedTodo ? selectedTodo.description : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedTodo) {
      // Edit existing task
      try {
        await axios.put(`http://localhost:8000/api/tasks/${selectedTodo._id}`, {
          title,
          description,
        });
        PopupCloseF();
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      // Add new task
      try {
        await axios.post("http://localhost:8000/api/tasks", {
          title,
          description,
        });
        PopupCloseF();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-opacity opacity-100 ">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
          <h3 className="text-lg font-semibold text-gray-900">{Title}</h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            onClick={PopupCloseF}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4">
            <div className="col-span-2">
              <label
                htmlFor={labelTitle}
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Title
              </label>
              <input
                type="text"
                name={labelTitle}
                id={labelTitle}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Task title"
                required
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor={labelDescription}
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <textarea
                name={labelDescription}
                id={labelDescription}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Task description"
                rows="3"
                required
              />
            </div>
          </div>
          <div className="flex items-center justify-end">
            <button
              type="submit"
              className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              {submitTitle}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupComponent;
