"use client";

import { motion } from "framer-motion";

const metricas = [
  { valor: "6", label: "Serviços Integrados" },
  { valor: "30", label: "Dias para seu funil rodar" },
  { valor: "7", label: "Dias de suporte por semana" },
];

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function MetricasBar() {
  return (
    <section id="metricas" className="py-12 px-6 relative bg-bg-primary z-[1]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ margin: "-80px" }}
        className="max-w-4xl mx-auto flex items-center justify-center gap-8 sm:gap-16"
      >
        {metricas.map((m, i) => (
          <motion.div key={m.label} variants={item} className="flex items-center gap-8 sm:gap-16">
            {i > 0 && (
              <div className="w-px h-12 bg-accent-blue/30" />
            )}
            <div className="text-center">
              <div className="font-display text-3xl sm:text-4xl font-bold text-text-primary">
                +{m.valor}
              </div>
              <div className="text-xs sm:text-sm text-text-muted mt-1">
                {m.label}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
