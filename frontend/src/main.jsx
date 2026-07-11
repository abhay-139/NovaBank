import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App.jsx";

import { ToastContainer } from "react-toastify";
import "./styles/theme.css";
import "./styles/globals.css";
import "./styles/auth.css";
import "./styles/dashboard.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <App />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  </StrictMode>
);