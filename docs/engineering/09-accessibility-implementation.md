# 09 · IMPLEMENTAÇÃO DE ACESSIBILIDADE

> Origem: `docs/design/15-accessibility.md`
> Origem: `docs/design/24-ai-directives.md`

---

## Estrutura semântica

### Landmarks

```html
<html lang="pt-BR">
<body>
  <a href="#main-content" class="skip-link">Pular para o conteúdo</a>

  <nav aria-label="Navegação principal">
    <!-- NavigationItem[] -->
  </nav>

  <header role="banner">
    <!-- HeroSection -->
  </header>

  <main id="main-content">
    <!-- ManifestoSection, AboutSection, ProjectsSection, ContactSection -->
  </main>

  <footer>
    <!-- Footer -->
  </footer>
</body>
```

### Heading hierarchy

```
h1  → nome do portfolio (HeroSection)
h2  → títulos de seção: [MANIFESTO], [SOBRE], [PROJETOS], [CONTATO]
h3  → subtítulos dentro de seções (se houver)
```

Nenhum skip de nível. Se não houver h3 em uma seção, não há problema —
a hierarquia simplesmente termina em h2.

### Seções

Cada seção usa o elemento `<section>` com `aria-labelledby`:

```html
<section aria-labelledby="projects-title">
  <h2 id="projects-title">[PROJETOS]</h2>
  ...
</section>
```

### Listas

```html
<!-- Projetos: lista de itens -->
<ul role="list" class="project-grid">
  <li><!-- ProjectPreview --></li>
  <li><!-- ProjectPreview --></li>
</ul>
```

Uso de `role="list"` explícito porque `display: grid` remove o
papel implícito de lista em alguns navegadores/leitores de tela.

### Metadados

```html
<!-- Footer: dados de publicação como lista de definição -->
<dl class="footer-meta">
  <dt class="sr-only">Portfolio</dt>
  <dd>CONCRETO, MENTE E TRÓPICOS</dd>
  <dt class="sr-only">Data</dt>
  <dd>MM/AAAA</dd>
  <dt class="sr-only">Versão</dt>
  <dd>VERSÃO 1</dd>
</dl>
```

---

## Navegação por teclado

### Skip link

```astro
<a href="#main-content" class="skip-link">
  Pular para o conteúdo
</a>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-margin-arquivistico);
  z-index: 200;
  padding: var(--space-gap-inline) var(--space-gap-paragraph);
  background: var(--color-surface-monumental);
  color: var(--color-text-primary);
  font-family: var(--type-voice-mono);
  font-size: var(--type-size-small);
  border: 2px solid var(--color-accent-annotation);
}

.skip-link:focus {
  top: var(--space-gap-inline);
}
```

### Tab order

A ordem de tabulação segue a ordem visual (source order = visual order).
Nenhum `tabindex` positivo. Nenhuma armadilha de foco.

### Indicador de foco customizado

```css
:focus-visible {
  outline: 2px solid var(--color-accent-annotation);
  outline-offset: 2px;
}

/* Para elementos com indicador de foco de cota arquitetônica */
.focus-bracket:focus-visible {
  outline: none;
  position: relative;
}

.focus-bracket:focus-visible::before {
  content: '';
  position: absolute;
  left: -6px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60%;
  border-left: 2px solid var(--color-accent-annotation);
  border-top: 2px solid var(--color-accent-annotation);
  border-bottom: 2px solid var(--color-accent-annotation);
}
```

### Navegação ativa

```html
<a href="/#projetos"
   aria-current="page"
   class="nav-item nav-item--active">
  PROJETOS
</a>
```

`aria-current="page"` informa leitores de tela qual seção está ativa.

### ProjectPreview — expansão

```html
<li>
  <button
    aria-expanded="false"
    aria-controls="project-detail-01"
    class="project-preview">
    <!-- conteúdo do preview -->
  </button>
  <div id="project-detail-01" hidden>
    <!-- detalhes expandidos -->
  </div>
</li>
```

---

## ARIA por componente

| Componente | Roles e atributos |
|---|---|
| `HeroSection` | `<header role="banner">`. Nome como `<h1>`. |
| `NavigationItem` | `<nav aria-label="Navegação principal">` + `<a>` com `aria-current` |
| `ManifestoSection` | `<section aria-labelledby="...">`. Parágrafos numerados como `<ol>` com `aria-label`? Não — usar `<p>` simples. A numeração é visual (CSS counters). |
| `AboutSection` | `<section aria-labelledby="...">`. Dados como `<dl>` (label=dt, value=dd) ou `<table>` se denso. |
| `ProjectsSection` | `<section aria-labelledby="...">`. Grid como `<ul role="list">`. |
| `ProjectPreview` | `<li>` contendo `<button>` com `aria-expanded` e `aria-controls` apontando para o container de detalhes. |
| `ContactSection` | `<section aria-labelledby="...">`. Links com `target="_blank"` possuem `rel="noopener noreferrer"` e `aria-label` indicando que abre em nova aba. |
| `Footer` | `<footer>` sem role adicional. |
| `FilterBar` | `<fieldset>` com `<legend class="sr-only">`. Items como `<label>` + `<input type="radio">` para seleção exclusiva — estilizados como texto monospace. |
| `Image` | `<figure>` com `<figcaption>`. `<img>` com `alt` descritivo. |
| `Quotation` | `<blockquote>` com `<cite>` para atribuição. |
| `ResidualSpace` | `<hr>` com `aria-hidden="true"` (separador decorativo). |

---

## Imagens e texto alternativo

### Formato de alt text

```
alt="FIG. 01 — [Descrição concisa do conteúdo visual] — [Data] — [Contexto]"
```

