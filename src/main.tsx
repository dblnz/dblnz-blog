import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from "./App";

// Create a global function that the GitHub Pages redirect script can call
// to force React Router to re-evaluate the current route
declare global {
  interface Window {
    routerForceUpdate: () => void;
  }
}

// Create the root once and store it for potential updates
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Add global handler for GitHub Pages redirects to force route updates
window.routerForceUpdate = () => {
  root.render(
    <React.StrictMode>
      <App key={Date.now()} />
    </React.StrictMode>
  );
};
