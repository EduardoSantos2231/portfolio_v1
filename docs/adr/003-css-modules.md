# ADR-003 · CSS Modules + Custom Properties

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

O design impõe ~80 restrições sobre propriedades CSS (ver
`docs/engineering/04-css-architecture.md`). A estratégia de CSS
deve permitir enforcement mecânico dessas restrições sem introduzir
complexidade desproporcional. Além disso, a abordagem deve ser
compatível com agentes de IA que consumirão a documentação para
gerar código.

Restrições-chave do design:
- Proibição de `border-radius > 0`, `box-shadow`, `backdrop-filter: blur()`.
- Proibição de `ease`, `ease-in-out`, `cubic-bezier` em transições.
- Proibição de `linear-gradient`, `radial-gradient`.
- Proibição de fontes de sistema genéricas (`sans-serif`, `monospace` sem fallback explícito).
- Cores devem referenciar tokens (`var(--color-*)`), nunca hex literais.

---

## Decisão

**CSS Modules + Custom Properties** como estratégia única. Nenhuma
biblioteca de CSS utility-first ou CSS-in-JS.

Enforcement via Stylelint com regras customizadas.

---

## Comparação arquitetural

| Critério | CSS Modules + Custom Properties | Tailwind CSS | Vanilla Extract | Panda CSS |
|---|---|---|---|---|
| Enforcement de proibições | Stylelint — mecânico, confiável | Depende de disciplina. Tailwind não tem API para banir utilitários. | TypeScript pode banir tokens, não valores CSS arbitrários. | TypeScript tipa tokens, valores escapam. |
| Conflito com o design | Zero | ~40% dos utilitários conflitam (rounded, shadow, blur, gradient, cores de sistema) | Zero | Baixo (incentiva atomic CSS — requer disciplina) |
| Escopo por componente | Nativo (`.module.css`) | Manual (prefixos ou `@apply`) | Nativo (`.css.ts`) | Nativo |
| Portabilidade | CSS padrão — migração trivial | Reescrever TODO o markup | Traduzir sintaxe, tokens reutilizáveis | Similar ao VE |
| IA-friendly | CSS padrão é universal | Tailwind é conhecido, mas padrões conflitam | Sintaxe proprietária | Sintaxe proprietária |
| Dependência extra | Zero | `tailwindcss` + `postcss` + `autoprefixer` | `@vanilla-extract/css` + plugin Vite | `@pandacss/dev` + postcss |

---

## Justificativa

1. **Redução como princípio.** CSS padrão é a plataforma. CSS Modules
   adiciona apenas escopo — uma necessidade técnica, não estilística.

2. **Enforcement mecânico.** Stylelint bloqueia propriedades banidas com
   `declaration-property-value-disallowed-list`. Nenhuma biblioteca
   alternativa oferece este nível de controle sobre o output CSS.

3. **Custo do Tailwind.** Configurar Tailwind para NÃO ser Tailwind
   (desabilitar `rounded-*`, `shadow-*`, `backdrop-blur-*`, reescrever
   cores, reescrever escala de spacing) exige mais código de configuração
   do que escrever o CSS diretamente.

4. **Agentes de IA.** A documentação de design será consumida por agentes
   para gerar código. CSS padrão é universalmente compreendido. Vanilla
   Extract e Panda CSS têm sintaxes proprietárias que podem causar
   interpretações incorretas.

5. **Portabilidade futura.** Se o projeto migrar de Astro para outro
   framework, CSS Modules e Custom Properties são triviais de portar —
   são padrões web, não abstrações de framework.

---

## Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **Tailwind CSS** | Conflito direto com ~40% das regras do design. Exigiria desabilitar `rounded-*`, `shadow-*`, `backdrop-blur-*`, reescrever a escala de cores e spacing. O custo de configurar Tailwind para NÃO ser Tailwind excede o de usar CSS puro. Além disso, Tailwind incentiva padrões estéticos (utility-first, atomic CSS) que o design rejeita. |
| **Vanilla Extract** | Type-safety nos tokens é atrativa, mas sintaxe proprietária (`style.ts`) reduz portabilidade e dificulta consumo por agentes de IA. Zero-runtime é positivo, mas CSS Modules também é zero-runtime sem abstração adicional. |
| **Panda CSS** | Similar ao VE: tokens tipados, mas sintaxe proprietária e padrões atômicos que exigem disciplina para não gerar CSS inflado. Sobrecarga de configuração desproporcional ao escopo do projeto (página única). |
| **CSS-in-JS (styled-components, Emotion)** | Runtime de JavaScript para estilos — overhead desnecessário. Performance inferior a CSS estático. |

---

## Consequências

**Positivas:**
- Zero dependências de CSS além do Stylelint.
- Curva de aprendizado zero — CSS padrão.
- Build produz CSS estático, sem runtime.
- Verificação de proibições totalmente automatizada.

**Negativas:**
- Perde-se type-safety nos tokens (Vanilla Extract/Panda oferecem).
  Mitigação: `src/styles/tokens.ts` espelha tokens como constantes
  TypeScript. Stylelint verifica que cores só são usadas via
  `var(--color-*)`.
- Stylelint requer configuração manual das regras banidas (esforço
  inicial único).

**Ações:**
- `.stylelintrc.json` com regras de proibição (ver `docs/engineering/11-enforcement.md`).
- `src/styles/tokens.css` define todas as custom properties.
- `src/styles/tokens.ts` espelha nomes de tokens para uso em JS.
- Nenhum arquivo `.css` declara hex colors ou fontes de sistema.

---

## Referências

- `docs/engineering/04-css-architecture.md` — arquitetura detalhada de estilos.
- `docs/engineering/11-enforcement.md` — regras de Stylelint e verificação.
- `docs/design/01-principles.md` — Princípio 6 (redução, não minimalismo).
- `docs/design/05-chromatic-atmosphere.md` — sistema cromático.
