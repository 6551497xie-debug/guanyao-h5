import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/global.css";
import "./styles/guanyao-visual-system.css";
import "./styles/xinmai-visual-life-system.css";
import "./styles/xinmai-life-reflection-refinement.css";
import "./styles/xinmai-inner-view-three-approach.css";
import "./styles/xinmai-inner-view-choice-continuity.css";
import "./styles/xinmai-choice-breath-hold-response.css";
import "./styles/xinmai-choice-crystal-life-trace.css";
import "./styles/xinmai-choice-life-trace-reality-continuity.css";
import "./styles/xinmai-continuous-scene.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
