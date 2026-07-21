"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// cover: a arte já vem com fundo próprio, então preenche o chip inteiro.
// Sem isso sobraria a moldura clara do chip em volta da imagem.
//
// Atenção: os nomes batem exatamente com os arquivos em public/logos/.
// O container roda Linux, onde o caminho diferencia maiúsculas de minúsculas.
const clientes = [
  {
    nome: "MussesFit by Flávia Menezes",
    src: "/logos/Logo-missesFit.png",
    cover: false,
  },
  { nome: "Sicoob AC Credi", src: "/logos/Logo.webp", cover: false },
  {
    nome: "Pimenta Verde Uniformes Premium",
    src: "/logos/logo-pimenta.webp",
    cover: false,
  },
  {
    nome: "Liene Lopes Tatuadora",
    src: "/logos/liene-lopes.jpeg",
    cover: true,
  },
  {
    nome: "Marília Morelli Marmitaria da Nutri",
    src: "/logos/marilia-morelli-logo.jpeg",
    cover: true,
  },
];

type Cliente = (typeof clientes)[number];

function Chip({ c, className = "" }: { c: Cliente; className?: string }) {
  return (
    <div
      className={`flex h-28 items-center justify-center overflow-hidden rounded-xl border border-border-default bg-white/85 opacity-70 grayscale transition-all duration-300 hover:border-accent-blue/40 hover:bg-white hover:opacity-100 hover:grayscale-0 ${
        c.cover ? "" : "p-4"
      } ${className}`}
    >
      <Image
        src={c.src}
        alt={c.nome}
        width={190}
        height={112}
        unoptimized
        className={
          c.cover
            ? "h-full w-full object-cover"
            : "max-h-full max-w-full object-contain"
        }
      />
    </div>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Clientes() {
  return (
    <section className="relative border-y border-border-default bg-bg-primary py-14 z-[1]">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5 }}
        className="mb-10 px-6 text-center text-xs font-semibold uppercase tracking-[0.2em] text-text-muted"
      >
        Empresas que já atendemos
      </motion.p>

      {/* Mobile: carrossel automático, ~2 logos por vez.
          A lista é duplicada para o loop emendar sem salto. */}
      <div className="marquee-clientes-wrapper relative overflow-hidden sm:hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-bg-primary to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-bg-primary to-transparent" />

        {/* 40vw por chip: duas cabem inteiras na tela, com uma leve
            aparição da terceira sinalizando que a lista continua. */}
        <div className="marquee-clientes flex w-max gap-3 px-3">
          {[...clientes, ...clientes].map((c, i) => (
            <Chip key={`${c.nome}-${i}`} c={c} className="w-[40vw] shrink-0" />
          ))}
        </div>
      </div>

      {/* Desktop: todas visíveis, centralizadas */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className="mx-auto hidden max-w-6xl flex-wrap items-center justify-center gap-5 px-6 sm:flex"
      >
        {clientes.map((c) => (
          <motion.div key={c.nome} variants={item}>
            <Chip c={c} className="w-44" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
