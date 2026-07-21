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
    <section className="relative border-b border-border-default bg-bg-primary px-6 py-6 z-[1]">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-40px" }}
        className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3"
      >
        <motion.span
          variants={item}
          className="font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted"
        >
          // Stack operacional
        </motion.span>

        {stack.map((s) => (
          <motion.span
            key={s}
            variants={item}
            className="text-sm font-semibold text-text-secondary transition-colors hover:text-accent-blue-light"
          >
            {s}
          </motion.span>
        ))}
      </motion.div>
    </section>
  );
}
