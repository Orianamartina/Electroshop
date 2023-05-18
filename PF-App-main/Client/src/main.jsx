import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.scss";
import store from "./redux/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

import axios from 'axios';
axios.defaults.baseURL = 'https://electroshop-mhek.onrender.com';


const root = document.getElementById("root");
createRoot(root).render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
);