### Exemplo

```
alt="FIG. 03 — Diagrama de arquitetura mostrando três serviços Go
conectados por Kafka com PostgreSQL como storage — 2025 — Projeto Orion"
```

### Imagens decorativas (texturas)

```html
<!-- Textura de fundo: puramente decorativa -->
<img src="/textures/concrete.webp" alt="" role="presentation" />
```

---

## Redução de movimento

### Detecção

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --motion-expand:    0ms;
    --motion-load:      0ms;
    --motion-hover:     0ms;
    --motion-toggle:    0ms;
    --motion-type-char: 0ms;
  }
}
```

### Remoção de glitch

```css
@media (prefers-reduced-motion: reduce) {
  .glitch-target--active {
    animation: none;
  }
}
```

### Typewriter sem animação

Quando `--motion-type-char: 0ms`, o componente `Text` com `voice="mono"`
deve renderizar o texto completo de uma vez (não iniciar a animação de
typewriter). O JS verifica `isMotionEnabled()` antes de disparar.

---

## Verificação de contraste

### Tabela de pares

| Par | Token fundo | Token texto | Hex fundo | Hex texto | Contraste | WCAG AA | WCAG AAA |
|---|---|---|---|---|---|---|---|
| Body text (diurno) | `paper-light` | `ink` | #F5F0E8 | #1A1817 | 14.2:1 | P | P |
| Body text (noturno) | `concrete-dark` | `paper-light` | #2A2724 | #F5F0E8 | 11.8:1 | P | P |
| Headline (diurno) | `concrete-light` | `ink` | #D4CFC8 | #1A1817 | 11.5:1 | P | P |
| Metadata (diurno) | `paper-light` | `cobalt-blue` | #F5F0E8 | #2A5C8A | 6.4:1 | P (L) / F (N) | F |
| Metadata (noturno) | `concrete-dark` | `cobalt-blue-muted` | #2A2724 | #1D405E | 3.2:1 | F | F |
| Active (noturno) | `concrete-dark` | `acid-green` | #2A2724 | #7BC942 | 6.8:1 | P (L) / P (N) | F (N) |
| Annotation (diurno) | `paper-light` | `cobalt-blue` | #F5F0E8 | #2A5C8A | 6.4:1 | P (L) / F (N) | F |

**Legenda:** P = passa, F = falha, (L) = large text (≥18px ou ≥14px bold), (N) = normal text

### Ações corretivas

| Par problemático | Ação |
|---|---|
| Metadata noturno (3.2:1) | Aumentar `cobalt-blue-muted` para `#376A94` (contraste 4.6:1 → passa AA large). Ou: usar `cobalt-blue` padrão no noturno (6.4:1). |
| Metadata diurno (6.4:1, falha AAA) | Aceitável. Metadata é texto small (≥14px) — passa AA para large text. AAA não é obrigatório. |

### Verificação automatizada

```ts
// scripts/check-contrast.ts
// Lê tokens.css, extrai todas as combinações texto/fundo,
// calcula contraste WCAG, reporta falhas.
```

---

## Idioma

### Marcação

```html
<html lang="pt-BR">
```

### Trechos em inglês

Termos técnicos e nomes de tecnologias (inglês em contexto português):

```html
<span lang="en">go · postgres · redis</span>
```

Citações em latim (filosofia):

```html
<blockquote>
  <p lang="la">Non est ad astra mollis e terris via.</p>
  <cite>Sêneca</cite>
</blockquote>
```

---

## Redução de dados e texturas

```css
@media (prefers-reduced-data: reduce) {
  :root {
    --texture-level: 0;
  }

  .project-image img {
    /* Remover filtros de imagem que consomem GPU */
    filter: none;
  }

  .surface-grain::after {
    display: none;
  }
}
```

---

## Alto contraste e forced-colors

```css
@media (prefers-contrast: high), (forced-colors: active) {
  :root {
    --texture-level: 0;
  }

  .surface-grain::after,
  .image-scanlines::after,
  .image-vignette::after {
    display: none;
  }

  /* Garantir que links são distinguíveis sem cor */
  a {
    text-decoration: underline;
    text-decoration-thickness: 1px;
  }
}
```

---

## Tamanho de toque (touch targets)

```css
@media (pointer: coarse) {
  .nav-item,
  .project-preview button,
  .filter-item {
    min-block-size: 44px;
    min-inline-size: 44px;
  }
}
```

---

## Preferências de animação (nível de sistema)

```css
@media (prefers-reduced-motion: reduce) {
  .typewriter-cursor {
    display: none;
  }

  .scanner-overlay {
    display: none;
  }
}
```

---

## Checklist de verificação

### Build-time (automático)

- [ ] Todos os pares de cor passam WCAG AA mínimo.
- [ ] Heading hierarchy sem skip (h1 → h2 → h3).
- [ ] Todas as imagens têm `alt`.
- [ ] Links externos têm `rel="noopener noreferrer"`.
- [ ] `<html lang="pt-BR">`.
- [ ] Skip link presente e funcional.

### QA manual

- [ ] Navegação completa por teclado (Tab, Shift+Tab, Enter, Escape).
- [ ] Foco visível em todos os elementos interativos.
- [ ] Leitor de tela lê landmarks e headings na ordem correta.
- [ ] `prefers-reduced-motion: reduce` remove todas as animações.
- [ ] `prefers-contrast: high` mantém legibilidade.
- [ ] `forced-colors: active` não esconde informação.
- [ ] Zoom até 200% sem quebra de layout.
- [ ] Touch targets ≥ 44px em dispositivos touch.
