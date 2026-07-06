import { useEffect, useState } from "react";
import { useSecrets } from "./SecretProvider";
import { playHum } from "../../lib/hum";
import { GifRain } from "./GifRain";

const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

/**
 * Listens for the Konami code anywhere on the page. On completion it reveals a
 * shower of doves/gifs and plays Columbina's hum (SECRET: "konami").
 */
export function KonamiListener() {
  const { discover } = useSecrets();
  const [raining, setRaining] = useState(false);

  useEffect(() => {
    let progress = 0;
    function onKey(e: KeyboardEvent) {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[progress]) {
        progress += 1;
        if (progress === SEQUENCE.length) {
          progress = 0;
          discover("konami");
          playHum();
          setRaining(true);
        }
      } else {
        // Allow a wrong key to still start a fresh sequence.
        progress = key === SEQUENCE[0] ? 1 : 0;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [discover]);

  if (!raining) return null;
  return <GifRain onDone={() => setRaining(false)} />;
}
