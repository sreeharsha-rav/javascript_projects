import { navigateTo } from "../main";
import "./auth.css";

// API endpoints
const USER_API = "http://localhost:5000/api/user";
const AUTH_TOKEN = "taskify_auth_token";

// Auth template HTML
const authTemplate = `
  <div class="auth-container">
      <div class="tabs">
          <button class="tab-btn active" data-tab="login">Login</button>
          <button class="tab-btn" data-tab="register">Register</button>
      </div>

      <form id="loginForm" class="auth-form">
          <h2>Login</h2>
          <div class="form-group">
              <input
                  type="email"
                  id="loginEmail"
                  placeholder="Email"
                  required
              />
          </div>
          <div class="form-group">
              <input
                  type="password"
                  id="loginPassword"
                  placeholder="Password"
                  required
              />
          </div>
          <button type="submit" class="auth-btn">Login</button>
      </form>

      <form id="registerForm" class="auth-form hidden">
          <h2>Register</h2>
          <div class="form-group">
              <input
                  type="email"
                  id="registerEmail"
                  placeholder="Email"
                  required
              />
          </div>
          <div class="form-group">
              <input
                  type="password"
                  id="registerPassword"
                  placeholder="Password"
                  required
              />
          </div>
          <button type="submit" class="auth-btn">Register</button>
      </form>
  </div>
  `;

export default function renderAuth() {
  const app = document.getElementById("app");
  app.innerHTML = authTemplate;

  // DOM Elements
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const tabButtons = document.querySelectorAll(".tab-btn");

  // Tab switching functionality
  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");

      // Show corresponding form
      const formToShow = button.getAttribute("data-tab");
      loginForm.classList.toggle("hidden", formToShow !== "login");
      registerForm.classList.toggle("hidden", formToShow !== "register");

      // Clear any existing messages
      clearMessages();
    });
  });

  // Registration handling
  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearMessages();

    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;

    try {
      const response = await fetch(`${USER_API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Show success message and switch to login tab
      showSuccess(registerForm, "Registration successful! Please login.");
      setTimeout(() => {
        document.querySelector('[data-tab="login"]').click();
      }, 1500);
    } catch (error) {
      showError(registerForm, error.message);
    }
  });

  // Login handling
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    clearMessages();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const response = await fetch(`${USER_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store the JWT token
      localStorage.setItem(AUTH_TOKEN, data.token);

      // Redirect to todo app
      navigateTo("todo");
    } catch (error) {
      showError(loginForm, error.message);
    }
  });
}

// Helper function to show error messages
function showError(form, message) {
  clearMessages();
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.textContent = message;
  form.appendChild(errorDiv);
}

// Helper function to show success messages
function showSuccess(form, message) {
  clearMessages();
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.textContent = message;
  form.appendChild(successDiv);
}

// Helper function to clear all messages
function clearMessages() {
  document
    .querySelectorAll(".error-message, .success-message")
    .forEach((el) => el.remove());
}
