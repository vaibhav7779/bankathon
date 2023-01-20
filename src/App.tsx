import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";

import { SzThemeProvider, GlobalCss } from "@subzero/polar";

import ErrorBoundary from "Components/ErrorBoundary";
import Footer from "Components/Footer";

import AppRoutes from "Configurations/routing/AppRoutes";
import { APP_ROUTES } from "Configurations/routing/routes";

import "./styles/index.scss";
import ToasterMessage from "Components/Toaster";
import ModalFlow from "Pages/Modals";

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const navigate = useNavigate();
  const location = useLocation();
  const handleThemeChange = (mode: string) =>
    setTheme(mode === "Light" ? "dark" : "light");

  return (
    <SzThemeProvider mode={theme}>
      <ErrorBoundary>
        <GlobalCss />
        <ToasterMessage />
        <ModalFlow />
        {/* <Header switched={theme} onThemeChange={handleThemeChange} /> */}
        <AppRoutes appRoutes={APP_ROUTES} />
      </ErrorBoundary>
    </SzThemeProvider>
  );
};

export default App;
