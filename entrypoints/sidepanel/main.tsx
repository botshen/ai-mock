import ReactDOM from "react-dom/client";
import React from "react";
import "../../assets/global.css";
import { App } from "@/entrypoints/sidepanel/App";
const root = ReactDOM.createRoot(document.getElementById("app")!);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
