# 05 · SISTEMA DE MOVIMENTO

> Origem: `docs/design/07-temporal-behavior.md`
> Origem: `docs/design/19-visual-language.md` (Glitch)

---

## Setup global

### Custom properties de controle

```css
/* Definido em tokens.css, camada STATE */
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

### Detecção em runtime

```ts
// src/utils/motion.ts
export function isMotionEnabled(): boolean {
  if (typeof window === 'undefined') return true;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function getMotionDuration(token: string): number {
  if (!isMotionEnabled()) return 0;
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(token);
  return parseInt(value) || 0;
}
```

---

## Metáfora 1 · Disjuntor (Snap)

**Duração:** `--motion-toggle` (0ms)  
**Curva:** Nenhuma — `transition: none`  
**Origem:** Troca binária de estado

### Implementação

```css
.snap {
  transition: none;
}

/* Para troca de data-theme */
[data-theme] {
  /* Sem transição. A troca de custom properties é atômica. */
}

[data-theme] *,
[data-theme] *::before,
[data-theme] *::after {
  transition: none !important;
  animation: none !important;
}
```

### Onde usar
- Toggle diurno/noturno
- Ativação de filtro em `FilterBar`
- Clique em link de `ContactLine` (navegação para fora)
- Mudança de seção via clique em `NavigationItem` (navegação interna)

---

## Metáfora 2 · Trilho (Slide)

**Duração:** `--motion-expand` (300ms)  
**Curva:** `linear`  
**Origem:** Gaveta de arquivo, porta industrial

### Implementação

```css
.slide-vertical {
  overflow: hidden;
  transition: max-height var(--motion-expand) linear;
  /* max-height animado de 0 para um valor calculado em JS */
}

.slide-horizontal {
  overflow: hidden;
  transition: transform var(--motion-expand) linear;
  transform: translateX(0);
}

.slide-horizontal[aria-hidden="true"] {
  transform: translateX(100%);
}
```

### Considerações

- `max-height` animado é aceitável porque a duração é curta (300ms) e linear.
- Para `ProjectPreview` expandido: calcular altura do conteúdo expandido via
  `el.scrollHeight` e aplicar como `max-height`.
- Para `NavigationItem` (se navegação horizontal com scroll): `transform: translateX()`.
- Sempre adicionar `will-change: max-height` (ou `transform`) durante a transição,
  remover ao final.

### Onde usar
- Expansão de `ProjectPreview` (vertical — gaveta de arquivo)
- Scroll entre seções (navegação interna suave — apenas se ativada
  pelo visitante via navegação, nunca scroll hijacking)
- Aparição de conteúdo adicional inline

### Proibido
- `max-height: 9999px` como hack (use valor calculado)
- `transition: all` (seja específico)
- Animar `height` (use `max-height` ou `transform`)
- Animar `padding`, `margin`, `border` (use `max-height` sobre wrapper interno)

---

## Metáfora 3 · Datilográfica (Typewriter)

**Duração:** `--motion-type-char` (50ms por caractere)  
**Curva:** `steps(1)` — um caractere por frame  
**Origem:** Máquina de escrever, terminal

### Implementação

```css
.typewriter {
  overflow: hidden;
  white-space: nowrap;
  width: 0;
  /* width animado via JS para o número exato de caracteres */
}

.typewriter--animating {
  animation: typewriter var(--typewriter-duration) steps(var(--typewriter-chars)) forwards;
}

.typewriter-cursor {
  display: inline-block;
  width: 0.5em;
  height: 1em;
  background: var(--color-accent-active);
  animation: cursor-blink 1s steps(2) infinite;
  vertical-align: text-bottom;
  margin-left: 2px;
}

@keyframes typewriter {
  from { width: 0; }
  to   { width: 100%; }
}

@keyframes cursor-blink {
  0%   { opacity: 1; }
  50%  { opacity: 0; }
  100% { opacity: 1; }
}
```

### Cálculo em JS

```ts
function typewriterAnimation(el: HTMLElement, text: string) {
  if (!isMotionEnabled()) {
    el.textContent = text;
    return;
  }
  const chars = text.length;
  const duration = chars * 50; // ms
  el.style.setProperty('--typewriter-duration', `${duration}ms`);
  el.style.setProperty('--typewriter-chars', String(chars));
  el.classList.add('typewriter--animating');

  // Após a animação, remover cursor
  el.addEventListener('animationend', () => {
    el.classList.remove('typewriter--animating');
    el.style.width = 'auto';
    el.querySelector('.typewriter-cursor')?.remove();
  }, { once: true });
}
```

### Restrições

- Apenas para headlines e textos <100 caracteres. Parágrafos longos
  nunca usam datilográfica — entediante e inacessível.
- Apenas dispara no primeiro carregamento de cada seção.
  Nunca repete em re-renderizações ou navegações subsequentes.
- Controle: `sessionStorage` armazena flag para não re-animar se o
  visitante já viu a seção.
- O cursor usa `animation: infinite` — esta é a ÚNICA exceção à regra
  de proibição de loops infinitos.

### Onde usar
- Headline do ManifestoSection
- Headline do HeroSection (apenas na primeira visita)

---

## Metáfora 4 · Scanner (Blueprint)

**Duração:** `--motion-load` (800ms)  
**Curva:** `linear`  
**Origem:** Scanner de mesa, fotocopiadora

### Implementação — overlay CSS

```css
.scanner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    var(--color-accent-annotation) 30%,
    var(--color-accent-annotation) 70%,
    transparent 100%
  );
  transform: translateY(-100%);
  transition: transform var(--motion-load) linear;
  opacity: 0.3;
  mix-blend-mode: screen;
  pointer-events: none;
  z-index: 10;
}

