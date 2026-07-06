import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { SecretProvider } from "./components/secrets/SecretProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SecretProvider>
      <RouterProvider router={router} />
    </SecretProvider>
  </StrictMode>
);
