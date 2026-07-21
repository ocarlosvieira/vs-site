"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Star } from "lucide-react";

const smooth = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: smooth },
  },
};

const fadeScale = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: smooth },
  },
};

const avatarVariant = {
  hidden: { opacity: 0, scale: 0, x: -10 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.4, delay: 0.8 + i * 0.08, type: "spring" as const, stiffness: 200, damping: 15 },
  }),
};

const starVariant = {
  hidden: { opacity: 0, scale: 0, rotate: -30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: { duration: 0.3, delay: 1.1 + i * 0.06, type: "spring" as const, stiffness: 250, damping: 12 },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Video Background */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: smooth }}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-bg-primary/40" />
      </motion.div>

      {/* 3D Perspective Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        className="hero-grid-wrapper"
      >
        <div className="hero-grid" />
      </motion.div>

      {/* Top radial glow */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent-blue/5 rounded-full blur-[120px] pointer-events-none"
      />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none z-[2]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center"
      >
        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
        >
          Não é só sobre cliques.{" "}
          <br className="hidden sm:block" />
          É sobre{" "}
          <span className="hero-italic-accent">lucrar de verdade.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={fadeUp}
          className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Planejamos e construímos toda a estrutura de marketing digital
          que sua empresa precisa para crescer com consistência.
        </motion.p>

        {/* Social Proof Row */}
        <motion.div variants={fadeScale} className="flex items-center gap-4 mb-8">
          {/* Avatars with spring pop */}
          <div className="flex -space-x-3">
            {["bg-accent-blue", "bg-accent-orange", "bg-accent-purple", "bg-green-400"].map(
              (color, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={avatarVariant}
                  initial="hidden"
                  animate="visible"
                  className={`w-10 h-10 rounded-full ${color} border-2 border-bg-primary flex items-center justify-center text-white text-xs font-bold`}
                >
                  {["VS", "M", "G", "A"][i]}
                </motion.div>
              )
            )}
          </div>
          {/* Stars + text */}
          <div className="flex flex-col items-start">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={starVariant}
                  initial="hidden"
                  animate="visible"
                >
                  <Star
                    size={14}
                    className="text-accent-orange"
                    fill="currentColor"
                  />
                </motion.div>
              ))}
            </div>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="text-xs text-text-secondary"
            >
              Estratégias que aceleram resultados
            </motion.span>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div variants={fadeUp}>
          <motion.a
            href="#cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 bg-white text-bg-primary font-semibold px-8 py-4 rounded-full transition-colors hover:bg-gray-200 text-sm tracking-wide"
          >
            Falar com a equipe
            <ArrowUpRight
              size={16}
              className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
            />
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#metricas" className="text-text-muted hover:text-text-secondary transition-colors">
          <ChevronDown size={24} className="animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
}
