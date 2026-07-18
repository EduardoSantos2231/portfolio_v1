# 06 · ESTRATÉGIA RESPONSIVA

> Origem: `docs/design/03-layout-rules.md`
> Origem: `docs/design/04-proportion-and-rhythm.md`
> Origem: `docs/design/13-components/*.md`

---

## Princípio

O layout não se estica como borracha. Ele se reorganiza como um livro
que muda de formato.

**Desktop amplo:** página dupla.
**Tablet:** página única.
**Mobile:** coluna única com margens mínimas.

Em nenhum breakpoint o layout deve parecer "um site mobile". Deve
parecer "uma publicação em formato reduzido".

---

## Breakpoints

```css
/* tokens.css */
:root {
  --foundation-bp-compact:  480px;
  --foundation-bp-medium:   900px;
  --foundation-bp-wide:    1200px;
}
```

### Convenções de uso

```css
/* Mobile-first: estilos base são para compact */
.component { }

/* Tablet: a partir de 900px */
@media (min-width: 900px) {
  .component { }
}

/* Desktop amplo: a partir de 1200px */
@media (min-width: 1200px) {
  .component { }
}
```

### Container queries (preferencial para componentes)

Para componentes que precisam se adaptar independentemente da viewport
(ex: `ProjectPreview` dentro de um grid que pode ter 1, 2 ou 3 colunas):

```css
.project-preview {
  container-type: inline-size;
  container-name: project-card;
}

@container project-card (min-width: 300px) {
  .project-preview__metadata { /* layout horizontal */ }
}

@container project-card (max-width: 299px) {
  .project-preview__metadata { /* layout vertical */ }
}
```

---

## Comportamento por tipo de espaço

### Espaço Monumental (Hero)

| Breakpoint | Margem | Tamanho do nome | Descritor |
|---|---|---|---|
| Compact (<480px) | `--space-margin-arquivistico` (24px) | `clamp(2.5rem, 8vw, 4rem)` | Abaixo do nome, próximo |
| Medium (480–1199px) | `--space-margin-monumental` (120px → reduzido em 40%) | `clamp(4rem, 6vw, 6rem)` | Distante, mas visível |
| Wide (≥1200px) | `--space-margin-monumental` (120px) | `--type-size-display` (6rem) | Muito distante, pequeno |

```css
.hero-name {
  font-size: clamp(2.5rem, 8vw, var(--type-size-display));
  text-align: left;
  margin-inline-start: clamp(16px, 8vw, var(--space-margin-monumental));
  margin-block-start: clamp(80px, 15vh, 200px);
}
```

---

### Espaço Editorial (Manifesto, About)

| Breakpoint | Layout | Margem esquerda | Anotações marginais | Largura da coluna |
|---|---|---|---|---|
| Compact | Coluna única, sem anotações | 16px | Suprimidas | 100% − 32px |
| Medium | Coluna centralizada | Simétrica moderada | Notas de rodapé | ~75% |
| Wide | Coluna deslocada à direita | Ampla (160px) | Visíveis na margem esquerda | 60–70% |

```css
.editorial-layout {
  padding-inline: var(--space-margin-arquivistico);
  max-width: 100%;
}

@media (min-width: 900px) {
  .editorial-layout {
    padding-inline: var(--space-margin-editorial);
    max-width: 75%;
    margin-inline: auto;  /* apenas centralização de coluna — justificativa editorial */
  }
}

@media (min-width: 1200px) {
  .editorial-layout {
    max-width: 65%;
    margin-inline: 0 0 0 auto;  /* deslocado à direita */
    margin-inline-start: 160px;  /* margem esquerda ampla para anotações */
  }
}
```

#### Anotações marginais

```css
.marginal-note {
  display: none;  /* compact: suprimidas */
}

@media (min-width: 900px) {
  .marginal-note {
    display: block;
    /* Em medium: viram nota de rodapé */
    font-size: var(--type-size-micro);
    color: var(--color-accent-annotation);
    margin-block-start: var(--space-gap-paragraph);
  }
}

@media (min-width: 1200px) {
  .marginal-note {
    /* Em wide: posicionadas na margem esquerda */
    position: absolute;
    left: -140px;
    width: 120px;
    text-align: right;
    font-size: var(--type-size-micro);
  }
}
```

---

### Espaço Técnico (Projetos)

| Breakpoint | Grid colunas | Gutter | Metadados secundários |
|---|---|---|---|
| Compact | 1 | 0 (sem gutter — linhas de grid bastam) | Visíveis |
| Medium | 2 | `--space-grid-gutter` (16px) | Visíveis |
| Wide | 3 | `--space-grid-gutter` (16px) | Visíveis |

```css
.project-grid {
  --grid-columns: 1;
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
}

@media (min-width: 600px) {  /* antes do bp-medium para evitar 1 coluna muito larga */
  .project-grid {
    --grid-columns: 2;
  }
}

@media (min-width: 1200px) {
  .project-grid {
    --grid-columns: 3;
  }
}
```

