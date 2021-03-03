import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { UserLocationProvider } from "./contexts/UserLocation";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <UserLocationProvider>
      <App />
    </UserLocationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
