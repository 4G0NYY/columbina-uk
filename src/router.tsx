import { createBrowserRouter } from "react-router-dom";
import { Landing } from "./routes/Landing";
import { Calculator } from "./routes/Calculator";
import { Gallery } from "./routes/Gallery";
import { Moonlit } from "./routes/Moonlit";
import { Silvermoon } from "./routes/Silvermoon";
import { NotFound } from "./routes/NotFound";

export const router = createBrowserRouter([
  { path: "/", element: <Landing /> },
  { path: "/calculator", element: <Calculator /> },
  { path: "/gallery", element: <Gallery /> },
  // Unlocked-reward page for finding every secret; linked from the ☾ counter.
  { path: "/moonlit", element: <Moonlit /> },
  // Unlisted secret route, not linked in any nav.
  { path: "/silvermoon", element: <Silvermoon /> },
  { path: "*", element: <NotFound /> },
]);
