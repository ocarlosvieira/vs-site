"use client";

import { motion } from "framer-motion";
import { TrendingUp, DollarSign, MousePointerClick, Users } from "lucide-react";

const kpis = [
  {
    icon: TrendingUp,
    label: "ROAS Médio",
    value: "3.5x",
    change: "+28%",
    positive: true,
  },
  {
    icon: DollarSign,
    label: "Faturamento Gerado",
    value: "R$2.4M",
    change: "+42%",
    positive: true,
  },
  {
    icon: MousePointerClick,
    label: "Custo por Lead",
    value: "R$8,50",
    change: "-34%",
    positive: true,
  },
  {
    icon: Users,
    label: "Leads Gerados",
    value: "12.847",
    change: "+61%",
    positive: true,
  },
];

// Monthly revenue data for bar chart (últimos 6 meses)
const revenueData = [
  { month: "Jan", value: 45, label: "R$45k" },
  { month: "Fev", value: 52, label: "R$52k" },
  { month: "Mar", value: 68, label: "R$68k" },
  { month: "Abr", value: 85, label: "R$85k" },
  { month: "Mai", value: 110, label: "R$110k" },
  { month: "Jun", value: 142, label: "R$142k" },
];

// Channel breakdown
const channels = [
  { name: "Meta Ads", percentage: 45, color: "bg-accent-blue" },
  { name: "Google Ads", percentage: 32, color: "bg-accent-orange" },
  { name: "Orgânico", percentage: 15, color: "bg-accent-purple" },
  { name: "Direto", percentage: 8, color: "bg-green-400" },
];

export default function Dashboard() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.value));

  return (
    <section id="resultados" className="py-24 px-6 relative">
      {/* Separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent-orange text-sm font-semibold tracking-wide uppercase mb-4 block">
            Resultados Reais
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Dashboard de{" "}
            <span className="gradient-text">performance.</span>
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Transparência total. Você acompanha cada métrica em tempo real
            e sabe exatamente onde cada centavo está sendo investido.
          </p>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="bg-bg-card border border-border-default rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <kpi.icon size={18} className="text-text-muted" />
                <span
                  className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    kpi.positive
                      ? "text-green-400 bg-green-400/10"
                      : "text-red-400 bg-red-400/10"
                  }`}
                >
                  {kpi.change}
                </span>
              </div>
              <div className="font-display text-2xl sm:text-3xl font-bold text-text-primary">
                {kpi.value}
              </div>
              <div className="text-xs text-text-muted mt-1">{kpi.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart (Bar) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 bg-bg-card border border-border-default rounded-xl p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-display font-semibold text-sm">
                  Faturamento Mensal
                </h3>
                <p className="text-text-muted text-xs mt-0.5">
                  Evolução dos últimos 6 meses
                </p>
              </div>
              <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full font-semibold">
                +215%
              </span>
            </div>

            {/* Bar Chart */}
            <div className="flex items-end justify-between gap-3 h-48">
              {revenueData.map((d, i) => (
                <motion.div
                  key={d.month}
                  className="flex-1 flex flex-col items-center gap-2"
                  initial={{ opacity: 0, scaleY: 0 }}
                  whileInView={{ opacity: 1, scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                  style={{ transformOrigin: "bottom" }}
                >
                  <span className="text-[10px] text-text-muted font-mono">
                    {d.label}
                  </span>
                  <div
                    className="w-full rounded-t-md bg-accent-blue/80 hover:bg-accent-blue transition-colors"
                    style={{
                      height: `${(d.value / maxRevenue) * 160}px`,
                    }}
                  />
                  <span className="text-[10px] text-text-muted">{d.month}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Channel Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-bg-card border border-border-default rounded-xl p-6"
          >
            <h3 className="font-display font-semibold text-sm mb-1">
              Canais de Aquisição
            </h3>
            <p className="text-text-muted text-xs mb-6">
              Distribuição de leads por canal
            </p>

            {/* Donut chart placeholder */}
            <div className="flex justify-center mb-6">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  {/* Meta Ads */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="var(--accent-blue)"
                    strokeWidth="4"
                    strokeDasharray="45 55"
                    strokeDashoffset="0"
                  />
                  {/* Google Ads */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="var(--accent-orange)"
                    strokeWidth="4"
                    strokeDasharray="32 68"
                    strokeDashoffset="-45"
                  />
                  {/* Orgânico */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="4"
                    strokeDasharray="15 85"
                    strokeDashoffset="-77"
                  />
                  {/* Direto */}
                  <circle
                    cx="18"
                    cy="18"
                    r="14"
                    fill="none"
                    stroke="#4ADE80"
                    strokeWidth="4"
                    strokeDasharray="8 92"
                    strokeDashoffset="-92"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-display text-lg font-bold">12.8k</span>
                  <span className="text-[10px] text-text-muted">leads</span>
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {channels.map((ch) => (
                <div key={ch.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${ch.color}`} />
                    <span className="text-xs text-text-secondary">
                      {ch.name}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-text-primary">
                    {ch.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              texto:
                "Saímos de R$45k para R$180k em 4 meses. Redesenharam nosso funil inteiro e organizaram tudo no CRM.",
              nome: "Ricardo M.",
              cargo: "CEO, E-commerce de Moda",
            },
            {
              texto:
                "Antes gastava em Meta Ads sem saber o retorno real. Agora tenho dashboard com cada métrica e o funil automatizado converte sozinho.",
              nome: "Amanda S.",
              cargo: "Diretora, Clínica Estética",
            },
            {
              texto:
                "Google Ads + automação de WhatsApp foram um divisor de águas. O CRM organizou nosso comercial e o resultado veio na primeira semana.",
              nome: "Lucas P.",
              cargo: "Founder, SaaS B2B",
            },
          ].map((dep, i) => (
            <div
              key={dep.nome}
              className="bg-bg-card border border-border-default rounded-xl p-6 flex flex-col"
            >
              <p className="text-text-secondary text-sm leading-relaxed mb-6 flex-1">
                &ldquo;{dep.texto}&rdquo;
              </p>
              <div className="border-t border-border-default pt-4">
                <div className="font-semibold text-sm text-text-primary">
                  {dep.nome}
                </div>
                <div className="text-xs text-text-muted">{dep.cargo}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
