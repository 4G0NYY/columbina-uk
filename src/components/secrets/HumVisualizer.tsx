import { useEffect, useRef } from "react";
import { getHumAnalyser } from "../../lib/hum";

/**
 * A soft radial visualizer for the lullaby. It reads the shared analyser each
 * frame and breathes a ring of moonlit spokes outward from the centre; when
 * nothing is playing it rests as a faint circle. Purely decorative, and it
 * stays still under prefers-reduced-motion.
 */
export function HumVisualizer({ size = 220 }: { size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const cx = size / 2;
    const cy = size / 2;
    const baseR = size * 0.28;
    let raf = 0;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, size, size);

      const analyser = getHumAnalyser();
      const spokes = 48;
      const data = analyser
        ? new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount))
        : null;
      if (analyser && data) analyser.getByteFrequencyData(data);

      for (let i = 0; i < spokes; i++) {
        const angle = (i / spokes) * Math.PI * 2;
        const bin = data ? data[i % data.length] / 255 : 0;
        const len = baseR + bin * size * 0.16;
        const x1 = cx + Math.cos(angle) * baseR;
        const y1 = cy + Math.sin(angle) * baseR;
        const x2 = cx + Math.cos(angle) * len;
        const y2 = cy + Math.sin(angle) * len;
        ctx.strokeStyle = `rgba(233,207,143,${0.12 + bin * 0.5})`;
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // Resting inner ring
      ctx.strokeStyle = "rgba(147,160,201,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, baseR - 4, 0, Math.PI * 2);
      ctx.stroke();

      if (!reduce) raf = requestAnimationFrame(draw);
    }

    draw();
    return () => cancelAnimationFrame(raf);
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: size, height: size }}
    />
  );
}
