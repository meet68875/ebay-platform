import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./global.css";
import { Provider } from "react-redux";
import { store } from "./apis/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
   <Provider store={store}>
    {/* <React.StrictMode> */}
      <App />
    {/* </React.StrictMode> */}
    </Provider>
  </BrowserRouter>
);
