"use client";

import { motion } from "framer-motion";
import { Megaphone, Database, Workflow, GitBranch } from "lucide-react";
import TrafegoPagoViz from "@/components/illustrations/TrafegoPagoViz";
import FunilViz from "@/components/illustrations/FunilViz";
import AutomacoesViz from "@/components/illustrations/AutomacoesViz";
import CrmViz from "@/components/illustrations/CrmViz";

const servicos = [
  {
    icon: Megaphone,
    title: "Tráfego Pago",
    description:
      "Seu produto aparecendo para quem já tem interesse em comprar. Meta Ads e Google Ads com estratégia, sem desperdiçar verba com quem não é seu público.",
    color: "text-accent-blue",
    bgColor: "bg-accent-blue/10",
    borderColor: "border-accent-blue/20",
    Viz: TrafegoPagoViz,
  },
  {
    icon: GitBranch,
    title: "Funil de Vendas",
    description:
      "Do primeiro clique até o pagamento. Uma esteira completa que guia o cliente por cada etapa da decisão, eliminando objeções e acelerando o fechamento.",
    color: "text-accent-sky",
    bgColor: "bg-accent-sky/10",
    borderColor: "border-accent-sky/20",
    Viz: FunilViz,
  },
  {
    icon: Database,
    title: "CRM",
    description:
      "Chega de perder venda por esquecer de responder. Cada lead organizado e acompanhado até fechar.",
    color: "text-accent-periwinkle",
    bgColor: "bg-accent-periwinkle/10",
    borderColor: "border-accent-periwinkle/20",
    Viz: CrmViz,
  },
  {
    icon: Workflow,
    title: "Automações",
    description:
      "Enquanto você dorme, seus leads recebem mensagens que esquentam a venda. WhatsApp e email no automático.",
    color: "text-accent-sky",
    bgColor: "bg-accent-sky/10",
    borderColor: "border-accent-sky/20",
    Viz: AutomacoesViz,
  },
];

const smooth = [0.22, 1, 0.36, 1] as const;

const containerStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: smooth },
  },
};

const vp = { once: true, margin: "-100px" as const };

export default function Servicos() {
  return (
    <section id="solucao" className="py-24 px-6 relative section-bg-1 z-[1]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
      <div className="max-w-6xl mx-auto">
        {/* Header — split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, ease: smooth }}
          >
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.4 }}
              className="text-accent-cyan text-sm font-semibold tracking-wide uppercase mb-4 block"
            >
              O que fazemos
            </motion.span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Tudo o que sua empresa precisa para{" "}
              <span className="gradient-text">vender mais no digital</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ duration: 0.7, delay: 0.15, ease: smooth }}
            className="flex items-end"
          >
            <div className="border-l-2 border-accent-blue/30 pl-6">
              <p className="text-text-secondary leading-relaxed">
                Da estratégia aos anúncios, do criativo à gestão de leads.
              </p>
              <p className="text-text-secondary leading-relaxed mt-2">
                <strong className="text-text-primary">Nós cuidamos</strong> de toda
                a estrutura de marketing enquanto você foca no crescimento do seu
                negócio.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Serviços — cards uniformes, 2 por linha */}
        <motion.div
          variants={containerStagger}
          initial="hidden"
          whileInView="visible"
          viewport={vp}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {servicos.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariant}
              className={`flex flex-col bg-bg-card border ${service.borderColor} rounded-xl p-8 hover:bg-bg-card-hover transition-all duration-300 group`}
            >
              <motion.div
                initial={{ scale: 0, rotate: -15 }}
                whileInView={{ scale: 1, rotate: 0 }}
                whileHover={{ scale: 1.15, rotate: 8, transition: { type: "spring" as const, stiffness: 300, damping: 12 } }}
                viewport={vp}
                transition={{ duration: 0.5, delay: 0.2, type: "spring" as const, stiffness: 180, damping: 14 }}
                className={`w-14 h-14 ${service.bgColor} rounded-xl flex items-center justify-center mb-5 cursor-pointer group-hover:shadow-[0_0_14px_rgba(0,128,255,0.22)] transition-shadow duration-300`}
              >
                <service.icon size={28} className={`${service.color} group-hover:scale-110 transition-transform duration-300`} />
              </motion.div>

              <h3 className="font-display text-2xl font-bold mb-3">
                {service.title}
              </h3>
              <p className="text-text-secondary leading-relaxed mb-5">
                {service.description}
              </p>

              {/* Empurra a ilustração para a base, alinhando-a entre os cards */}
              {service.Viz && (
                <div className="mt-auto">
                  <service.Viz />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
