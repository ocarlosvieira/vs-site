# Design System — VS Growth Site

> Baseado na analise do modelo `ux/modelo I.png`

---

## 1. Visao Geral

| Propriedade | Valor |
|-------------|-------|
| Estilo | Dark premium SaaS |
| Tom visual | Profissional, moderno, tech-forward |
| Layout | Single-page landing com secoes empilhadas |
| Abordagem | Cards + gradientes sutis + glassmorphism controlado |

---

## 2. Paleta de Cores

### Backgrounds (Fundos)

| Token | Hex | Uso |
|-------|-----|-----|
| `bg-primary` | `#0A0E1A` | Fundo principal da pagina |
| `bg-secondary` | `#111827` | Fundo de secoes alternadas |
| `bg-card` | `#1A1F2E` | Cards e containers |
| `bg-card-hover` | `#232838` | Hover state dos cards |
| `bg-elevated` | `#252A3A` | Elementos elevados |

### Accent (Destaques)

| Token | Hex | Uso |
|-------|-----|-----|
| `accent-blue` | `#3B82F6` | CTA primario, links, destaques |
| `accent-blue-light` | `#60A5FA` | Hover do accent blue |
| `accent-orange` | `#F97316` | Destaques secundarios, badges, sublinhados |
| `accent-orange-light` | `#FB923C` | Hover do accent orange |
| `accent-gradient` | `linear-gradient(135deg, #3B82F6, #8B5CF6)` | Gradiente hero/glow |
| `accent-warm-gradient` | `linear-gradient(135deg, #F97316, #EF4444)` | Gradiente de destaque quente |

### Texto

| Token | Hex | Uso |
|-------|-----|-----|
| `text-primary` | `#F9FAFB` | Titulos e texto principal |
| `text-secondary` | `#9CA3AF` | Subtitulos e texto de apoio |
| `text-muted` | `#6B7280` | Labels, placeholders |
| `text-accent` | `#3B82F6` | Links e palavras destacadas |

### Borders

| Token | Hex | Uso |
|-------|-----|-----|
| `border-default` | `#1F2937` | Bordas de cards |
| `border-subtle` | `#374151` | Divisores |
| `border-accent` | `#3B82F640` | Bordas com accent (40% opacidade) |

---

## 3. Tipografia

### Font Families

| Token | Fonte | Uso |
|-------|-------|-----|
| `font-display` | **Space Grotesk** | Titulos, headings (display, h1, h2, h3), logo, hero text |
| `font-body` | **DM Sans** | Corpo de texto, subtitulos, labels, botoes, navegacao |
| `font-mono` | JetBrains Mono | Code snippets, dados tecnicos |

