import { Link } from "react-router-dom";
import { Starfield } from "../components/ambient/Starfield";
import { MoonPhase } from "../components/ambient/MoonPhase";

export function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <Starfield count={60} />
      <MoonPhase phase={0.03} size={140} title="A new moon, nothing to see" />
      <p className="eyebrow mt-10 mb-3">New moon</p>
      <h1 className="font-display text-5xl font-light text-moon-50">Nothing dwells here</h1>
      <p className="mt-4 max-w-md text-moon-400">
        This page is as dark as the new moon. Perhaps the dove led you astray.
      </p>
      <Link
        to="/"
        className="mt-10 inline-block font-mono text-xs uppercase tracking-widest2 text-halo transition-colors hover:text-moon-100"
      >
        ← back to the moonlight
      </Link>
    </div>
  );
}
