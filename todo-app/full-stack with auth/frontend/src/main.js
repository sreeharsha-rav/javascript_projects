import renderAuth from "./auth/auth";
import renderTodoList from "./todo/todo";

// Function to navigate to different views
export function navigateTo(view) {
  const app = document.getElementById("app");
  app.innerHTML = ""; // Clear the current view

  // Remove the logout button if it exists
  const logoutButton = document.querySelector(".logout-btn");
  if (logoutButton) {
    logoutButton.remove();
  }

  switch (view) {
    case "auth":
      renderAuth();
      break;
    case "todo":
      renderTodoList();
      break;
    default:
      renderAuth();
  }
}

// Initial navigation to the auth view
navigateTo("auth");
