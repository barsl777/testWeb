import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import usersSlice from "./Users";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { ContextWrapper } from "./Users";

const store = configureStore({ reducer: { users: usersSlice } });

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <ContextWrapper>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ContextWrapper>
  </StrictMode>
);
