import { Link, useLocation } from "react-router-dom";
import { SecretCounter } from "../secrets/SecretCounter";

export function Header() {
  const { pathname } = useLocation();

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-display text-lg font-medium tracking-wide text-moon-100 transition-colors hover:text-moon-50"
        >
          ☾ Columbina
        </Link>

        <div className="flex items-center gap-6">
          <SecretCounter />
          <Link
            to="/gallery"
            className={`font-mono text-xs uppercase tracking-widest2 transition-colors ${
              pathname === "/gallery" ? "halo-text" : "text-moon-500 hover:text-moon-200"
            }`}
          >
            Gallery
          </Link>
          <Link
            to="/calculator"
            className={`font-mono text-xs uppercase tracking-widest2 transition-colors ${
              pathname === "/calculator"
                ? "halo-text"
                : "text-moon-500 hover:text-moon-200"
            }`}
          >
            Calculator
          </Link>
        </div>
      </nav>
    </header>
  );
}
