import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app_routes";

import "./styles/app.scss";

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};
