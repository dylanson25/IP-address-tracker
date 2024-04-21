import "./assets/styles/main.sass";

import React from "react";
import ReactDOM from "react-dom/client";
import IpTrackerView from "./map/pages/IpTrackerView";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <IpTrackerView />
  </React.StrictMode>
);
