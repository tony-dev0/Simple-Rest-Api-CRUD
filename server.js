// server.js
const express = require("express");
const bodyParser = require("body-parser");
const tasksRoute = require("./routes/tasks");

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/tasks", tasksRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
