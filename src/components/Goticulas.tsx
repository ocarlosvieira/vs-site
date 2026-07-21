import styles from "./Goticulas.module.css";

/**
 * Timing de cada gotícula: [duração, delay] das duas animações (fairyMove, fairyFade).
 * Valores fixos (não aleatórios) para dessincronizar as partículas sem quebrar a
 * hidratação do React. Extraídos do site original (12 partículas visíveis).
 */
const TIMINGS: ReadonlyArray<{ duration: string; delay: string }> = [
  { duration: "55s, 7s", delay: "0s, 0s" },
  { duration: "62s, 8s", delay: "-8s, -1s" },
  { duration: "58s, 7.5s", delay: "-14s, -2s" },
  { duration: "66s, 8.5s", delay: "-20s, -3s" },
  { duration: "60s, 9s", delay: "-26s, -1.5s" },
  { duration: "70s, 7s", delay: "-32s, -2.5s" },
  { duration: "57s, 7.8s", delay: "-38s, -1s" },
  { duration: "64s, 9s", delay: "-44s, -4s" },
  { duration: "59s, 7.2s", delay: "-50s, -2s" },
  { duration: "68s, 8.8s", delay: "-56s, -3s" },
  { duration: "61s, 7.6s", delay: "-62s, -1s" },
  { duration: "73s, 9.2s", delay: "-68s, -4s" },
];

type GoticulasProps = {
  /** Quantas gotículas renderizar. O site original mostra 12. */
  count?: number;
  /** Cor das partículas. Padrão: lilás #dccbff (igual ao original). */
  color?: string;
  /**
   * Camada de empilhamento dentro da seção.
   * 3 = acima do vídeo/aurora e abaixo do texto (padrão).
   * Use um valor maior que o do texto para as gotículas passarem por cima dele.
   */
  zIndex?: number;
};

/**
 * "Gotículas" flutuantes (fairy dust) animadas, em CSS puro — sem JavaScript
 * e sem bloquear cliques (pointer-events: none).
 *
 * Ocupa todo o ancestral posicionado mais próximo, então o elemento pai
 * precisa ter position relative/absolute/sticky. Uso: <Goticulas /> dentro
 * da seção onde o efeito deve aparecer.
 */
export default function Goticulas({
  count = 12,
  color = "#dccbff",
  zIndex = 3,
}: GoticulasProps) {
  return (
    <div
      aria-hidden
      className={styles.layer}
      style={
        {
          "--goticula-color": color,
          "--goticula-z": zIndex,
        } as React.CSSProperties
      }
    >
      {Array.from({ length: count }).map((_, i) => {
        const t = TIMINGS[i % TIMINGS.length];
        return (
          <span
            key={i}
            className={styles.goticula}
            style={{ animationDuration: t.duration, animationDelay: t.delay }}
          />
        );
      })}
    </div>
  );
}
