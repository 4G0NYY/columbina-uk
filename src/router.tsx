import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./routes/Landing";
import { Calculator } from "./routes/Calculator";
import { Silvermoon } from "./routes/Silvermoon";
import { NotFound } from "./routes/NotFound";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/calculator", element: <Calculator /> },
  // Unlisted secret route — not linked in any nav.
  { path: "/silvermoon", element: <Silvermoon /> },
  { path: "*", element: <NotFound /> },
]);
