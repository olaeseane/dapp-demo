import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import logo from "./sap-logo-svg.svg";

import "./index.css";

ReactDOM.render(
  <App label="DAPP Голосование" logo={logo} />,
  document.getElementById("root")
);
