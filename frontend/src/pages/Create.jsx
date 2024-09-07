import React, { useState } from "react";
import axios from "axios";

const Create = ({ onTodoAdded }) => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    axios
      .post("http://localhost:3000/add", { task: task })
      .then((result) => {
        console.log(result);
        setTask(""); // Clear input after adding
        onTodoAdded(); // Notify parent component to re-fetch todos
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  return (
    <>
      <input
        type="text"
        className="border"
        value={task}
        onChange={(event) => setTask(event.target.value)}
        name="input"
      />
      <button type="button" className="border" onClick={handleAdd}>
        Add
      </button>
    </>
  );
};

export default Create;
