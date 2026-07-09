import { useEffect, useRef, useState } from "react";
import { moonInfo } from "../../lib/moon";

/**
 * A "collector's moon card" drawn on a canvas once every secret is found. It
 * paints the moon at tonight's real phase and can be downloaded as a PNG, so a
 * finder has something to keep and share.
 */
export function MoonCard({ found, total, date }: { found: number; total: number; date: Date }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [href, setHref] = useState<string | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 800;
    const H = 500;
    canvas.width = W;
    canvas.height = H;

    const info = moonInfo(date);

    // Background
    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#05060c");
    bg.addColorStop(1, "#0a0d1a");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // Scattered stars
    ctx.fillStyle = "#f2f4fb";
    for (let i = 0; i < 90; i++) {
      const x = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      const y = (Math.sin(i * 78.233) * 12543.123) % 1;
      const r = ((Math.sin(i * 3.17) + 1) / 2) * 1.3 + 0.2;
      ctx.globalAlpha = ((Math.sin(i * 5.1) + 1) / 2) * 0.5 + 0.15;
      ctx.beginPath();
      ctx.arc(Math.abs(x) * W, Math.abs(y) * H, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Halo + moon
    const cx = 200;
    const cy = H / 2;
    const R = 120;
    const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, R + 70);
    halo.addColorStop(0, "rgba(233,207,143,0.22)");
    halo.addColorStop(0.6, "rgba(233,207,143,0.06)");
    halo.addColorStop(1, "transparent");
    ctx.fillStyle = halo;
    ctx.fillRect(0, 0, W, H);

    const disc = ctx.createRadialGradient(cx - 40, cy - 44, 10, cx, cy, R);
    disc.addColorStop(0, "#fbfcff");
    disc.addColorStop(0.55, "#e6eaf6");
    disc.addColorStop(1, "#b6c0e0");
    ctx.fillStyle = disc;
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.fill();

    // Shadow, offset by the real phase to render a crescent/gibbous
    const offset = Math.cos(info.phase * 2 * Math.PI) * R * 1.15;
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, R, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = "#05060c";
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(cx + (info.waxing ? offset : -offset), cy, R, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.globalAlpha = 1;

    // Text
    const tx = 380;
    ctx.textBaseline = "alphabetic";
    ctx.fillStyle = "#93a0c9";
    ctx.font = "600 15px 'JetBrains Mono', monospace";
    ctx.fillText("ALL MOONLIGHT UNCOVERED", tx, 150);

    ctx.fillStyle = "#fbfcff";
    ctx.font = "300 46px 'Cormorant Garamond', serif";
    ctx.fillText("Columbina", tx, 205);
    ctx.fillText("Hyposelenia", tx, 255);

    ctx.fillStyle = "#f4e6bf";
    ctx.font = "500 20px 'JetBrains Mono', monospace";
    ctx.fillText(`☾ ${found} / ${total} secrets`, tx, 315);

    ctx.fillStyle = "#93a0c9";
    ctx.font = "400 15px 'JetBrains Mono', monospace";
    ctx.fillText(`${info.name} · ${Math.round(info.illumination * 100)}% lit`, tx, 350);
    ctx.fillText(
      date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      tx,
      378
    );

    ctx.fillStyle = "#6f7ead";
    ctx.font = "400 13px 'JetBrains Mono', monospace";
    ctx.fillText("columbina.uk", tx, 430);

    try {
      setHref(canvas.toDataURL("image/png"));
    } catch {
      setHref(null);
    }
  }, [found, total, date]);

  return (
    <div className="flex flex-col items-center gap-5">
      <canvas
        ref={canvasRef}
        className="w-full max-w-xl rounded-2xl border border-moon-600/20 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)]"
        aria-label="Your collector's moon card"
      />
      {href && (
        <a
          href={href}
          download="columbina-moon-card.png"
          className="inline-block rounded-full border border-halo/40 px-6 py-2.5 font-mono text-xs uppercase tracking-widest text-halo transition-colors hover:bg-halo/10"
        >
          Download your moon card
        </a>
      )}
    </div>
  );
}
