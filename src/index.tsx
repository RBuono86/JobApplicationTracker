import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import JobTrackerApp from "./JobTrackerApp"; // This replaces missing './App'

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <JobTrackerApp />
  </React.StrictMode>
);
