import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App/globals.css";
import IdleGameInterface from "./app/page";
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* <App /> */}
    <IdleGameInterface />
  </StrictMode>
);
