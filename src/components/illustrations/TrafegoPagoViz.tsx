"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const ROAS_FINAL = 4.2;

const campanhas = [
  { nome: "Meta Ads", largura: "82%", cor: "var(--accent-blue)", delay: 0 },
  { nome: "Google Ads", largura: "64%", cor: "var(--accent-sky)", delay: 0.12 },
];

/** Mini-demo do card de Tráfego Pago: ROAS contando + verba por campanha. */
export default function TrafegoPagoViz() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduzMovimento = useReducedMotion();

  const valor = useMotionValue(0);
  const texto = useTransform(valor, (v) => v.toFixed(1));

  useEffect(() => {
    if (!inView) return;
    if (reduzMovimento) {
      valor.set(ROAS_FINAL);
      return;
    }
    const controls = animate(valor, ROAS_FINAL, {
      duration: 1.4,
      ease: "easeOut",
    });
    return () => controls.stop();
  }, [inView, reduzMovimento, valor]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="rounded-lg border border-border-default bg-white/[0.02] p-4"
    >
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-[10px] uppercase tracking-widest text-text-muted">
          ROAS médio
        </span>
        <div className="flex items-baseline font-display text-2xl font-bold text-accent-blue-light">
          <motion.span>{texto}</motion.span>
          <span>x</span>
        </div>
      </div>

      <div className="space-y-2">
        {campanhas.map((c) => (
          <div key={c.nome} className="flex items-center gap-2">
            <span className="w-16 shrink-0 text-[10px] text-text-muted">
              {c.nome}
            </span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: c.cor }}
                initial={{ width: 0 }}
                animate={inView ? { width: c.largura } : { width: 0 }}
                transition={{
                  duration: reduzMovimento ? 0 : 1,
                  delay: reduzMovimento ? 0 : 0.2 + c.delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
