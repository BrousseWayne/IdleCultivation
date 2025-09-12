// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app/globals.css";
import { BrowserRouter, Route, Routes } from "react-router";
import IdleCultivation from "./app/idleCultivation";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <BrowserRouter>
    <Routes>
      <Route path="/10" element={<IdleCultivation />} />
    </Routes>
  </BrowserRouter>
  // </StrictMode>
);
