# 01 · DESIGN TOKENS

> Origem: `docs/design/05-chromatic-atmosphere.md`
> Origem: `docs/design/06-typographic-character.md`
> Origem: `docs/design/04-proportion-and-rhythm.md`
> Origem: `docs/design/07-temporal-behavior.md`
> Origem: `docs/design/08-material-atmosphere.md`

---

## Hierarquia de tokens

Os tokens são organizados em 4 camadas. Cada camada superior referencia a
inferior. Nenhuma camada é pulada.

```
CAMADA 3 · STATE    (sobrescritas condicionais: motion, contraste, textura)
CAMADA 2 · MODE     (sobrescritas por esquema de cor: light / dark)
CAMADA 1 · SEMANTIC (tokens com significado funcional — usados por componentes)
CAMADA 0 · FOUNDATION (valores atômicos brutos — a fonte da verdade)
```

**Regra de governança:**

1. Componentes consomem exclusivamente tokens da camada SEMANTIC.
2. Tokens MODE sobrescrevem SEMANTIC. Nunca Foundation.
3. Tokens STATE sobrescrevem qualquer camada (última cascata).
4. Foundation muda em um lugar. Toda a cascata se atualiza.
5. Não existem tokens de componente (`--hero-title-size`). Se dois componentes
   precisam do mesmo valor, ele pertence à camada SEMANTIC.

---

## CAMADA 0 · FOUNDATION

Valores atômicos. Nenhum componente os referencia diretamente.

### Cores

Cada cor possui um material de origem declarado no design.

```css
:root {
  /* --- Concreto --- */
  --foundation-color-concrete-light: #D4CFC8;
    /* Cinza quente. Simula concreto sob luz solar difusa.
       Não é cinza frio (Material Design). Não é bege.
       Referência: Lina Bo Bardi, SESC Pompeia. */

  --foundation-color-concrete-dark: #2A2724;
    /* Cinza escuro. Concreto à noite sob luz artificial.
       Não é #1a1a1a (preto de terminal). Mantém temperatura. */

  /* --- Papel --- */
  --foundation-color-paper-light: #F5F0E8;
    /* Creme claro. Página de livro novo com leve envelhecimento.
       Nunca #FFFFFF (branco é clínico, é SaaS). */

  --foundation-color-paper-dark: #E8E0D0;
    /* Creme escuro. Papel exposto ao tempo, umidade e sol tropical.
       Bordas de páginas amareladas. */

  /* --- Tinta --- */
  --foundation-color-ink: #1A1817;
    /* Preto tinta. Nunca #000000 (preto de tela é irreal).
       Ligeiramente quente — simula tinta offset absorvida por papel.
       Sobre concreto, mantém-se neutro o suficiente para não conflitar. */

  /* --- Azul cobalto --- */
  --foundation-color-cobalt-blue: #2A5C8A;
    /* Tinta de caneta esferográfica. Anotação, metadado, pensamento.
       Não é azul link (#0000EE). Não é azul primário Material Design.
       Suficientemente escuro para contraste AA com creme papel. */

  --foundation-color-cobalt-blue-muted: #1D405E;
    /* Cobalto esmaecido. Modo noturno — menos contraste, mais atmosfera. */

  /* --- Verde ácido --- */
  --foundation-color-acid-green: #7BC942;
    /* Fósforo CRT. Terminal. Atividade.
       Não é verde natureza. Não é verde Material Design.
       Uso pontual — nunca em grandes áreas. */

  /* --- Laranja ferrugem --- */
  --foundation-color-rust-orange: #B85C38;
    /* Oxidação de aço. Calor tropical.
       Não é vibrante (não é laranja de construção).
       É queimado, opaco — ferrugem sobre metal exposto. */

  /* --- Verde oxidado --- */
  --foundation-color-oxidized-green: #5A7D6E;
    /* Pátina de cobre. Exceção conceitual.
       Não confundir com verde-ácido — é mineral, não elétrico. */

  /* --- Mármore --- */
  --foundation-color-marble-white: #F0EDE8;
    /* Pedra, não papel. Branco quente com profundidade mineral.
       Nunca como fundo funcional. Exceção conceitual. */
}
```

### Espaçamento

Escala baseada em potências de 2 (4px base), com progressão editorial.

