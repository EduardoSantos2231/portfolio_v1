# 04 · ARQUITETURA DE CSS

> Origem: `docs/design/05-chromatic-atmosphere.md`
> Origem: `docs/design/08-material-atmosphere.md`
> Origem: `docs/design/09-surface-and-tactility.md`
> Origem: `docs/design/01-principles.md`

---

## Estratégia de CSS

**Decisão: CSS Modules + Custom Properties** (ver ADR-002 em `12-architecture-decisions.md`).

### Justificativa resumida

| Fator | CSS Modules + Custom Properties |
|---|---|
| **Alinhamento com o design** | Máximo. CSS padrão obedece o design sem atrito. |
| **Enforcement das proibições** | Stylelint com regras customizadas — mecânico, confiável. |
| **Escopo por componente** | Nativo (`.module.css`). |
| **Tokens** | Custom properties no `:root`. |
| **Output** | Apenas o CSS usado (tree-shaking do Vite). |
| **Portabilidade** | CSS padrão — migração trivial entre frameworks. |
| **Curva de IA** | CSS padrão é universalmente compreendido por agentes. |

### Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **Tailwind CSS** | Conflito direto com ~40% das regras do design. Exigiria desabilitar `rounded-*`, `shadow-*`, `backdrop-blur-*`, reescrever a escala de cores. O custo de configurar o Tailwind para NÃO ser Tailwind excede o de usar CSS puro. Ver ADR-002 para análise detalhada. |
| **Vanilla Extract** | Type-safety nos tokens é atrativa, mas sintaxe proprietária (`style.ts`) reduz portabilidade e dificulta consumo por agentes de IA. Zero-runtime é positivo, mas CSS Modules também é zero-runtime. |
| **Panda CSS** | Similar ao VE: tokens tipados, mas sintaxe proprietária e padrões atômicos que exigem disciplina para não gerar CSS inflado. Sobrecarga de configuração desproporcional ao escopo do projeto (página única). |

---

## Organização de arquivos

```
src/styles/
├── tokens.css           # Custom properties (Foundation + Semantic + Mode + State)
├── fonts.css            # @font-face declarations
├── reset.css            # Reset mínimo
├── noise.css            # Filtros SVG e texturas CSS
├── layout.css           # Estilos compartilhados de layout (grid, margens)
│
├── tokens.ts            # Constantes TypeScript espelhando tokens
```

### reset.css

Reset mínimo. Nada de normalize.css ou ressurgência de opiniões alheias.

```css
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  -moz-text-size-adjust: 100%;
  text-size-adjust: 100%;
}

body {
  min-height: 100dvh;
  line-height: var(--type-leading-body);
  font-family: var(--type-voice-serif);
  font-size: var(--type-size-body);
  color: var(--color-text-primary);
  background-color: var(--color-surface-monumental);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

img, picture, video, canvas, svg {
  display: block;
  max-inline-size: 100%;
}

/* border-radius: 0 é o padrão. Não resetar para outro valor. */
```

### fonts.css

```css
@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'IBM Plex Mono';
  src: url('/fonts/ibm-plex-mono-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Source Serif 4';
  src: url('/fonts/source-serif-4-regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Source Serif 4';
  src: url('/fonts/source-serif-4-italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Source Serif 4';
  src: url('/fonts/source-serif-4-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk-medium.woff2') format('woff2');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/space-grotesk-bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
```

**Preload no `<head>` (apenas Space Grotesk Bold — usada no Hero acima da dobra):**
```html
<link rel="preload" href="/fonts/space-grotesk-bold.woff2" as="font" type="font/woff2" crossorigin>
```

---

## Tocais e texturas CSS

### noise.css

Define filtros SVG e classes de textura reutilizáveis.

```css
/* Filtros SVG — referenciados via filter: url(#grain) */
/* O SVG com os filtros é injetado no HTML como elemento oculto */

/* --- Grain monocromático --- */
.surface-grain {
  position: relative;
}

.surface-grain::after {
  content: '';
  position: absolute;
  inset: 0;
  filter: url(#grain);
  opacity: 0.04;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: multiply;
}

/* --- Scanlines sobre imagens --- */
.image-scanlines {
  position: relative;
}

.image-scanlines::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    transparent 0px,
    rgba(0, 0, 0, 0.03) 1px,
    transparent 2px
  );
  pointer-events: none;
  z-index: 2;
}

/* --- Vinheta sobre imagens --- */
.image-vignette {
  position: relative;
}

.image-vignette::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse at center,
    transparent 60%,
    rgba(0, 0, 0, 0.15) 100%
  );
  pointer-events: none;
  z-index: 2;
}

/* --- Borda irregular de carimbo --- */
.stamp-border {
  border: 1px solid var(--color-accent-annotation);
  filter: url(#stamp-rough);
}

/* --- Modo noturno: ajuste de intensidade das texturas --- */
[data-theme="dark"] .surface-grain::after {
  opacity: 0.08;  /* Mais perceptível no escuro */
}
```

---

## SVG de filtros (noise.svg)

Injetado inline no `<body>` como primeiro elemento.

```svg
<svg style="display: none" aria-hidden="true">
  <filter id="grain">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.65"
      numOctaves="3"
      stitchTiles="stitch"
    />
    <feColorMatrix type="saturate" values="0" />
    <feComponentTransfer>
      <feFuncA type="linear" slope="0.05" />
    </feComponentTransfer>
  </filter>

  <filter id="stamp-rough">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.04"
      numOctaves="3"
    />
    <feDisplacementMap in="SourceGraphic" scale="2" />
  </filter>

  <filter id="glitch-offset">
    <feTurbulence
      type="fractalNoise"
      baseFrequency="0.5 0.05"
      numOctaves="1"
      seed="1"
    />
    <feDisplacementMap in="SourceGraphic" scale="4" />
    <!-- seed alterado dinamicamente via JS para cada evento de glitch -->
  </filter>
</svg>
```

