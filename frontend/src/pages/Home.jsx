import React, { useEffect, useState } from "react";
import Create from "./Create";
import axios from "axios";

export const Home = () => {
  const [todos, setTodos] = useState([]);
  const [updateInput, setUpdateInput] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/get");
      setTodos(response.data);
    } catch (error) {
      console.log("Error fetching todos:", error);
    }
  };

  const handleTodoAdded = () => {
    fetchTodos(); // Re-fetch todos after adding a new todo
  };

  const handleUpdate = (id) => {
    setSelectedTodoId(id);
    setUpdateInput("");
  };

  const handleUpdateInputChange = (event) => {
    setUpdateInput(event.target.value);
  };

  const handleUpdateSubmit = async () => {
    try {
      await axios.put(`http://localhost:3000/update/${selectedTodoId}`, {
        task: updateInput,
      });
      fetchTodos(); // Re-fetch todos after updating
      setSelectedTodoId(null);
    } catch (error) {
      console.log("Error updating todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/delete/${id}`);
      fetchTodos(); // Re-fetch todos after deleting
    } catch (error) {
      console.log("Error deleting todo:", error);
    }
  };

  return (
    <>
      <h2>Todo List</h2>
      <Create onTodoAdded={handleTodoAdded} />

      {todos.length === 0 ? (
        <div>
          <h2>No record.</h2>
        </div>
      ) : (
        todos.map((todo) => (
          <div
            className="bg-slate-300 w-64 my-2 p-3 flex justify-between"
            key={todo._id}
          >
            {selectedTodoId === todo._id ? (
              <div>
                <input
                  type="text"
                  value={updateInput}
                  onChange={handleUpdateInputChange}
                />
                <button
                  className="bg-green-500 px-2 rounded-sm mx-2"
                  onClick={handleUpdateSubmit}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>{todo.task}</div>
            )}
            <div>
              <button
                className="bg-red-500 px-2 rounded-sm mx-2"
                onClick={() => handleUpdate(todo._id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 px-2 rounded-sm"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};
