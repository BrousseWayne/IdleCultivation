import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App/globals.css";
import IdleGameInterface from "./app/page";
import IdleGameInterface2 from "./app/page2";
import { BrowserRouter, Route, Routes } from "react-router";
import IdleGameInterface3 from "./app/Layout/idleGameInterface";
import IdleGameInterface4 from "./app/page3";
import IdleCultivationGame5 from "./app/page4";
import IdleCultivationGame2 from "./app/page5";
import IdleCultivationGame7 from "./app/page6";
import IdleCultivationGameWithExploreBroken from "./app/page7";
import IdleCultivationGameWithOtherExplore from "./app/page8";
import IdleCultivationGame10 from "./app/page9";
// import App from './App.tsx'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/1" element={<IdleGameInterface />} />
        <Route path="/2" element={<IdleGameInterface2 />} />
        <Route path="/3" element={<IdleGameInterface3 />} />
        <Route path="/4" element={<IdleGameInterface4 />} />
        <Route path="/5" element={<IdleCultivationGame5 />} />
        <Route path="/6" element={<IdleCultivationGame2 />} />
        <Route path="/7" element={<IdleCultivationGame7 />} />
        <Route path="/8" element={<IdleCultivationGameWithExploreBroken />} />
        <Route path="/9" element={<IdleCultivationGameWithOtherExplore />} />
        <Route path="/10" element={<IdleCultivationGame10 />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
