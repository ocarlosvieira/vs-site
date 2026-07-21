"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Send, Shield, CheckCircle } from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as const;
const vp = { margin: "-80px" as const };

const benefitStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
};

const benefitItem = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: smooth },
  },
};

const formStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
};

const formField = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: smooth },
  },
};

export default function CTAFinal() {
  const [submitted, setSubmitted] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Lido antes do await: depois dele, e.currentTarget já é null.
    const dados = new FormData(e.currentTarget);

    setErro(null);
    setEnviando(true);

    try {
      const resposta = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: String(dados.get("nome") ?? ""),
          whatsapp: String(dados.get("whatsapp") ?? ""),
          faturamento: String(dados.get("faturamento") ?? ""),
        }),
      });

      if (!resposta.ok) {
        const corpo = await resposta.json().catch(() => null);
        throw new Error(corpo?.erro ?? "Não foi possível enviar.");
      }

      setSubmitted(true);
    } catch (e) {
      setErro(
        e instanceof Error
          ? e.message
          : "Não foi possível enviar. Tente novamente."
      );
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section id="cta" className="py-24 px-6 relative overflow-hidden section-bg-5 z-[1]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-accent-blue/5 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={vp}
        transition={{ duration: 0.7, ease: smooth }}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="bg-bg-secondary border border-border-default rounded-2xl p-8 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left: Copy */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: 0.1, ease: smooth }}
            >
              <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4 leading-tight">
                Descubra quanto faturamento você está{" "}
                <span className="text-accent-cyan">deixando na mesa.</span>
              </h2>
              <p className="text-text-secondary mb-8 leading-relaxed">
                Preencha o formulário e nossa equipe vai entrar em contato
                para mostrar onde estão as oportunidades para você vender
                mais com tráfego pago, funil e automações.
              </p>

              {/* Benefits */}
              <motion.div
                variants={benefitStagger}
                initial="hidden"
                whileInView="visible"
                viewport={vp}
                className="space-y-3"
              >
                {[
                  "Análise personalizada do seu negócio",
                  "Plano de ação personalizado em 24h",
                  "Sem compromisso e sem spam",
                ].map((item) => (
                  <motion.div key={item} variants={benefitItem} className="flex items-center gap-2 text-sm text-text-secondary">
                    <CheckCircle size={16} className="text-accent-periwinkle shrink-0" />
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={vp}
              transition={{ duration: 0.6, delay: 0.2, ease: smooth }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, type: "spring" as const, stiffness: 200, damping: 15 }}
                  className="h-full flex flex-col items-center justify-center text-center gap-4"
                >
                  <div className="w-16 h-16 bg-accent-periwinkle/10 rounded-full flex items-center justify-center">
                    <CheckCircle size={32} className="text-accent-periwinkle" />
                  </div>
                  <h3 className="font-display text-xl font-bold">
                    Mensagem enviada!
                  </h3>
                  <p className="text-text-secondary text-sm max-w-xs">
                    Nosso time vai analisar seu negócio e entrar em contato em
                    até 24 horas.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  onSubmit={handleSubmit}
                  variants={formStagger}
                  initial="hidden"
                  whileInView="visible"
                  viewport={vp}
                  className="space-y-4"
                >
                  <motion.div variants={formField}>
                    <label
                      htmlFor="nome"
                      className="block text-sm font-medium text-text-secondary mb-1.5"
                    >
                      Nome
                    </label>
                    <input
                      id="nome"
                      name="nome"
                      type="text"
                      required
                      placeholder="Seu nome completo"
                      className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </motion.div>

                  <motion.div variants={formField}>
                    <label
                      htmlFor="whatsapp"
                      className="block text-sm font-medium text-text-secondary mb-1.5"
                    >
                      WhatsApp
                    </label>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      required
                      placeholder="(11) 99999-9999"
                      className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent-blue transition-colors"
                    />
                  </motion.div>

                  <motion.div variants={formField}>
                    <label
                      htmlFor="faturamento"
                      className="block text-sm font-medium text-text-secondary mb-1.5"
                    >
                      Faturamento mensal
                    </label>
                    <select
                      id="faturamento"
                      name="faturamento"
                      required
                      className="w-full bg-bg-card border border-border-default rounded-lg px-4 py-3 text-sm text-text-primary focus:outline-none focus:border-accent-blue transition-colors"
                    >
                      <option value="">Selecione</option>
                      <option value="ate-30k">Até R$30k</option>
                      <option value="30k-60k">R$30k - R$60k</option>
                      <option value="60k-120k">R$60k - R$120k</option>
                      <option value="120k-300k">R$120k - R$300k</option>
                      <option value="acima-300k">Acima de R$300k</option>
                    </select>
                  </motion.div>

                  {erro && (
                    <p
                      role="alert"
                      className="text-sm text-red-400 bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2"
                    >
                      {erro}
                    </p>
                  )}

                  <motion.div variants={formField}>
                    <button
                      type="submit"
                      disabled={enviando}
                      className="w-full bg-accent-blue hover:bg-accent-blue-light text-white font-semibold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {enviando ? "Enviando..." : "Falar com a equipe"}
                      {!enviando && <Send size={16} />}
                    </button>
                  </motion.div>

                  <motion.div variants={formField} className="flex items-center justify-center gap-2 text-text-muted text-xs pt-1">
                    <Shield size={12} />
                    <span>Seus dados estão seguros conosco.</span>
                  </motion.div>
                </motion.form>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
