import { navigateTo } from "../main";
import "./todo.css";

// Todo template HTML
const todoTemplate = `
  <div class="input-container">
      <input type="text" id="todoInput" placeholder="Enter a new task" />
      <button id="addButton">Add</button>
  </div>
  <div id="todoList"></div>
  `;

const TODO_API = "http://localhost:5000/api/todos";
const AUTH_TOKEN = "taskify_auth_token";

export default function renderTodoList() {
  const app = document.getElementById("app");
  app.innerHTML = todoTemplate;

  // Check if user is logged in
  const token = localStorage.getItem(AUTH_TOKEN);
  if (!token) {
    navigateTo("auth");
    return;
  }

  // Add logout functionality
  const logoutButton = document.createElement("button");
  logoutButton.textContent = "Logout";
  logoutButton.className = "logout-btn";
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem(AUTH_TOKEN);
    navigateTo("auth");
  });
  document.body.insertBefore(logoutButton, document.body.firstChild);

  // Helper function for making authenticated API calls
  async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem(AUTH_TOKEN);
    if (!token) {
      navigateTo("auth");
      return;
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  // Initialize todo state
  const todoState = new Map(); // Create a new Map to store todo items
  let nextId = 1; // keep track of the next id for a new todo item

  // DOM elements
  const todoInput = document.getElementById("todoInput");
  const addButton = document.getElementById("addButton");
  const todoList = document.getElementById("todoList");

  // Fetch todos from the server
  async function fetchTodos() {
    try {
      const response = await fetchWithAuth(TODO_API);
      if (!response.ok) {
        throw new Error("Failed to fetch todos");
      }

      const todos = await response.json();
      todos.forEach((todo) => {
        todoState.set(todo._id, todo);
        const todoItem = createTodoItem(todo);
        todoList.appendChild(todoItem);
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Add a todo item
  const addTodoItem = async (text) => {
    try {
      const response = await fetchWithAuth(TODO_API, {
        method: "POST",
        body: JSON.stringify({ text }),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      const { message, todo } = await response.json();
      todoState.set(todo._id, todo);
      return todo;
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle todo item completion status
  const toggleTodoItem = async (id) => {
    const todo = todoState.get(id);
    if (!todo) return;

    try {
      const response = await fetchWithAuth(`${TODO_API}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to update todo");
      }
      const { message, updatedTodo } = await response.json();
      todoState.set(updatedTodo._id, updatedTodo);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete a todo item
  const deleteTodoItem = async (id) => {
    try {
      const response = await fetchWithAuth(`${TODO_API}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }

      todoState.delete(id);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to create a new todo item DOM element
  function createTodoItem(todo) {
    // Create container for todo item
    const todoItem = document.createElement("div");
    todoItem.className = "todo-item";
    todoItem.setAttribute("id", `todo-${todo.id}`);

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;

    // Create text span
    const todoText = document.createElement("span");
    todoText.textContent = todo.text;
    if (todo.completed) {
      todoText.classList.add("completed");
    }

    // Create delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "×";
    deleteButton.className = "delete-btn";

    // Add event listener for checkbox to toggle completion status
    checkbox.addEventListener("change", async () => {
      await toggleTodoItem(todo._id);
      todoText.classList.toggle("completed");
    });

    // Add event listener for delete button
    deleteButton.addEventListener("click", async () => {
      await deleteTodoItem(todo._id);
      todoItem.remove();
    });

    // Append elements to todo item
    todoItem.appendChild(checkbox);
    todoItem.appendChild(todoText);
    todoItem.appendChild(deleteButton);

    return todoItem;
  }

  // Function to handle input and create new todo item
  async function handleInput() {
    const text = todoInput.value.trim();
    if (text) {
      const todo = await addTodoItem(text);
      const todoItem = createTodoItem(todo);
      todoList.appendChild(todoItem);
      todoInput.value = ""; // Clear input field
    }
  }

  // Event listeners for input field and add button
  addButton.addEventListener("click", handleInput);
  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      handleInput();
    }
  });

  // Fetch todos from the server
  fetchTodos();
}
