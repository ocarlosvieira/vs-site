"use client";

import { motion } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

const naoE = [
  "Espera resultados mágicos sem investir em anúncios",
  "Não quer acompanhar métricas nem ajustar estratégia junto",
  "Busca apenas um \"apertador de botões\" para gerenciador de anúncios",
];

const paraQuem = [
  "Tem um bom produto ou serviço mas depende de indicação para vender",
  "Já tentou impulsionar no Instagram e não viu resultado de verdade",
  "Quer parar de perder tempo com ações de marketing que não trazem cliente",
  "Busca um parceiro que cuida de tudo: estratégia, execução e otimização",
];

const smooth = [0.22, 1, 0.36, 1] as const;
const vp = { margin: "-80px" as const };

const listStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const listItem = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: smooth },
  },
};

export default function ParaQuem() {
  return (
    <section id="para-quem" className="py-24 px-6 relative section-bg-4 z-[1]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, ease: smooth }}
          className="text-center mb-16"
        >
          <span className="text-accent-blue text-sm font-semibold tracking-wide uppercase mb-4 block">
            Fit Ideal
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Para quem é a{" "}
            <span className="text-accent-cyan">VS Growth?</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Não é para */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, ease: smooth }}
            className="bg-bg-card border border-border-default rounded-xl p-8"
          >
            <h3 className="font-display text-lg font-semibold mb-6 text-text-secondary">
              Não é para quem...
            </h3>
            <motion.ul
              variants={listStagger}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="space-y-4"
            >
              {naoE.map((item) => (
                <motion.li key={item} variants={listItem} className="flex items-start gap-3">
                  <XCircle
                    size={20}
                    className="text-red-400/60 mt-0.5 shrink-0"
                  />
                  <span className="text-text-secondary text-sm">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>

          {/* É para */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.6, ease: smooth }}
            className="bg-bg-card border border-accent-blue/20 rounded-xl p-8 glow-blue"
          >
            <h3 className="font-display text-lg font-semibold mb-6 text-accent-blue">
              É perfeito para quem...
            </h3>
            <motion.ul
              variants={listStagger}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              className="space-y-4"
            >
              {paraQuem.map((item) => (
                <motion.li key={item} variants={listItem} className="flex items-start gap-3">
                  <CheckCircle
                    size={20}
                    className="text-accent-blue mt-0.5 shrink-0"
                  />
                  <span className="text-text-primary text-sm">{item}</span>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
