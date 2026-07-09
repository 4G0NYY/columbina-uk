import { useState } from "react";
import { motion } from "framer-motion";
import { CENTER, CROSS_LINKS, RELATIONS, type Relation } from "../../data/relations";

const byId = (id: string) => RELATIONS.find((r) => r.id === id);

/**
 * Her constellation of bonds. Every figure who shaped her story is a star tied
 * back to Columbina at the centre; selecting one (click, tap, or keyboard)
 * lights it and tells what passed between them. Her own constellations, the lore
 * notes, are the only ones with no stars but the phases of the moon, so here we
 * lend her some.
 */
export function RelationshipMap() {
  const [active, setActive] = useState<Relation | null>(null);

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <p className="eyebrow mb-3 text-center">Those Who Shaped Her</p>
      <h2 className="mb-3 text-center font-display text-3xl font-light text-moon-50 sm:text-4xl">
        Her Constellation
      </h2>
      <p className="mx-auto mb-10 max-w-xl text-center text-sm text-moon-400">
        A sky of the people bound to her story. Touch a star to hear what passed between them.
      </p>

      <div className="panel px-4 py-6 sm:px-8 sm:py-8">
        <svg
          viewBox="0 0 100 96"
          className="mx-auto block w-full max-w-2xl"
          role="group"
          aria-label="A constellation of Columbina's relationships"
        >
          {/* Ties from Columbina out to each figure. */}
          {RELATIONS.map((r) => {
            const on = active?.id === r.id;
            return (
              <line
                key={`edge-${r.id}`}
                x1={CENTER.x}
                y1={CENTER.y}
                x2={r.x}
                y2={r.y}
                stroke={on ? "rgba(233,207,143,0.55)" : "rgba(147,160,201,0.20)"}
                strokeWidth={on ? 0.5 : 0.3}
              />
            );
          })}

          {/* Faint ties between the figures themselves. */}
          {CROSS_LINKS.map(([a, b]) => {
            const ra = byId(a);
            const rb = byId(b);
            if (!ra || !rb) return null;
            return (
              <line
                key={`cross-${a}-${b}`}
                x1={ra.x}
                y1={ra.y}
                x2={rb.x}
                y2={rb.y}
                stroke="rgba(147,160,201,0.12)"
                strokeWidth={0.25}
                strokeDasharray="1 1.5"
              />
            );
          })}

          {/* Columbina, the moon at the centre. */}
          <g>
            <circle cx={CENTER.x} cy={CENTER.y} r={3.6} fill="rgba(233,207,143,0.18)" />
            <circle cx={CENTER.x} cy={CENTER.y} r={2} fill="#f4e6bf" />
            <text
              x={CENTER.x}
              y={CENTER.y + 6.5}
              textAnchor="middle"
              className="fill-halo-soft font-display"
              style={{ fontSize: "3.1px", letterSpacing: "0.02em" }}
            >
              {CENTER.name}
            </text>
          </g>

          {/* The figures, as stars. */}
          {RELATIONS.map((r) => {
            const on = active?.id === r.id;
            const anchor = r.x > 66 ? "end" : r.x < 34 ? "start" : "middle";
            const labelY = r.y < 20 ? r.y - 3.4 : r.y + 5;
            return (
              <g
                key={r.id}
                role="button"
                tabIndex={0}
                aria-pressed={on}
                aria-label={`${r.name}: ${r.tie}`}
                onClick={() => setActive(on ? null : r)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(on ? null : r);
                  }
                }}
                style={{ cursor: "pointer" }}
                className="outline-none"
              >
                {/* Invisible larger hit target for easy tapping. */}
                <circle cx={r.x} cy={r.y} r={5} fill="transparent" />
                <circle
                  cx={r.x}
                  cy={r.y}
                  r={on ? 2.6 : 1.7}
                  fill={on ? "#f4e6bf" : "#d3daef"}
                  className="transition-all"
                />
                {on && <circle cx={r.x} cy={r.y} r={4.4} fill="rgba(233,207,143,0.16)" />}
                <text
                  x={r.x}
                  y={labelY}
                  textAnchor={anchor}
                  className={on ? "fill-moon-50 font-display" : "fill-moon-300 font-display"}
                  style={{ fontSize: "2.9px" }}
                >
                  {r.name}
                </text>
              </g>
            );
          })}
        </svg>

        {/* The reading for the selected star. */}
        <motion.div
          key={active?.id ?? "resting"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-xl border-t border-moon-600/20 pt-6 text-center"
        >
          {active ? (
            <>
              <p className="font-display text-2xl font-light text-moon-50">{active.name}</p>
              <p className="mt-1 font-mono text-[0.66rem] uppercase tracking-widest2 text-halo/80">
                {active.tie}
              </p>
              <p className="mt-4 font-light leading-relaxed text-moon-300">{active.note}</p>
            </>
          ) : (
            <p className="font-display text-lg font-light italic text-moon-400">
              She kept few close, and outlived what most of them wanted from her. Choose a star.
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