```css
:root {
  --foundation-space-0:   0px;       /* Zero — contato direto entre elementos */
  --foundation-space-1:   4px;       /* Micro — espaço entre caractere e marca */
  --foundation-space-2:   8px;       /* Pequeno — entre label e valor */
  --foundation-space-3:  16px;       /* Normal — parágrafo, padding interno */
  --foundation-space-4:  24px;       /* Médio — entre seções de texto */
  --foundation-space-5:  40px;       /* Grande — margem de coluna editorial */
  --foundation-space-6:  64px;       /* Extra-grande — margem monumental */
  --foundation-space-7: 120px;       /* Monumental — Hero */
}
```

### Tipografia — famílias

```css
:root {
  --foundation-font-mono:     'IBM Plex Mono', 'Courier New', monospace;
  --foundation-font-serif:    'Source Serif 4', 'Georgia', serif;
  --foundation-font-grotesk:  'Space Grotesk', 'Helvetica Neue', sans-serif;

  /* Fallbacks:
     Courier New: monospace de sistema, aceitável apenas como último recurso.
     Georgia: serif de sistema com itálico verdadeiro, transição digna.
     Helvetica Neue: grotesk de sistema, neutra, não conflita com Space Grotesk. */
}
```

### Tipografia — pesos

```css
:root {
  /* Monoespaçada (IBM Plex Mono) */
  --foundation-weight-mono-regular: 400;
  --foundation-weight-mono-bold:    700;

  /* Serif (Source Serif 4) */
  --foundation-weight-serif-regular: 400;
  --foundation-weight-serif-italic:  400;  /* Itálico verdadeiro — não faux */
  --foundation-weight-serif-bold:    700;

  /* Grotesk (Space Grotesk) */
  --foundation-weight-grotesk-medium: 500;
  --foundation-weight-grotesk-bold:   700;
  /* Space Grotesk não possui Black (900). Compensar com escala maior
     nos headlines monumentais. Ver ADR-001 em 12-architecture-decisions.md. */
}
```

### Tipografia — tamanhos e alturas

```css
:root {
  /* Escala: 6 níveis. Progressão editorial, não modular (1.25).
     Base: 18px (corpo de texto confortável para leitura longa). */

  --foundation-font-size-display:     6rem;     /* ~96px   — Hero, nome */
  --foundation-font-size-headline:    3rem;     /* ~48px   — Títulos de seção */
  --foundation-font-size-subhead:     1.5rem;   /* ~24px   — Subtítulos */
  --foundation-font-size-body:        1.125rem; /* ~18px   — Texto corrido */
  --foundation-font-size-small:       0.875rem; /* ~14px   — Metadados */
  --foundation-font-size-micro:       0.75rem;  /* ~12px   — Legendas técnicas, carimbos */

  --foundation-line-height-tight:     1.1;  /* Headlines monumentais */
  --foundation-line-height-normal:    1.5;  /* Corpo de texto */
  --foundation-line-height-relaxed:   1.75; /* Citações, espaço para pensar */
}
```

### Tipografia — tracking (letter-spacing)

```css
:root {
  --foundation-tracking-tight:      -0.02em;  /* Compacto — uso raro */
  --foundation-tracking-normal:      0;       /* Padrão da fonte */
  --foundation-tracking-expanded:    0.05em;  /* Navegação, metadados */
  --foundation-tracking-monumental:  0.12em;  /* Headlines massivas, nome */
}
```

### Movimento — durações

```css
:root {
  --foundation-duration-snap:        0ms;    /* Disjuntor — instantâneo */
  --foundation-duration-glitch:     150ms;   /* Interferência — breve */
  --foundation-duration-typewriter:  50ms;   /* Por caractere */
  --foundation-duration-slide:      300ms;   /* Trilho — gaveta de arquivo */
  --foundation-duration-scanner:    800ms;   /* Scanner — varredura completa */
}
```

### Breakpoints

```css
:root {
  --foundation-bp-compact:  480px;   /* Mobile — coluna única */
  --foundation-bp-medium:   900px;   /* Tablet — página única */
  --foundation-bp-wide:    1200px;   /* Desktop — página dupla */
}
```

---

## CAMADA 1 · SEMANTIC

Tokens com significado funcional. Esta é a API pública consumida por
todos os componentes.

### Superfícies (fundos)

```css
:root {
  --color-surface-monumental:   var(--foundation-color-concrete-light);
  --color-surface-editorial:    var(--foundation-color-paper-light);
  --color-surface-tecnico:      var(--foundation-color-concrete-light);
  --color-surface-arquivistico: var(--foundation-color-concrete-light);
  --color-surface-residual:     var(--foundation-color-concrete-dark);

  /* Residual usa concreto escuro mesmo no modo diurno —
     é um intervalo de sombra entre seções iluminadas. */
}
```

