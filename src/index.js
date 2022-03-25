import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Themer from "./components/basic-components/theme/ThemeContext";
import { Provider as ReduxProvider } from "react-redux";
import store from "./Redux/Store";
import AuthProvider from "./firebase/AuthContext";

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <ReduxProvider store={store}>
        <Themer>
          <App />
        </Themer>
      </ReduxProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
