import React from 'react';
import deleteIcon from '../assets/delete-icon.png';

function CompleteTasks({ completedTasks, handleDelete }) {
  return (
    <div className="min-h-screen flex-1 flex items-center justify-center">
      <div className="w-full max-w-md mx-auto bg-green-100 flex flex-col items-center justify-center rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">Completed Tasks</h2>
        <ul className="w-full">
          
            <li  className="flex justify-between items-center w-full bg-green-200 p-2 mb-2 rounded">
              <span className="break-words">Test-1</span>
              <button onClick={() => handleDelete(index)}>
                <img src={deleteIcon} alt="Delete" className="w-6 h-6" />
              </button>
            </li>
        
        </ul>
      </div>
    </div>
  );
}

export default CompleteTasks;
