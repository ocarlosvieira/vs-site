# Plano de Implementação: Landing Page para Agência de Tráfego 360

Este documento define a estratégia, arquitetura e passos de implementação para a nova Landing Page focada em captação de calls estratégicas.

## Objetivo
Criar uma Landing Page state-of-the-art para captar agendamentos de consultoria/sessão estratégica. O alvo principal são empresas de diversos nichos com faturamento de até R$ 120k. O grande diferencial a ser destacado é a **Solução 360** (Tráfego, Funis, Landing Pages e Copy).

> [!IMPORTANT]
> **User Review Required**
> Por favor, revise a estrutura da página proposta abaixo e as tecnologias. Se você aprovar, iniciaremos a criação do projeto Next.js.

## Stack Tecnológica
- **Framework**: Next.js (App Router)
- **Estilização**: Tailwind CSS (integrando as cores e estilos baseados no seu `design-tokens.json` atual)
- **Animações**: Framer Motion (para micro-interações, efeitos de scroll, e entrada de elementos - o visual "última geração")
- **Ícones**: Lucide React / Phosphor Icons
- **Tipografia**: Inter (conforme tokens)

## Estrutura da Página (Seções)

1. **Hero Section (Primeira Dobra)**
   - **Headline (Promessa)**: Focada em escalar vendas além do tráfego (ex: "Não é só sobre cliques, é sobre lucrar. Escalamos suas vendas com Tráfego, Funil e Copy.").
   - **Subheadline**: "Ajudamos empresas que faturam até 120k a romperem a barreira do crescimento com um ecossistema completo de vendas."
   - **CTA Principal**: "Agendar Sessão Estratégica"
   - **Visual**: Efeito de background com "glow" (usando os tokens blue/purple), elementos flutuantes sutis (Framer Motion).

2. **Seção de Diferencial (A Solução 360)**
   - Grid de cards com efeito glassmorphism demonstrando que o serviço não é apenas apertar botões no Gerenciador de Anúncios.
   - Tráfego Pago, Copywriting Persuasivo, Landing Pages de Alta Conversão, Automação de Funis.

3. **Seção de Dores / Para quem é**
   - Direcionado a quem quer chegar ao próximo nível (faturar acima dos 120k atuais).

4. **Social Proof (Resultados / Depoimentos)**
   - Gráficos minimalistas subindo ou depoimentos.

5. **Call to Action Final**
   - Foco total em levar o usuário para o formulário de agendamento (pode ser um Calendly embedado em um modal ou direcionamento direto).

## Proposed Changes

### Setup Inicial
- Inicializar um projeto Next.js em `d:\VS Growth Site` (ou numa subpasta, dependendo da sua organização).
- Configurar o Tailwind CSS para ler os valores de cores, fontes e espaçamentos presentes no arquivo `design-tokens.json`.

### Componentes Principais
#### [NEW] `components/Hero.tsx`
#### [NEW] `components/Services360.tsx`
#### [NEW] `components/CTA.tsx`
#### [NEW] `app/page.tsx`
#### [NEW] `tailwind.config.ts` (modificado)

## Open Questions

> [!WARNING]
> Tenho uma dúvida final antes de codificar:
> 1. Você gostaria que o projeto Next.js fosse criado diretamente na pasta `d:\VS Growth Site` (junto ao arquivo `design-tokens.json` já existente) ou prefere que eu crie uma nova pasta (ex: `d:\VS Growth Site\landing-page`)?

## Verification Plan

- Rodar o servidor local (`npm run dev`) para garantir que o Next.js e Tailwind estão configurados corretamente.
- Testar a responsividade da página no browser.
- Validar se as animações do Framer Motion estão suaves (acima de 60fps) e não prejudicam a usabilidade.
