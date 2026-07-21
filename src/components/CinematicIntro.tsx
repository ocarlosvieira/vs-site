"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Pointer } from "lucide-react";
import Goticulas from "@/components/Goticulas";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STYLES = `
.cinematic-intro-wrapper {
  -webkit-font-smoothing: antialiased;
}

@keyframes intro-breathe {
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
  100% { transform: translate(-50%, -50%) scale(1.15); opacity: 0.7; }
}

.intro-aurora {
  background: radial-gradient(
    circle at 50% 50%,
    rgba(82, 151, 254, 0.12) 0%,
    rgba(2, 49, 157, 0.08) 40%,
    transparent 70%
  );
  animation: intro-breathe 8s ease-in-out infinite alternate;
}

.intro-text-glow {
  background: linear-gradient(180deg, #f9fafb 0%, rgba(82, 151, 254, 0.6) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0px 0px 30px rgba(82, 151, 254, 0.2));
}

.intro-scroll-hint {
  animation: intro-pulse 2s ease-in-out infinite;
}

@keyframes intro-pulse {
  0%, 100% { opacity: 0.4; transform: translateY(0); }
  50% { opacity: 1; transform: translateY(8px); }
}

/* Mobile: o dedo sobe (no touch, deslizar para cima rola a página para baixo) */
.intro-swipe-hint {
  animation: intro-swipe 2s ease-in-out infinite;
}

@keyframes intro-swipe {
  0%, 100% { opacity: 0.45; transform: translateY(6px); }
  50% { opacity: 1; transform: translateY(-6px); }
}
`;

export default function CinematicIntro() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !wrapperRef.current) return;

    const ctx = gsap.context(() => {
      // Intro text fades out first (0% → 30%)
      gsap.fromTo(
        introTextRef.current,
        { y: 0, opacity: 1 },
        {
          y: -100,
          opacity: 0,
          ease: "power2.in",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top",
            end: "30% top",
            scrub: 1,
          },
        }
      );

      // Hero content fades in AFTER intro is gone (35% → 60%)
      gsap.fromTo(
        heroContentRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "35% top",
            end: "60% top",
            scrub: 1,
          },
        }
      );

    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  // Entry animations (non-scroll)
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.fromTo(
      introTextRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Video Background — fixed parallax */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover grayscale"
        >
          <source src="/video/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-bg-primary/50" />
      </div>

      <div
        ref={wrapperRef}
        className="relative h-[250vh] w-full cinematic-intro-wrapper z-[1]"
      >
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">

          {/* Aurora glow */}
          <div className="intro-aurora absolute left-1/2 top-1/2 h-[60vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[100px] pointer-events-none z-[1]" />

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-bg-primary to-transparent pointer-events-none z-[2]" />

          {/* Gotículas — restritas à hero (recortadas pelo overflow-hidden acima) */}
          <Goticulas />

          {/* ============ INTRO TEXT (visible initially, fades out on scroll) ============ */}
          <div
            ref={introTextRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: 0 }}
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] tracking-tight text-text-primary">
              Destrave os resultados
              <br />
              <span className="hero-italic-accent">da sua empresa.</span>
            </h2>
            {/* Indicador de scroll — mouse no desktop, dedo deslizando no mobile */}
            <div className="mt-8 flex flex-col items-center gap-2">
              {/* Desktop: mouse com a rodinha descendo */}
              <div className="hidden sm:flex w-6 h-10 rounded-full border-2 border-text-muted/50 items-start justify-center pt-2">
                <div className="w-1 h-2.5 rounded-full bg-text-muted/70 intro-scroll-hint" />
              </div>

              {/* Mobile: dedo fazendo swipe para cima */}
              <Pointer
                size={26}
                strokeWidth={1.5}
                className="sm:hidden text-text-muted intro-swipe-hint"
                aria-hidden
              />

              <span className="text-text-muted text-xs tracking-widest uppercase">
                <span className="hidden sm:inline">Scroll</span>
                <span className="sm:hidden">Deslize</span>
              </span>

              {/* Seta só no desktop: no mobile ela contradiria o gesto de subir o dedo */}
              <svg
                className="hidden sm:block w-4 h-4 text-text-muted intro-scroll-hint"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>

          {/* ============ HERO CONTENT (hidden initially, fades in on scroll) ============ */}
          <div
            ref={heroContentRef}
            className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: 0 }}
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight text-text-primary">
              Não é só sobre cliques.{" "}
              <br className="hidden sm:block" />
              É sobre{" "}
              <span className="hero-italic-accent">lucrar de verdade.</span>
            </h1>

            <p className="text-base sm:text-lg text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              Planejamos e construímos toda a estrutura de marketing digital
              que sua empresa precisa para crescer com consistência.
            </p>

            {/* CTA */}
            <a
              href="#cta"
              className="group inline-flex items-center gap-2 bg-green-400 text-bg-primary font-semibold px-8 py-4 rounded-full transition-all hover:bg-green-300 text-sm tracking-wide"
            >
              Falar com a equipe
              <ArrowUpRight
                size={16}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </a>
          </div>

        </div>
      </div>
    </>
  );
}