### Texto

```css
:root {
  --color-text-primary:    var(--foundation-color-ink);
  --color-text-secondary:  var(--foundation-color-cobalt-blue);
  --color-text-active:     var(--foundation-color-acid-green);
  --color-text-inverse:    var(--foundation-color-paper-light);
  /* inverse usado no modo noturno: texto claro sobre concreto escuro. */
}
```

### Acentos

```css
:root {
  --color-accent-annotation:  var(--foundation-color-cobalt-blue);
  --color-accent-active:      var(--foundation-color-acid-green);
  --color-accent-atmosphere:  var(--foundation-color-rust-orange);
  --color-accent-mineral:     var(--foundation-color-oxidized-green);
  --color-accent-marble:      var(--foundation-color-marble-white);
}
```

### Tipografia semântica

```css
:root {
  /* Vozes */
  --type-voice-grotesk:   var(--foundation-font-grotesk);
  --type-voice-serif:     var(--foundation-font-serif);
  --type-voice-mono:      var(--foundation-font-mono);

  /* Tamanhos por função */
  --type-size-display:    var(--foundation-font-size-display);
  --type-size-headline:   var(--foundation-font-size-headline);
  --type-size-subhead:    var(--foundation-font-size-subhead);
  --type-size-body:       var(--foundation-font-size-body);
  --type-size-small:      var(--foundation-font-size-small);
  --type-size-micro:      var(--foundation-font-size-micro);

  /* Pesos por função */
  --type-weight-headline:     var(--foundation-weight-grotesk-bold);
  --type-weight-body:         var(--foundation-weight-serif-regular);
  --type-weight-quote:        var(--foundation-weight-serif-italic);
  --type-weight-metadata:     var(--foundation-weight-mono-regular);
  --type-weight-metadata-bold: var(--foundation-weight-mono-bold);
  --type-weight-navigation:   var(--foundation-weight-grotesk-medium);

  /* Altura de linha por contexto */
  --type-leading-headline:    var(--foundation-line-height-tight);
  --type-leading-body:        var(--foundation-line-height-normal);
  --type-leading-quote:       var(--foundation-line-height-relaxed);

  /* Tracking por contexto */
  --type-tracking-monumental:  var(--foundation-tracking-monumental);
  --type-tracking-navigation:  var(--foundation-tracking-expanded);
  --type-tracking-body:        var(--foundation-tracking-normal);
}
```

### Espaçamento semântico

```css
:root {
  --space-margin-monumental:    var(--foundation-space-7);
  --space-margin-editorial:      var(--foundation-space-6);
  --space-margin-tecnico:        var(--foundation-space-5);
  --space-margin-arquivistico:   var(--foundation-space-4);
  --space-gap-section:           var(--foundation-space-5);
  --space-gap-paragraph:         var(--foundation-space-3);
  --space-gap-metadata:          var(--foundation-space-2);
  --space-gap-inline:            var(--foundation-space-1);
  --space-residual-height:       var(--foundation-space-5);
  --space-grid-gutter:           var(--foundation-space-3);
  --space-grid-cell:             var(--foundation-space-4);
}
```

### Movimento semântico

```css
:root {
  --motion-expand:   var(--foundation-duration-slide);
  --motion-load:     var(--foundation-duration-scanner);
  --motion-hover:    var(--foundation-duration-glitch);
  --motion-toggle:   var(--foundation-duration-snap);
  --motion-type-char: var(--foundation-duration-typewriter);
}
```

---

## CAMADA 2 · MODE

Sobrescreve tokens SEMANTIC por esquema de cor.

### Modo diurno (padrão)

```css
:root,
[data-theme="light"] {
  --color-surface-monumental:   var(--foundation-color-concrete-light);
  --color-surface-editorial:    var(--foundation-color-paper-light);
  --color-surface-tecnico:      var(--foundation-color-concrete-light);
  --color-surface-arquivistico: var(--foundation-color-concrete-light);

  --color-text-primary:    var(--foundation-color-ink);
  --color-text-secondary:  var(--foundation-color-cobalt-blue);
  --color-text-active:     var(--foundation-color-acid-green);
  --color-text-inverse:    var(--foundation-color-paper-light);
}
```

### Modo noturno

