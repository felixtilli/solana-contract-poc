import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { AppWithProviders } from "./App";

require("@solana/wallet-adapter-react-ui/styles.css");
require("./style.scss");

ReactDOM.render(
  <StrictMode>
    <AppWithProviders />
  </StrictMode>,
  document.getElementById("root")
);