### Font Stack
```
--font-display: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Escala Tipografica

| Nivel | Fonte | Tamanho | Peso | Line-height | Uso |
|-------|-------|---------|------|-------------|-----|
| `display` | Space Grotesk | 48-56px | 700 (Bold) | 1.1 | Hero title |
| `h1` | Space Grotesk | 36-40px | 700 (Bold) | 1.2 | Titulos de secao |
| `h2` | Space Grotesk | 28-32px | 600 (Semibold) | 1.3 | Subtitulos de secao |
| `h3` | Space Grotesk | 22-24px | 600 (Semibold) | 1.4 | Titulos de cards |
| `body` | DM Sans | 16px | 400 (Regular) | 1.6 | Texto corrido |
| `body-sm` | DM Sans | 14px | 400 (Regular) | 1.5 | Texto secundario |
| `caption` | DM Sans | 12px | 500 (Medium) | 1.4 | Labels, badges |
| `button` | DM Sans | 14-16px | 600 (Semibold) | 1 | Botoes |
| `nav` | DM Sans | 14px | 500 (Medium) | 1 | Links de navegacao |

### Racional
- **Space Grotesk**: Geometrica, moderna, com personalidade tech — ideal para headings e branding
- **DM Sans**: Clean, legivel, neutra — perfeita para corpo de texto e UI elements
- O contraste entre as duas cria hierarquia visual clara sem conflito de estilos

---

## 4. Espacamento

Escala baseada em **4px**:

| Token | Valor | Uso |
|-------|-------|-----|
| `space-1` | 4px | Micro gaps |
| `space-2` | 8px | Gaps internos de componentes |
| `space-3` | 12px | Padding interno de badges |
| `space-4` | 16px | Padding interno de cards |
| `space-5` | 20px | Gap entre elementos |
| `space-6` | 24px | Padding de cards |
| `space-8` | 32px | Gap entre componentes |
| `space-10` | 40px | Margem entre blocos |
| `space-12` | 48px | Gap entre secoes |
| `space-16` | 64px | Padding vertical de secoes |
| `space-20` | 80px | Espacamento grande entre secoes |
| `space-24` | 96px | Padding vertical hero |

---

## 5. Border Radius

| Token | Valor | Uso |
|-------|-------|-----|
| `radius-sm` | 6px | Badges, tags |
| `radius-md` | 8px | Inputs, botoes pequenos |
| `radius-lg` | 12px | Cards |
| `radius-xl` | 16px | Cards grandes, modais |
| `radius-2xl` | 24px | Botoes pill |
| `radius-full` | 9999px | Avatares, icones circulares |

---

## 6. Sombras e Efeitos

| Token | Valor | Uso |
|-------|-------|-----|
| `shadow-card` | `0 4px 24px rgba(0,0,0,0.3)` | Cards padrao |
| `shadow-elevated` | `0 8px 32px rgba(0,0,0,0.4)` | Cards hover/elevados |
| `shadow-glow-blue` | `0 0 40px rgba(59,130,246,0.15)` | Glow azul no hero |
| `shadow-glow-orange` | `0 0 40px rgba(249,115,22,0.15)` | Glow laranja |
| `blur-glass` | `backdrop-filter: blur(12px)` | Efeito glassmorphism |

---

## 7. Componentes Identificados

### 7.1 Navbar
- Fundo: `bg-primary` com blur (glass)
- Links: `text-secondary`, hover `text-primary`
- CTA: botao accent-blue com radius-2xl

### 7.2 Hero Section
- Glow radial azul/roxo atras do titulo
- Titulo: `display` com palavra destacada em `accent-orange`
- Subtitulo: `text-secondary`
- 2 botoes: primario (filled blue) + secundario (outline)
- Trust badges abaixo (logos ou icones)

### 7.3 Feature Cards (Grid)
- Grid 3-4 colunas
- Background: `bg-card` com borda `border-default`
- Icone no topo (24px, cor accent)
- Titulo: `h3`
- Descricao: `body-sm`, `text-secondary`
- Hover: borda muda para `border-accent`, sutil elevacao

### 7.4 Tech Stack Icons
- Grid horizontal de icones/logos
- Fundo circular ou arredondado
- Label abaixo de cada icone

### 7.5 "How It Works" (Timeline/Steps)
- Fundo: `bg-secondary`
- Layout vertical com steps numerados
- Cada step: numero + titulo + descricao + screenshot/preview
- Screenshots com borda arredondada e sombra

### 7.6 Demo Gallery
- Grid de cards com thumbnails
- Imagem com overlay sutil no hover
- Titulo e tags abaixo

### 7.7 CTA Final
- Fundo com gradiente sutil
- Titulo grande + subtitulo
- Botao CTA centralizado
- Elementos decorativos (glow, particulas)

### 7.8 Botoes

| Variante | Background | Texto | Border |
|----------|-----------|-------|--------|
| Primary | `accent-blue` | `white` | none |
| Secondary | `transparent` | `text-primary` | `border-default` |
| Ghost | `transparent` | `text-secondary` | none |
| Accent | `accent-orange` | `white` | none |

---

## 8. Breakpoints

| Token | Valor | Uso |
|-------|-------|-----|
| `mobile` | 0 - 639px | 1 coluna, stack vertical |
| `tablet` | 640px - 1023px | 2 colunas |
| `desktop` | 1024px - 1279px | 3 colunas |
| `wide` | 1280px+ | Layout completo, max-width container |

### Container
```
max-width: 1280px
padding-inline: 24px (mobile) / 32px (desktop)
margin: 0 auto
```

---

## 9. Animacoes Sugeridas

| Elemento | Animacao | Duracao | Easing |
|----------|----------|---------|--------|
| Cards hover | `translateY(-4px) + shadow` | 200ms | ease-out |
| Fade in on scroll | `opacity 0→1 + translateY(20px→0)` | 400ms | ease-out |
| Glow pulse | `opacity 0.5→1→0.5` | 3s | ease-in-out |
| Button hover | `background lighten 10%` | 150ms | ease |
| Navbar scroll | `backdrop-filter blur toggle` | 200ms | ease |

---

## 10. Secoes do Layout (ordem)

1. **Navbar** — fixo no topo com glass blur
2. **Hero** — titulo + subtitulo + CTAs + glow background
3. **Features Grid** — "Everything You Need" — grid de cards
4. **Tech Stacks** — icones das tecnologias suportadas
5. **How It Works** — steps verticais com previews
6. **Demo Gallery** — grid de demos/exemplos
7. **CTA Final** — chamada para acao com gradiente
8. **Footer** — links + copyright
