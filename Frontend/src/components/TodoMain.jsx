import React, { useState, useEffect } from "react";
import axios from "axios";
import todoIcon from "../assets/microsoft-todo.svg";
import setting from "../assets/settings.svg";
import CompleteTasks from "./CompleteTasks";
import PopupComponent from "./PopupComponent";
import TaskBar from "./TaskBar";

function TodoMain() {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showSettings, setShowSettings] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false);

 

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/tasks", { withCredentials: true });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  useEffect(() => {
    fetchTodos();
  }, [ ]);

  // const handleShowModal = (todo) => {
  //   setSelectedTodo(todo);
  //   setShowModal(true);
  // };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/tasks/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
    fetchTodos();
  };

  const handleEdit = (todo) => {
    setSelectedTodo(todo);
    setShowEditPopup(true);
    fetchTodos();
  };

  const handleComplete = async (id) => {
    try {
      const updatedTodo = todos.find((todo) => todo._id === id);
      await axios.put(`http://localhost:8000/api/tasks/${id}`, {
        ...updatedTodo,
        isCompleted: !updatedTodo.isCompleted,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error completing todo:", error);
    }
  };

  const handlePriority = async (id) => {
    try {
      const updatedTodo = todos.find((todo) => todo._id === id);
      const newPriority = updatedTodo.priority === "High" ? "Medium" : "High";
      await axios.put(`http://localhost:8000/api/tasks/${id}`, {
        ...updatedTodo,
        priority: newPriority,
      });
      fetchTodos();
    } catch (error) {
      console.error("Error updating priority:", error);
    }
  };

  const closeEditPopup = () => {
    setShowEditPopup(true);
    setSelectedTodo(null);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex basis-full md:basis-6/12 flex-1 items-center justify-center bg-gray-100 p-4 min">
        <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4 ml-3 text-center flex items-center justify-center">
            To Do{" "}
            <img src={todoIcon} alt="Todo Icon" className="ml-2 h-6 w-6" />
          </h2>
          <button
            onClick={() => setShowModal(true)}
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mx-auto mt-4"
            type="button"
          >
            Add New Task
          </button>

          <ul className="mt-4">
            {todos.map((todo) => (
              <li
                key={todo._id}
                className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
              >
                <span>{todo.title}</span>
                <div>
                  <button
                    className="text-white p-1 rounded mr-1 transform transition-transform"
                    onClick={() =>
                      setShowSettings(showSettings === todo._id ? null : todo._id)
                    }
                    style={{
                      transform:
                        showSettings === todo._id
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <img src={setting} alt="Settings" className="w-4 h-4" />
                  </button>
                </div>
                {showSettings === todo._id && (
                  <TaskBar
                    setShowSettings={setShowSettings}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    handleComplete={handleComplete}
                    handlePriority={handlePriority}
                    todo={todo}
                  />
                )}
              </li>
            ))}
          </ul>

          <div className="mt-4">
            <p>Your remaining todos: {todos.length}</p>
          </div>
        </div>

        {showModal && (
          <PopupComponent
            PopupCloseF={handleCloseModal}
            selectedTodo={selectedTodo}
            Title="Add New Task"
            labelTitle="Title"
            labelDescription="Description"
            submitTitle="Add Task"
          />
        )}

        {showEditPopup && selectedTodo && (
          <PopupComponent
            PopupCloseF={closeEditPopup}
            selectedTodo={selectedTodo}
            Title="Edit Task"
            labelTitle="Edit Title"
            labelDescription="Edit Description"
            submitTitle="Save Task"
          />
        )}
      </div>
      <div className="basis-full md:basis-6/12">
        <CompleteTasks />
      </div>
    </div>
  );
}

export default TodoMain;
