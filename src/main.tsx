// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App/globals.css";
import { BrowserRouter, Route, Routes } from "react-router";
import IdleCultivationGame10 from "./app/mockups/page9";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/10" element={<IdleCultivationGame10 />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