```css
[data-theme="dark"] {
  --color-surface-monumental:   var(--foundation-color-concrete-dark);
  --color-surface-editorial:    var(--foundation-color-concrete-dark);
  --color-surface-tecnico:      var(--foundation-color-concrete-dark);
  --color-surface-arquivistico: var(--foundation-color-concrete-dark);

  --color-text-primary:    var(--foundation-color-paper-light);
  --color-text-secondary:  var(--foundation-color-cobalt-blue-muted);
  --color-text-active:     var(--foundation-color-acid-green);
  --color-text-inverse:    var(--foundation-color-ink);

  --color-accent-annotation: var(--foundation-color-cobalt-blue-muted);
  --color-accent-atmosphere: var(--foundation-color-concrete-light);
  /* ferrugem não visível no escuro. Oxidized-green também suprimido. */
}
```

---

## CAMADA 3 · STATE

Sobrescritas condicionais. Última camada na cascata.

```css
/* --- Redução de movimento --- */
@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-expand:    0ms;
    --motion-load:      0ms;
    --motion-hover:     0ms;
    --motion-toggle:    0ms;
    --motion-type-char: 0ms;
  }
}

/* --- Alto contraste --- */
@media (prefers-contrast: high), (forced-colors: active) {
  :root {
    /* Remove texturas — mantém apenas cores estruturais planas */
    --texture-level: 0;
  }
}

/* --- Salvamento de dados --- */
@media (prefers-reduced-data: reduce) {
  :root {
    --texture-level: 0;
    /* Não carregar texturas estáticas. Usar apenas cores planas. */
  }
}
```

---

## Arquivos de implementação

```
src/styles/tokens.css   → Todas as custom properties (Foundation + Semantic + Mode + State)
src/styles/tokens.ts    → Constantes TypeScript espelhando os nomes de tokens Semantic
                           (para uso em lógica de componente que precise referenciar
                           tokens via JS, ex: canvas, animações)
```

### tokens.ts (estrutura)

```ts
export const TOKENS = {
  color: {
    surface: {
      monumental:   'var(--color-surface-monumental)',
      editorial:    'var(--color-surface-editorial)',
      tecnico:      'var(--color-surface-tecnico)',
      arquivistico: 'var(--color-surface-arquivistico)',
      residual:     'var(--color-surface-residual)',
    },
    text: {
      primary:   'var(--color-text-primary)',
      secondary: 'var(--color-text-secondary)',
      active:    'var(--color-text-active)',
      inverse:   'var(--color-text-inverse)',
    },
    accent: {
      annotation:  'var(--color-accent-annotation)',
      active:      'var(--color-accent-active)',
      atmosphere:  'var(--color-accent-atmosphere)',
      mineral:     'var(--color-accent-mineral)',
      marble:      'var(--color-accent-marble)',
    },
  },
  type: {
    voice: {
      grotesk: 'var(--type-voice-grotesk)',
      serif:   'var(--type-voice-serif)',
      mono:    'var(--type-voice-mono)',
    },
    size: {
      display:  'var(--type-size-display)',
      headline: 'var(--type-size-headline)',
      subhead:  'var(--type-size-subhead)',
      body:     'var(--type-size-body)',
      small:    'var(--type-size-small)',
      micro:    'var(--type-size-micro)',
    },
    // ... weight, leading, tracking
  },
  space: {
    margin: {
      monumental:    'var(--space-margin-monumental)',
      editorial:     'var(--space-margin-editorial)',
      tecnico:       'var(--space-margin-tecnico)',
      arquivistico:  'var(--space-margin-arquivistico)',
    },
    // ... gaps, residual, grid
  },
  motion: {
    expand:    'var(--motion-expand)',
    load:      'var(--motion-load)',
    hover:     'var(--motion-hover)',
    toggle:    'var(--motion-toggle)',
    typeChar:  'var(--motion-type-char)',
  },
} as const;
```

---

## Regras de uso

1. **Componentes nunca referenciam `--foundation-*`.** Sempre `--color-*`, `--type-*`, `--space-*`, `--motion-*`.
2. **Componentes nunca usam valores literais.** `#1A1817` nunca aparece em código de componente. Use `var(--color-text-primary)`.
3. **Adicionar um token Foundation requer adicionar um token Semantic correspondente.** Se um novo valor bruto é necessário, ele precisa de um nome funcional para ser consumido.
4. **Mudar um token Foundation não deve quebrar nenhum componente.** Se quebrar, o token Semantic está mal nomeado (acoplado ao valor, não à função).
5. **Tokens de componente são proibidos.** Se dois componentes precisam do mesmo valor, ele pertence à camada Semantic. Ex: `--hero-title-size` → usar `--type-size-display`.
