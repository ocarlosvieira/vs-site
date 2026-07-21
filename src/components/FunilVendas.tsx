"use client";

import { motion } from "framer-motion";
import {
  MousePointerClick,
  FileText,
  Mail,
  ShoppingCart,
  Heart,
} from "lucide-react";

const stages = [
  {
    icon: MousePointerClick,
    title: "Atração",
    metric: "Tráfego qualificado",
    description: "Meta Ads e Google Ads direcionam pessoas com real interesse no seu produto.",
    color: "bg-accent-blue",
    textColor: "text-accent-blue",
  },
  {
    icon: FileText,
    title: "Captura",
    metric: "Leads capturados",
    description: "Landing pages otimizadas convertem visitantes em leads prontos para nutrir.",
    color: "bg-accent-sky",
    textColor: "text-accent-sky",
  },
  {
    icon: Mail,
    title: "Nutrição",
    metric: "Leads aquecidos",
    description: "Automações de e-mail e WhatsApp qualificam e aquecem cada lead.",
    color: "bg-accent-cyan",
    textColor: "text-accent-cyan",
  },
  {
    icon: ShoppingCart,
    title: "Conversão",
    metric: "Vendas fechadas",
    description: "CRM organizado e equipe comercial preparada para fechar com eficiência.",
    color: "bg-accent-periwinkle",
    textColor: "text-accent-periwinkle",
  },
  {
    icon: Heart,
    title: "Retenção",
    metric: "Clientes fiéis",
    description: "Pós-venda automatizado que fideliza e gera recompra recorrente.",
    color: "bg-accent-sky",
    textColor: "text-accent-sky",
  },
];

const smooth = [0.22, 1, 0.36, 1] as const;
const vp = { margin: "-80px" as const };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: smooth } },
};

// Widths that shrink like a real funnel
const widths = ["100%", "85%", "70%", "55%", "42%"];

export default function FunilVendas() {
  return (
    <section id="funil" className="py-24 px-6 relative overflow-hidden section-bg-2 z-[1]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-blue/4 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Two column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT — Texts */}
          <div className="lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, ease: smooth }}
            >
              <span className="text-accent-blue text-sm font-semibold tracking-wide uppercase mb-4 block">
                Funil de Vendas
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-6">
                Do primeiro clique
                <br />
                à <span className="gradient-text">venda fechada.</span>
              </h2>
              <p className="text-text-secondary text-base leading-relaxed mb-8">
                Cada etapa é desenhada, testada e otimizada para
                maximizar conversões no seu negócio.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.7, delay: 0.2, ease: smooth }}
              className="space-y-6"
            >
              {stages.map((stage, i) => (
                <motion.div
                  key={stage.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: smooth }}
                  className="flex items-start gap-4"
                >
                  <div className={`w-8 h-8 ${stage.color}/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5`}>
                    <span className={`text-xs font-bold ${stage.textColor}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-text-primary text-sm font-semibold mb-0.5">
                      {stage.title}
                    </h4>
                    <p className="text-text-muted text-sm leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Funnel visual */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            className="flex flex-col items-center"
          >
            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                variants={cardVariant}
                style={{ width: widths[i] }}
              >
                <div className="bg-bg-card border border-border-default rounded-xl p-4 flex items-center gap-3 hover:border-accent-blue/30 transition-colors group">
                  <div
                    className={`w-10 h-10 ${stage.color}/15 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stage.icon size={18} className={stage.textColor} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-sm font-semibold text-text-primary">
                      {stage.title}
                    </h3>
                    <span className={`text-[11px] font-mono ${stage.textColor}`}>
                      {stage.metric}
                    </span>
                  </div>
                </div>

                {/* Connector */}
                {i < stages.length - 1 && (
                  <div className="flex justify-center py-1.5">
                    <div className="w-px h-4 bg-border-subtle" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
