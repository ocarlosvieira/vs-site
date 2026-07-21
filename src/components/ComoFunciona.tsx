"use client";

import { motion } from "framer-motion";
import {
  SearchCheck,
  LayoutDashboard,
  Rocket,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: SearchCheck,
    title: "Diagnóstico",
    description:
      "Analisamos seu negócio, seu público e seus concorrentes. Identificamos onde estão as oportunidades reais de crescimento.",
    color: "text-accent-blue",
    bgColor: "bg-accent-blue/10",
  },
  {
    number: "02",
    icon: LayoutDashboard,
    title: "Estratégia",
    description:
      "Montamos o plano completo: quais canais usar, estrutura do funil, automações e copy personalizado para o seu mercado.",
    color: "text-accent-sky",
    bgColor: "bg-accent-sky/10",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Execução",
    description:
      "Implementamos tudo: anúncios, landing pages, CRM e automações. Sua estrutura completa rodando em até 30 dias.",
    color: "text-accent-cyan",
    bgColor: "bg-accent-cyan/10",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Otimização",
    description:
      "Acompanhamos métricas e ajustamos cada peça para melhorar os resultados continuamente.",
    color: "text-accent-periwinkle",
    bgColor: "bg-accent-periwinkle/10",
  },
];

const smooth = [0.22, 1, 0.36, 1] as const;
const vp = { margin: "-80px" as const };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: smooth },
  },
};

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24 px-6 relative section-bg-3 z-[1]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, ease: smooth }}
          className="text-center mb-16"
        >
          <span className="text-accent-cyan text-sm font-semibold tracking-wide uppercase mb-4 block">
            Nossa Metodologia
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Como transformamos sua empresa em uma{" "}
            <span className="gradient-text">estrutura de marketing.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Um processo claro, transparente e com prazo definido. Você acompanha
            cada etapa e sabe exatamente o que está sendo feito.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {steps.map((step) => (
            <motion.div
              key={step.number}
              variants={cardVariant}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-bg-card border border-border-default rounded-xl p-6 relative group hover:border-accent-blue/30 transition-colors duration-300"
            >
              {/* Step number */}
              <span className="text-5xl font-display font-bold text-border-default/50 absolute top-4 right-4 group-hover:text-accent-blue/10 transition-colors">
                {step.number}
              </span>

              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={vp}
                transition={{ duration: 0.4, delay: 0.2, type: "spring" as const, stiffness: 180, damping: 14 }}
                className={`w-12 h-12 ${step.bgColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <step.icon size={24} className={step.color} />
              </motion.div>
              <h3 className="font-display text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
