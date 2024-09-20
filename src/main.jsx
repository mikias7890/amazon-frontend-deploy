import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Dataprovider } from "./Dataprovider/Dataprovider.jsx";
import { initialState, reducer } from "./Utility/reducer.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Dataprovider reducer={reducer} initialState={initialState}>
      <App />
    </Dataprovider>
  </StrictMode>
);
