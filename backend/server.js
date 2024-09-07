const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./model/Todo.js");
const { PORT, MONGODB_URL } = require("./config.js");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log("MongoDB is connected");
      console.log("Running on port " + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// Read
app.get("/get", (req, res) => {
  TodoModel.find()
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

// Add
app.post("/add", (req, res) => {
  const task = req.body.task;

  TodoModel.create({ task: task })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});

// Update
app.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body; // Extract the task from request body

  TodoModel.findByIdAndUpdate(id, { task: task }, { new: true }) // Provide the update object and options
    .then((result) => res.json(result))
    .catch((error) => res.status(500).json({ error: "Error updating todo", message: error.message }));
});

// Delete
app.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  TodoModel.findByIdAndDelete({ _id: id })
    .then((result) => res.json(result))
    .catch((error) => res.json(error));
});
