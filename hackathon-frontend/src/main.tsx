import React from "react";
import ReactDOM from "react-dom/client";
import "@mantine/dates/styles.css";
import "@mantine/code-highlight/styles.css";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import { App } from "./app";

// Set up a Router instance

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
