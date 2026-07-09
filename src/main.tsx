import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { MotionConfig } from "framer-motion";
import { router } from "./router";
import { SecretProvider } from "./components/secrets/SecretProvider";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    {/* reducedMotion="user" makes every framer-motion animation honour the OS
        prefers-reduced-motion setting, matching the CSS guard in index.css. */}
    <MotionConfig reducedMotion="user">
      <SecretProvider>
        <RouterProvider router={router} />
      </SecretProvider>
    </MotionConfig>
  </StrictMode>
);

// Progressive Web App: register the offline service worker in production only,
// so dev/HMR is never intercepted.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      /* offline support is a bonus; ignore registration failures */
    });
  });
}
