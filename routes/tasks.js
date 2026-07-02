const express = require("express");

const router = express.Router();

// In-memory "database" for tasks
let tasks = [];

// Create a new task
router.post("/", (req, res) => {
  const task = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: req.body.completed || false,
  };
  tasks.push(task);
  res.status(201).json(task);
});

// Read all tasks
router.get("/", (req, res) => {
  res.status(200).json(tasks);
});

// Read a specific task by ID
router.get("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found.");
  res.status(200).json(task);
});

// Update a task by ID
router.put("/:id", (req, res) => {
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send("Task not found.");

  task.title = req.body.title || task.title;
  task.completed =
    req.body.completed !== undefined ? req.body.completed : task.completed;

  res.status(200).json(task);
});

// Delete a task by ID
router.delete("/:id", (req, res) => {
  const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (taskIndex === -1) return res.status(404).send("Task not found.");

  tasks.splice(taskIndex, 1);
  res.status(204).send(); // No content to send back
});

module.exports = router;