---

## Propriedades CSS banidas

As seguintes propriedades e valores devem ser bloqueadas via
Stylelint e/ou verificadas no CI. Ver `11-enforcement.md` para
configuração.

### Banimentos absolutos

| Propriedade/valor | Razão |
|---|---|
| `border-radius` com valor > `0` | Design: cantos vivos. Princípio da precisão. |
| `box-shadow` | Design: nada flutua. Material Design rejeitado. |
| `backdrop-filter: blur()` | Design: desfoque é fotográfico, não arquitetônico. |
| `transition` com `ease`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier()` | Design: movimento orgânico proibido. Apenas `linear` ou `steps()`. |
| `@keyframes` com `infinite` (exceto cursor blink) | Design: movimento perpétuo é distração. |
| `background-image: linear-gradient()` | Design: gradientes suaves = SaaS. |
| `background-image: radial-gradient()` | Idem. |
| `font-family` com valor de sistema (`sans-serif`, `monospace` sem fallback explícito) | Design: tipografia é identidade. |
| `opacity` como único meio de esconder elemento em transições | Design: fade-in proibido. Usar Scanner, Datilográfica, Trilho ou Disjuntor. |

### Valores banidos

| Valor | Substituir por |
|---|---|
| `#000000` | `var(--color-text-primary)` |
| `#FFFFFF` | `var(--color-surface-editorial)` ou `var(--color-accent-marble)` |
| `#0000FF` ou `#0000EE` (azul link) | `var(--color-accent-annotation)` |

### Layouts banidos

| Padrão | Razão |
|---|---|
| `display: flex; justify-content: center` como padrão | Alinhamento à esquerda é a âncora editorial. |
| `margin: 0 auto` em container principal | Centralização proibida sem justificativa funcional. |
| `width: 100%` para conteúdo (sem margens) | Conteúdo sem margens = perda de definição. |
| `position: fixed` para footer | Footer não é barra de ferramentas — é página final. |
| `overflow: hidden` para esconder scroll | Scroll hijacking. Visitante controla o scroll. |
| `scroll-behavior: smooth` | Scroll suave = orgânico. O scroll é do visitante, não do sistema. |
| `cursor: pointer` em elementos não-interativos | Falsa affordance. |

---

## Convenções de nomenclatura

### Classes: BEM modificado

```
.component-name
.component-name--modifier
.component-name__element
```

Sem aninhamento profundo (máximo 2 níveis). Sem utility classes.
Sem atomic CSS.

### Arquivos de estilo

```
ComponentName.astro → ComponentName.module.css
```

Um arquivo `.module.css` por componente. Estilos compartilhados
pertencem a `src/styles/layout.css` ou tokens.

---

## Grid de projetos (TechnicalLayout)

```css
.project-grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: 0;  /* gap é substituído por GridLine visível */
  border-top: 1px solid var(--color-grid-line);
}

/* Grid lines entre células */
.project-grid > * {
  border-right: 1px solid var(--color-grid-line);
  border-bottom: 1px solid var(--color-grid-line);
}
```

- `--grid-columns`: 3 (wide), 2 (medium), 1 (compact).
- Linhas de grid são elementos visíveis, não gaps CSS.
- `--color-grid-line` derivado de `--foundation-color-concrete-light`
  escurecido ~10% (simula aço).

---

## Tratamento de imagens (duotone)

O processamento real é feito no build (ver `07-asset-pipeline.md`).
No CSS, o componente `Image` aplica atmosfera:

```css
.project-image {
  position: relative;
  aspect-ratio: 1 / 1;
}

.project-image img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* border-radius: 0 (padrão, não declarar) */
  /* border: none (padrão, não declarar) */
}

/* Margem interna — simula papel fotográfico */
.project-image::before {
  content: '';
  position: absolute;
  inset: -6px;
  background: var(--color-surface-editorial);
  z-index: -1;
}

/* Crop marks nos cantos */
.project-image .crop-mark { /* renderizado via componente CropMark */ }

/* Scanlines + grain overlay */
.project-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      transparent 0px,
      rgba(0,0,0,0.04) 1px,
      transparent 2px
    );
  pointer-events: none;
  z-index: 2;
  filter: url(#grain);
}

/* Legenda */
.project-image + figcaption {
  font-family: var(--type-voice-mono);
  font-size: var(--type-size-micro);
  color: var(--color-accent-annotation);
  text-align: left;
  margin-block-start: var(--space-gap-inline);
}
```

---

## Modo diurno/noturno

### Detecção e toggle

```ts
// src/utils/theme.ts
const THEME_KEY = 'cmt-theme';

export function getTheme(): 'light' | 'dark' {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'light' || stored === 'dark') return stored;
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark' : 'light';
}

export function setTheme(theme: 'light' | 'dark') {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}
```

A troca é via Disjuntor (snap). Sem transição. Sem animação.

---

## Restrições de implementação

1. Nenhum componente importa `tokens.css` diretamente — tokens são
   carregados globalmente em `src/styles/tokens.css`, importado pelo layout raiz.

2. Nenhum arquivo `.module.css` declara `@import` de tokens — usa
   custom properties já definidas.

3. Nenhum estilo inline em componentes Astro — apenas classes de CSS Modules.

4. Media queries são usadas apenas para comportamento responsivo.
   Preferências de acessibilidade (`prefers-reduced-motion`, etc.)
   são configuradas como custom properties na camada STATE.
