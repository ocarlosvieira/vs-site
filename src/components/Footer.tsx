// O lucide v1 não traz ícones de marca (removidos por questão de trademark),
// então usamos equivalentes genéricos.
import { AtSign, MessageCircle, Globe } from "lucide-react";

const servicos = [
  { label: "Tráfego Pago", href: "#solucao" },
  { label: "Funil de Vendas", href: "#funil" },
  { label: "CRM", href: "#solucao" },
  { label: "Automações", href: "#solucao" },
  { label: "Metodologia", href: "#como-funciona" },
  { label: "Para Quem", href: "#para-quem" },
];

// TODO: trocar os href por URLs reais (Instagram, WhatsApp, site).
// Enquanto não existirem, apontam para o formulário de contato.
const contatos = [
  { label: "Instagram", href: "#cta", Icon: AtSign },
  { label: "WhatsApp", href: "#cta", Icon: MessageCircle },
  { label: "Site", href: "#cta", Icon: Globe },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-default px-6 pt-16 pb-8 section-bg-6 z-[1] relative">
      <div className="max-w-6xl mx-auto">
        {/* Três colunas */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Marca */}
          <div>
            <div className="font-display text-2xl font-bold text-text-primary">
              VS <span className="text-accent-blue">Growth</span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-secondary">
              Planejamos e construímos toda a estrutura de marketing digital que
              sua empresa precisa para crescer com consistência.
            </p>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Serviços
            </h3>
            <ul className="space-y-3">
              {servicos.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-text-secondary transition-colors hover:text-accent-blue-light"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
              Contato
            </h3>
            <div className="flex items-center gap-3">
              {contatos.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-border-default bg-bg-card text-text-secondary transition-colors hover:border-accent-blue/40 hover:text-accent-blue-light"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>

            <a
              href="#cta"
              className="mt-6 inline-block text-sm text-text-secondary transition-colors hover:text-accent-blue-light"
            >
              Falar com a equipe
            </a>
          </div>
        </div>

        {/* Divisória */}
        <div className="my-10 h-px bg-gradient-to-r from-transparent via-border-default to-transparent" />

        {/* Barra inferior */}
        <div className="flex flex-col items-center justify-between gap-3 text-center font-mono text-xs text-text-muted sm:flex-row sm:text-left">
          <p>&copy; 2026 VS Growth. Todos os direitos reservados.</p>
          <p>Não é só sobre cliques. É sobre lucrar de verdade.</p>
        </div>
      </div>
    </footer>
  );
}
