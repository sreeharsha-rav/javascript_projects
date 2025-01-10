const { Router } = require("express");
const { Todo } = require("../db");
const { z } = require("zod");

const todoRouter = Router();

// Zod Validation Schemas
const createTodoSchema = z.object({
  text: z
    .string()
    .min(1, "Todo name is required")
    .max(255, "Todo name cannot exceed 255 characters"),
  completed: z.boolean().default(false),
});

const updateTodoSchema = z.object({
  completed: z.boolean(),
});

// Get all todos for user
todoRouter.get("/", async (req, res) => {
  try {
    const id = req.user.id;
    const todos = await Todo.find({ user: id });
    res.json(todos);
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

// Get todo by id
todoRouter.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.status(200).json(todo);
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

// Create new todo
todoRouter.post("/", async (req, res) => {
  try {
    const { text } = createTodoSchema.parse(req.body);
    const newTodo = await Todo.create({
      text,
      completed: false,
      user: req.user.id,
    });

    res
      .status(201)
      .json({ message: "Todo item created successfully", todo: newTodo });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

// Update todo status
todoRouter.patch("/:id", async (req, res) => {
  try {
    const { completed } = updateTodoSchema.parse(req.body);

    // Find todo by id and update
    const updatedTodo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { completed },
      { new: true },
    );

    // Check if todo exists
    if (!updatedTodo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", updatedTodo });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

// Delete todo
todoRouter.delete("/:id", async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!todo) {
      return res.status(404).json({ error: "Todo not found" });
    }

    res.json({ message: "Todo deleted successfully" });
  } catch (e) {
    res.status(400).json({ message: e.errors });
  }
});

module.exports = todoRouter;
