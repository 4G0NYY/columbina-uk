import { useSecrets } from "./SecretProvider";

/**
 * A quiet tally of discovered secrets. Stays invisible until the visitor finds
 * their first, so it reads as a reward rather than a checklist.
 */
export function SecretCounter() {
  const { discovered, total } = useSecrets();
  if (discovered.length === 0) return null;

  const complete = discovered.length === total;

  return (
    <div
      className="flex items-center gap-1.5 font-mono text-xs tracking-widest text-moon-500"
      title={
        complete
          ? "Every secret uncovered. The dove is pleased."
          : "Secrets whispered by the moon. Keep looking."
      }
    >
      <span className={complete ? "halo-text" : ""}>☾</span>
      <span className={complete ? "halo-text" : ""}>
        {discovered.length} / {total}
      </span>
    </div>
  );
}
