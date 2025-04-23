import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import AppContextProvider from "./context/context.jsx";
import "./index.css";

const rootElement = document.getElementById("root");

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode> // Optional: Remove StrictMode for production if needed
);

