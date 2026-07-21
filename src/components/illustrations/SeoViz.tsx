"use client";

import { motion, useReducedMotion } from "framer-motion";

const ALTURA_LINHA = 12; // px por posição do ranking
const posicoes = [1, 2, 3, 4];

/** Mini-demo do card de SEO: sua posição subindo até o topo do ranking. */
export default function SeoViz() {
  const reduzMovimento = useReducedMotion();

  return (
    <div
      aria-hidden
      className="relative rounded-lg border border-border-default bg-white/[0.02] p-3"
    >
      <div className="relative" style={{ height: ALTURA_LINHA * posicoes.length }}>
        {/* Resultados concorrentes */}
        {posicoes.map((p, i) => (
          <div
            key={p}
            className="absolute left-0 right-0 flex items-center gap-2"
            style={{ top: i * ALTURA_LINHA }}
          >
            <span className="w-4 shrink-0 text-[9px] text-text-muted">#{p}</span>
            <div
              className="h-1 rounded-full bg-white/[0.08]"
              style={{ width: `${70 - i * 12}%` }}
            />
          </div>
        ))}

        {/* Sua posição, subindo de #4 até #1 */}
        <motion.div
          className="absolute left-0 right-0 flex items-center gap-2"
          initial={{ y: (posicoes.length - 1) * ALTURA_LINHA }}
          animate={
            reduzMovimento
              ? { y: 0 }
              : { y: [3, 2, 1, 0].map((p) => p * ALTURA_LINHA) }
          }
          transition={{
            duration: 4.4,
            repeat: reduzMovimento ? 0 : Infinity,
            repeatDelay: 0.6,
            times: [0, 0.3, 0.6, 1],
            ease: "easeInOut",
          }}
        >
          <span className="w-4 shrink-0 text-[9px] font-bold text-accent-cyan">
            •
          </span>
          <div
            className="h-1 rounded-full bg-accent-cyan"
            style={{ width: "78%", boxShadow: "0 0 8px var(--accent-cyan)" }}
          />
        </motion.div>
      </div>
    </div>
  );
}
