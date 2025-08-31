import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App/globals.css";
import IdleGameInterface from "./app/page";
import IdleGameInterface2 from "./app/page2";
import { BrowserRouter, Route, Routes } from "react-router";
import IdleGameInterface3 from "./app/Layout/idleGameInterface";
import IdleGameInterface4 from "./app/page3";
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/1" element={<IdleGameInterface/>} />
        <Route path="/2" element={<IdleGameInterface2/>} />
        <Route path="/3" element={<IdleGameInterface3/>} />
        <Route path="/4" element={<IdleGameInterface4/>} />
    </Routes>
    </BrowserRouter>
    {/* <App /> */}
    {/* <IdleGameInterface2 /> */}
  </StrictMode>
);
4