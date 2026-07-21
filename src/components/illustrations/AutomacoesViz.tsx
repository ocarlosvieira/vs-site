"use client";

import { motion, useReducedMotion } from "framer-motion";

const nos = [
  { label: "Lead", esquerda: "0%" },
  { label: "WhatsApp", esquerda: "50%" },
  { label: "CRM", esquerda: "100%" },
];

/** Mini-demo do card de Automações: pulso viajando pelo fluxo de nós. */
export default function AutomacoesViz() {
  const reduzMovimento = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative h-14 rounded-lg border border-border-default bg-white/[0.02] px-3"
    >
      {/* Trilho */}
      <div className="absolute left-4 right-4 top-[22px] h-px bg-white/10" />

      {/* Pulso percorrendo o trilho */}
      {!reduzMovimento && (
        <motion.span
          className="absolute top-[22px] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-accent-cyan"
          style={{ boxShadow: "0 0 8px var(--accent-cyan)" }}
          animate={{ left: ["16px", "calc(100% - 16px)"], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.2,
            repeat: Infinity,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
          }}
        />
      )}

      {/* Nós */}
      <div className="relative flex h-full items-start justify-between pt-[14px]">
        {nos.map((n, i) => (
          <div key={n.label} className="flex flex-col items-center gap-1.5">
            <motion.span
              className="h-2.5 w-2.5 rounded-full border border-accent-cyan/50 bg-bg-primary"
              animate={
                reduzMovimento
                  ? undefined
                  : { scale: [1, 1.35, 1], borderColor: ["rgba(81,217,254,0.5)", "rgba(81,217,254,1)", "rgba(81,217,254,0.5)"] }
              }
              transition={{
                duration: 2.2,
                repeat: Infinity,
                delay: i * 0.6,
                ease: "easeInOut",
              }}
            />
            <span className="text-[9px] text-text-muted">{n.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
