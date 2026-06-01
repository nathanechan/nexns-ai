import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ProductStateProvider } from "./state/productState";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductStateProvider>
        <App />
      </ProductStateProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