.scanner-overlay--active {
  transform: translateY(100%);
}

/* Scanline residual após scanner */
.scanner-residual {
  background-image: repeating-linear-gradient(
    transparent 0px,
    rgba(42, 92, 138, 0.04) 1px,
    transparent 2px
  );
  animation: scanner-fade 200ms linear forwards;
  animation-delay: var(--motion-load);
}

@keyframes scanner-fade {
  from { opacity: 1; }
  to   { opacity: 0; }
}
```

### Implementação — JS (disparo por IntersectionObserver)

```ts
function setupScannerObserver() {
  if (!isMotionEnabled()) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const overlay = entry.target.querySelector('.scanner-overlay');
        if (overlay && !overlay.dataset.scanned) {
          overlay.dataset.scanned = 'true';
          overlay.classList.add('scanner-overlay--active');
          overlay.addEventListener('transitionend', () => {
            overlay.classList.add('scanner-residual');
          }, { once: true });
        }
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[data-scanner]').forEach(el => observer.observe(el));
}
```

### Onde usar
- Carregamento de imagens de projeto (primeira vez que entram na viewport)
- Transição entre seções principais (ResidualSpace → próxima seção)
- Imagem do Hero (se houver, mas o Hero normalmente não tem imagem)

### Restrições
- Dispara apenas uma vez por elemento (flag `data-scanned`).
- Nunca em elementos pequenos (<200px).
- Nunca em texto.
- Quando `prefers-reduced-motion: reduce`, a imagem aparece imediatamente
  (disjuntor) — sem overlay de scanner.

---

## Metáfora 5 · Interferência (Glitch)

**Duração:** `--motion-hover` (150ms)  
**Curva:** `steps(3)` — 3 frames de distorção  
**Origem:** Interferência de sinal, faísca elétrica

### Implementação

```css
.glitch-target {
  transition: transform 0ms;
}

.glitch-target--active {
  animation: glitch var(--motion-hover) steps(3) forwards;
}

@keyframes glitch {
  0%   { transform: translateX(0); clip-path: inset(0 0 0 0); }
  33%  { transform: translateX(-3px); clip-path: inset(20% 0 60% 0); }
  66%  { transform: translateX(2px); clip-path: inset(50% 0 10% 0); }
  100% { transform: translateX(0); clip-path: inset(0 0 0 0); }
}
```

### Disparo via JS

```ts
function setupGlitchHover(el: HTMLElement) {
  if (!isMotionEnabled()) return;

  el.addEventListener('mouseenter', () => {
    el.classList.add('glitch-target--active');
  });

  el.addEventListener('animationend', () => {
    el.classList.remove('glitch-target--active');
  });
}
```

### Onde usar
- Hover em `NavigationItem` (texto do item sofre glitch)
- Hover em `ProjectPreview` (linhas de grid ao redor da célula sofrem glitch)
- Hover em `ContactLine` com link (texto do valor sofre glitch)

### Restrições
- Nunca aplicar glitch em texto que está sendo lido (corpo de texto).
  Apenas em elementos de interface e linhas de grid.
- Nunca aplicar glitch repetidamente antes do anterior terminar.
  Usar flag `dataset.glitching` para bloquear reentrada.
- Removido completamente com `prefers-reduced-motion`.
- Nunca usar `transform: translateX` com valor aleatório em JS.
  Usar keyframes fixas — o efeito de "aleatoriedade" está na
  variação entre os 3 frames.

---

## Mapa de movimento por componente

| Componente | Metáfora | Disparo | Ilha? |
|---|---|---|---|
| `HeroSection` | Datilográfica (nome) + Nenhum | `onMount` (apenas primeira visita) | Não |
| `NavigationItem` hover | Glitch | `mouseenter` | Sim (`client:load`) |
| `NavigationItem` active | Nenhum (estático) | — | — |
| `NavigationItem` click (navegação) | Disjuntor | `click` | Sim |
| `FilterBar` click | Disjuntor | `click` | Sim (`client:idle`) |
| `ProjectPreview` hover | Glitch (grid lines) + Scanner (imagem) | `mouseenter` | Sim (`client:visible`) |
| `ProjectPreview` expand | Trilho vertical | `click` | Sim (`client:visible`) |
| `ProjectPreview` load inicial | Scanner (overlay) | `IntersectionObserver` | Sim |
| `ResidualSpace` → próxima seção | Scanner (banda de transição) | Scroll / `IntersectionObserver` | Não |
| `ContactLine` hover | Glitch | `mouseenter` | Não (CSS apenas) |
| `ContactLine` click | Disjuntor | `click` (navegação nativa) | Não |

---

## Transições proibidas

As seguintes transições devem ser bloqueadas pelo Stylelint (ver `11-enforcement.md`):

```json
{
  "declaration-property-value-disallowed-list": {
    "transition-timing-function": [
      "/ease/",
      "/cubic-bezier/"
    ]
  }
}
```

### O que NUNCA usar

| Técnica proibida | Motivo |
|---|---|
| `transition: opacity` para fade-in/out | Desvanecer = desaparecer. Usar Scanner ou Trilho. |
| `transition: transform scale()` | Elementos não "crescem". |
| `@keyframes` com `translateY(-20px)` + `opacity: 0→1` | Animação de "surgir flutuando" (padrão SaaS). |
| `transition-delay` em stagger de lista | Dança sequencial de elementos. |
| `animation: infinite` (exceto cursor blink) | Movimento perpétuo. |
| `scroll-behavior: smooth` via CSS | Scroll suave = orgânico. Visitor-controlled scroll. |
| `transform: translateZ()` ou `perspective` | Efeitos 3D decorativos. |