**Nota:** O breakpoint de 2 colunas (600px) é mais cedo que o bp-medium (900px).
Isso evita que cards fiquem excessivamente largos no intervalo 480–899px.

---

### Espaço Arquivístico (Contato, Footer)

| Breakpoint | Layout |
|---|---|
| Compact | Labels + valores empilhados ou em linha (a largura permite) |
| Medium | Duas colunas lado a lado |
| Wide | Duas colunas lado a lado, mais respiro |

```css
.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-gap-metadata);
}

@media (min-width: 480px) {
  .contact-grid {
    grid-template-columns: auto 1fr;
    gap: var(--space-gap-inline) var(--space-gap-paragraph);
  }
}
```

---

### Espaço Residual

| Breakpoint | Altura |
|---|---|
| Compact | `--space-residual-height` (40px) × 0.5 |
| Medium | `--space-residual-height` (40px) × 0.75 |
| Wide | `--space-residual-height` (40px) |

```css
.residual-space {
  block-size: calc(var(--space-residual-height) * 0.5);
}

@media (min-width: 900px) {
  .residual-space {
    block-size: calc(var(--space-residual-height) * 0.75);
  }
}

@media (min-width: 1200px) {
  .residual-space {
    block-size: var(--space-residual-height);
  }
}
```

---

## Navegação responsiva

A navegação nunca se torna um menu hambúrguer.

### Estratégia

| Breakpoint | Comportamento |
|---|---|
| Compact (<480px) | Navegação horizontal com `overflow-x: auto` (régua). Ou: itens migram para o Footer como legenda de seção. |
| Medium (480–1199px) | Barra horizontal fixa no topo, todos os itens visíveis. |
| Wide (≥1200px) | Coluna vertical fixa à esquerda (como viga estrutural). |

```css
.primary-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  overflow-x: auto;
  gap: var(--space-gap-metadata);
  padding: var(--space-gap-inline) var(--space-margin-arquivistico);
  background: var(--color-surface-monumental);
  border-bottom: 1px solid var(--color-grid-line);
  scrollbar-width: none;  /* oculta scrollbar no desktop */
}

@media (min-width: 1200px) {
  .primary-nav {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100px;
    flex-direction: column;
    overflow-x: visible;
    border-bottom: none;
    border-right: 1px solid var(--color-grid-line);
    padding: var(--space-gap-section) var(--space-gap-inline);
  }
}
```

**Alternativa para compact (se régua horizontal não for desejada):**

Navegação no Footer — os itens aparecem apenas no final da página,
como legenda:

```css
@media (max-width: 479px) {
  .primary-nav {
    display: none;
  }

  .footer-nav {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-gap-metadata);
    justify-content: flex-start;
  }
}
```

---

## Imagens responsivas

Imagens mantêm sua proporção fixa. Nunca se deformam.

```astro
<!-- Image.astro -->
<img
  src={processedSrc}
  alt={alt}
  loading={priority ? 'eager' : 'lazy'}
  decoding="async"
  style={`aspect-ratio: ${aspectRatio}`}
/>
```

- `aspect-ratio` no CSS garante que a proporção é mantida independente
  da largura disponível.
- `object-fit: cover` para imagens que preenchem um container de proporção fixa.
- `loading="lazy"` para imagens abaixo da dobra. `loading="eager"` apenas
  para a primeira imagem de projeto (se acima da dobra).
- `fetchpriority="high"` no `<link rel="preload">` do `<head>` para a imagem
  do Hero, se houver (normalmente não há).

---

## Tipografia responsiva

Fontes usam `clamp()` para transições suaves entre breakpoints.

```css
:root {
  /* A escala base é definida em tokens.css. Aqui, ajustes responsivos: */

  --type-size-display:  clamp(2.5rem, 8vw, 6rem);
  --type-size-headline: clamp(2rem, 4vw, 3rem);
  --type-size-body:     clamp(1rem, 2.5vw, 1.125rem);
}
```

---

## Regras gerais de responsividade

1. **Margens nunca são zero.** O conteúdo nunca toca as bordas da viewport.
   Margem mínima: 16px (compact), 24px (medium), 40px+ (wide).

2. **A ordem narrativa nunca muda.** Hero → Manifesto → About → Projetos →
   Contato → Footer. Apenas a disposição espacial se adapta.

3. **Nenhum conteúdo é ocultado por falta de espaço.** Apenas reposicionado
   ou reduzido proporcionalmente.

4. **Texturas são reduzidas em compact.** O nível de textura (ver
   `07-asset-pipeline.md`) cai para 0 ou 1 em telas <480px — texturas
   sutis não são perceptíveis e consomem recursos.

5. **Touch targets.** Em compact/medium (touch), áreas interativas têm
   tamanho mínimo de 44×44px (`--foundation-space-4`). Em wide (mouse),
   podem ser menores.

6. **Nunca `user-scalable=no`.** O visitante pode dar zoom.
