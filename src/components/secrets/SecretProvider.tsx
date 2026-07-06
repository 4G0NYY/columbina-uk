import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

/** The five hidden secrets scattered across the shrine. */
export const SECRETS = ["konami", "moon", "dove", "silvermoon", "kuutar"] as const;
export type SecretId = (typeof SECRETS)[number];

const STORAGE_KEY = "columbina.secrets.v1";

interface SecretContextValue {
  discovered: SecretId[];
  total: number;
  has: (id: SecretId) => boolean;
  discover: (id: SecretId) => void;
  reset: () => void;
}

const SecretContext = createContext<SecretContextValue | null>(null);

function load(): SecretId[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((x): x is SecretId => SECRETS.includes(x as SecretId));
  } catch {
    return [];
  }
}

export function SecretProvider({ children }: { children: ReactNode }) {
  const [discovered, setDiscovered] = useState<SecretId[]>([]);

  // Hydrate from storage on mount (avoids SSR/first-paint mismatch).
  useEffect(() => {
    setDiscovered(load());
  }, []);

  const discover = useCallback((id: SecretId) => {
    setDiscovered((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable — secret still tracked for this session */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setDiscovered([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<SecretContextValue>(
    () => ({
      discovered,
      total: SECRETS.length,
      has: (id) => discovered.includes(id),
      discover,
      reset,
    }),
    [discovered, discover, reset]
  );

  return <SecretContext.Provider value={value}>{children}</SecretContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSecrets(): SecretContextValue {
  const ctx = useContext(SecretContext);
  if (!ctx) throw new Error("useSecrets must be used within a SecretProvider");
  return ctx;
}
