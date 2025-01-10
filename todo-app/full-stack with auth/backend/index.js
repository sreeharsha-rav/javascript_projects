const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./db");
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");
const userMiddleware = require("./middleware/user");

dotenv.config();

const app = express();

// middlewares
app.use(
  cors({
    origin: ["http://localhost:5173"], // Replace with your frontend URL (typical Vite default port)
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.use(express.json());

// routes
app.get("/healthy", (req, res) => res.send("I am Healthy"));
app.use("/api/user", userRoutes);
app.use("/api/todos", userMiddleware, todoRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// database connection and server start
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
