"use client";

import { motion } from "framer-motion";

// Stack real do site (mesma que aparece nos serviços e na meta description).
const stack = [
  "Meta Ads",
  "Google Ads",
  "CRM",
  "Automações",
  "Funil de Vendas",
  "Landing Pages",
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function StackOperacional() {
  return (
    <section className="relative border-b border-border-default bg-bg-primary py-6 z-[1]">
      <div className="relative">
        {/* Esmaecimento nas pontas: sinaliza que a faixa desliza. Só no
            mobile, onde a lista não cabe inteira. */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-bg-primary to-transparent sm:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-bg-primary to-transparent sm:hidden" />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          /* Mobile: uma linha só, deslizável na horizontal, sem barra de
             rolagem à vista. A partir de sm cabe tudo, então volta a
             quebrar linha e centralizar. */
          className="mx-auto flex max-w-6xl items-center gap-x-6 overflow-x-auto px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-3 sm:overflow-x-visible"
        >
          <motion.span
            variants={item}
            className="shrink-0 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted"
          >
            // Stack operacional
          </motion.span>

          {stack.map((s) => (
            <motion.span
              key={s}
              variants={item}
              className="shrink-0 whitespace-nowrap text-sm font-semibold text-text-secondary transition-colors hover:text-accent-blue-light"
            >
              {s}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
