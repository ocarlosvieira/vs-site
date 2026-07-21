"use client";

import { motion, useReducedMotion } from "framer-motion";

const etapas = [
  { label: "Visitantes", largura: "100%" },
  { label: "Leads", largura: "72%" },
  { label: "Clientes", largura: "44%" },
];

// Posições horizontais dos leads que descem pelo funil; convergem ao centro.
const leads = [
  { xInicial: "8%", atraso: 0 },
  { xInicial: "28%", atraso: 0.5 },
  { xInicial: "50%", atraso: 1 },
  { xInicial: "72%", atraso: 1.5 },
  { xInicial: "90%", atraso: 2 },
];

const DURACAO = 2.6;

/** Mini-demo do card de Funil: leads descendo e afunilando por etapa. */
export default function FunilViz() {
  const reduzMovimento = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-lg border border-border-default bg-white/[0.02] p-4"
    >
      {/* Leads em queda */}
      {!reduzMovimento && (
        <div className="pointer-events-none absolute inset-0">
          {leads.map((l, i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-accent-cyan"
              style={{
                left: l.xInicial,
                top: 0,
                boxShadow: "0 0 6px var(--accent-cyan)",
              }}
              animate={{
                y: ["10%", "100%"],
                x: ["0%", i < 2 ? "120%" : i > 2 ? "-120%" : "0%"],
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1, 1, 0.5],
              }}
              transition={{
                duration: DURACAO,
                repeat: Infinity,
                delay: l.atraso,
                ease: "easeIn",
                times: [0, 0.15, 0.75, 1],
              }}
            />
          ))}
        </div>
      )}

      {/* Etapas do funil */}
      <div className="relative flex flex-col items-center gap-2">
        {etapas.map((e) => (
          <div
            key={e.label}
            style={{ width: e.largura }}
            className="flex h-7 items-center justify-center rounded-md border border-white/10 bg-gradient-to-r from-accent-blue-dark/35 to-accent-cyan/20"
          >
            <span className="text-[10px] font-medium tracking-wide text-text-secondary">
              {e.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
