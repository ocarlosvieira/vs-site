"use client";

import { motion, useReducedMotion } from "framer-motion";

const colunas = ["Novo", "Em contato", "Fechado"];

// O card parte de left:1.5% e anda em x (transform), medido em % da
// largura do próprio card (30.5% do quadro):
//   1 coluna  = 33.3% do quadro / 30.5% = 109.2%
//   2 colunas = 66.6% do quadro / 30.5% = 218.4%
const PARADAS = ["0%", "109.2%", "218.4%"];

// Lilás enquanto o lead está em aberto; verde quando fecha.
const LILAS = "#A4C5FF";
const LILAS_FUNDO = "rgba(164, 197, 255, 0.10)";
const LILAS_BORDA = "rgba(164, 197, 255, 0.40)";
const VERDE = "#4ADE80";
const VERDE_FUNDO = "rgba(74, 222, 128, 0.15)";
const VERDE_BORDA = "rgba(74, 222, 128, 0.55)";

const DURACAO = 5.5;

// Linha do tempo (fração da duração):
//   0.00-0.07  entra na coluna "Novo"
//   0.07-0.38  vai para "Em contato"
//   0.38-0.64  vai para "Fechado" (ainda lilás)
//   0.64-0.70  vira verde, já parado
//   0.70-0.90  segura o verde na tela
//   0.90-1.00  só então some, para o loop reiniciar
const TEMPOS = [0, 0.07, 0.38, 0.64, 0.7, 0.9, 1];

/** Mini-demo do card de CRM: o lead avançando pelas colunas do Kanban. */
export default function CrmViz() {
  const reduzMovimento = useReducedMotion();

  return (
    <div
      aria-hidden
      className="rounded-lg border border-border-default bg-white/[0.02] p-3"
    >
      {/* Cabeçalho das colunas */}
      <div className="mb-2 grid grid-cols-3 gap-2">
        {colunas.map((c) => (
          <span
            key={c}
            className="text-[9px] uppercase tracking-wider text-text-muted"
          >
            {c}
          </span>
        ))}
      </div>

      {/* Quadro */}
      <div className="relative grid grid-cols-3 gap-2">
        {colunas.map((c, i) => (
          <div
            key={c}
            className="min-h-[54px] space-y-1.5 rounded-md border border-dashed border-white/[0.07] bg-white/[0.015] p-1.5"
          >
            {/* Cards de contexto, para o quadro não parecer vazio */}
            {i === 0 && <div className="h-4 rounded bg-white/[0.05]" />}
            {i === 2 && (
              <>
                <div className="h-4 rounded bg-white/[0.05]" />
                <div className="h-4 rounded bg-white/[0.05]" />
              </>
            )}
          </div>
        ))}

        {/* Lead que avança de coluna em coluna */}
        <motion.div
          className="absolute left-[1.5%] top-[6px] w-[30.5%] rounded-md border px-1.5 py-1"
          style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.35)" }}
          initial={{
            x: PARADAS[0],
            opacity: 0,
            color: LILAS,
            backgroundColor: LILAS_FUNDO,
            borderColor: LILAS_BORDA,
          }}
          animate={
            reduzMovimento
              ? {
                  x: PARADAS[2],
                  opacity: 1,
                  color: VERDE,
                  backgroundColor: VERDE_FUNDO,
                  borderColor: VERDE_BORDA,
                }
              : {
                  // Some no fim e reaparece na primeira coluna, para o loop
                  // não mostrar o lead "voltando" no quadro.
                  x: [
                    PARADAS[0],
                    PARADAS[0],
                    PARADAS[1],
                    PARADAS[2],
                    PARADAS[2],
                    PARADAS[2],
                    PARADAS[2],
                  ],
                  opacity: [0, 1, 1, 1, 1, 1, 0],
                  color: [LILAS, LILAS, LILAS, LILAS, VERDE, VERDE, VERDE],
                  backgroundColor: [
                    LILAS_FUNDO,
                    LILAS_FUNDO,
                    LILAS_FUNDO,
                    LILAS_FUNDO,
                    VERDE_FUNDO,
                    VERDE_FUNDO,
                    VERDE_FUNDO,
                  ],
                  borderColor: [
                    LILAS_BORDA,
                    LILAS_BORDA,
                    LILAS_BORDA,
                    LILAS_BORDA,
                    VERDE_BORDA,
                    VERDE_BORDA,
                    VERDE_BORDA,
                  ],
                }
          }
          transition={
            reduzMovimento
              ? { duration: 0 }
              : {
                  duration: DURACAO,
                  repeat: Infinity,
                  times: TEMPOS,
                  ease: [0.65, 0, 0.35, 1],
                }
          }
        >
          {/* bg-current herda a cor animada do card acima */}
          <div className="mb-1 h-1 w-2/3 rounded-full bg-current opacity-70" />
          <div className="h-1 w-1/3 rounded-full bg-white/20" />
        </motion.div>
      </div>
    </div>
  );
}
