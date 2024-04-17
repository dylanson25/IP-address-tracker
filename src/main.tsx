import React from "react";
import ReactDOM from "react-dom/client";
import IpTrackerView from "./map/pages/IpTrackerView";

import "./assets/styles/main.sass";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IpTrackerView />
  </React.StrictMode>
);
