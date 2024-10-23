import React from "react";
import EditIcon from "../assets/edit-Icon.png";
import DeleteIcon from "../assets/delete-icon.png";
import CompleteIcon from "../assets/complete-icon.png";

const TaskBar = ({ setShowSettings, handleEdit, handleDelete, handleComplete, handlePriority, todo, PopupCloseF }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md transform transition-opacity opacity-100">
        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
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

        <div className="flex flex-col p-2">
          <button
            className="flex items-center p-2 hover:bg-gray-300 rounded"
            onClick={() => {
              handleEdit(todo);
              setShowSettings(null);
            }}
          >
            <img src={EditIcon} alt="Edit" className="mr-2 w-4 h-4" /> Edit
          </button>
          <button
            className="flex items-center p-2 hover:bg-gray-300 rounded"
            onClick={() => {
              handleComplete(todo._id);
              setShowSettings(null);
            }}
          >
            <img src={CompleteIcon} alt="Complete" className="mr-2 w-4 h-4" /> Complete
          </button>
          <button
            className="flex items-center p-2 hover:bg-gray-300 rounded"
            onClick={() => {
              handlePriority(todo._id);
              setShowSettings(null);
            }}
          >
            <img src={CompleteIcon} alt="Priority" className="mr-2 w-4 h-4" /> Priority
          </button>
          <button
            className="flex items-center p-2 hover:bg-gray-300 rounded"
            onClick={() => {
              handleDelete(todo._id);
              setShowSettings(null);
            }}
          >
            <img src={DeleteIcon} alt="Delete" className="mr-2 w-4 h-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskBar;
