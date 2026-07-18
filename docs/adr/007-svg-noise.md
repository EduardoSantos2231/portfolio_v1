# ADR-007 · Filtros SVG inline para texturas

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

O design exige textura (grain, ruído, carimbo) em superfícies de
concreto e papel, mesmo na camada baseline — antes de qualquer
carregamento de texturas WebP (nível 2) e sem depender de WebGL
(nível 3).

A textura baseline precisa:
- Funcionar sem requisições HTTP extras.
- Ser estática (nunca animada).
- Ser monocromática.
- Não afetar a legibilidade do texto.
- Degradar graciosamente (se o navegador não suportar SVG filters,
  a superfície fica com cor plana — sem quebra visual).

---

## Decisão

**Filtros SVG inline** (`<feTurbulence>`) aplicados via
`filter: url(#grain)` no CSS.

Três filtros definidos em um `<svg aria-hidden="true">` oculto no
início do `<body>`:

1. **`#grain`** — ruído fractal monocromático (grain de filme).
   `feTurbulence` → `feColorMatrix` (saturate=0) → blend multiply.
2. **`#stamp-rough`** — borda irregular de carimbo.
   `feTurbulence` → `feDisplacementMap` (escala 2px).
3. **`#glitch-offset`** — deslocamento para efeito glitch.
   `feTurbulence` com seed variável → `feDisplacementMap`.

Os filtros são aplicados via classes CSS como pseudo-elementos
(`::after`), não diretamente em elementos de conteúdo — garantindo
que texto nunca seja texturizado.

---

## Justificativa

**Zero requisições HTTP:** O SVG é inline no HTML (~300 bytes).
Sem arquivos externos, sem latência de rede.

**Zero JavaScript:** Filtros SVG são aplicados via CSS. Nenhum
canvas, nenhuma manipulação de pixel em runtime.

**Degradação graciosa:** Se o navegador não suporta `filter: url()`,
a propriedade é ignorada — a superfície permanece com cor plana
definida pelo `background-color`. Não há estado quebrado.

**Performance:** `<feTurbulence>` com `numOctaves="3"` e
`baseFrequency="0.65"` é leve — processado pela GPU em navegadores
modernos. Sem repaint contínuo (textura estática).

**Monocromático:** `<feColorMatrix type="saturate" values="0">`
remove toda a cor do ruído, gerando apenas variação de luminância —
exatamente o que o design especifica (grain de filme preto e branco).

---

## Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **Canvas 2D com `getImageData`** | JavaScript obrigatório. Manipulação de pixel em CPU — performance ruim. Preenchimento inicial visível (flicker). |
| **Imagens PNG de textura** | Requisição HTTP extra. Sem escala: textura em mobile fica pixelada ou grande demais. |
| **CSS `backdrop-filter`** | Proibido pelo design — `backdrop-filter: blur()` é banido. `backdrop-filter: contrast()` não oferece controle fino. |
| **WebGL (nível 3)** | Overkill para baseline. Nem todo dispositivo suporta WebGL2. O design exige que a identidade exista sem shaders. |
| **CSS `background-image` com `radial-gradient` para pontos** | Muito repetitivo e artificial. Não simula ruído natural. Gradientes radiais são banidos. |

---

## Consequências

**Positivas:**
- ~300 bytes de SVG produzem textura em todas as superfícies.
- Sem dependências. Sem requisições. Sem JavaScript.
- Texto nunca é afetado (filtro aplicado em `::after` com `pointer-events: none`).
- Degradação natural para cor plana em navegadores antigos.

**Negativas:**
- Controle limitado sobre o padrão de ruído (Perlin via `feTurbulence`
  é aproximado, não idêntico ao ruído de filme real).
  Mitigação: aceitável — a textura é atmosfera, não réplica exata.
- Alguns navegadores (Safari <15, navegadores muito antigos) têm
  bugs com `feDisplacementMap`. Mitigação: fallback natural para
  cor plana.

**Ações:**
- Injetar `<svg>` oculto no `<body>` via `PortfolioLayout.astro`.
- Classes `.surface-grain`, `.stamp-border` em `noise.css`.
- Verificar `--texture-level >= 1` antes de aplicar filtros.
- `prefers-reduced-data: reduce` → `--texture-level: 0` → sem filtros.

---

## Referências

- `docs/engineering/04-css-architecture.md` — noise.css e SVG de filtros.
- `docs/engineering/07-asset-pipeline.md` — níveis progressivos de textura.
- `docs/design/08-material-atmosphere.md` — tipos de textura e intensidades.
- `docs/design/19-visual-language.md` — Ruído como imperfeição material.
- ADR-008 (WebGL strategy).
