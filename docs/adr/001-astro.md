# ADR-001 · Astro como framework

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

O portfólio é uma página única com 8 seções, ~15 componentes e
interatividade mínima (scroll spy, glitch hover, expansão de projeto,
filtro). O design é construído como antítese de interfaces SPA e
padrões de produto. A performance é crítica — texturas, fontes e
imagens já consomem ~230KB; o framework não deve adicionar overhead.

Precisamos de um framework que:
- Suporte componentização com escopo de estilo.
- Permita zero JavaScript por padrão.
- Ofereça hidratação seletiva para os poucos componentes interativos.
- Integre validação de dados em build time.
- Gere HTML estático (sem servidor, sem runtime).

---

## Decisão

**Astro** como framework único. Site gerado estaticamente (SSG).
Nenhum outro framework de UI (React, Vue, Svelte).

Ilhas Astro para os 3 componentes interativos:
- `NavigationItem` → `client:load` (scroll spy, precisa detectar URL imediatamente).
- `ProjectPreview` → `client:visible` (glitch + scanner overlay, só ativa na viewport).
- `FilterBar` → `client:idle` (disjuntor snap, baixa prioridade).

---

## Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **Next.js** | Overhead de React (~130KB de runtime). SPA desnecessário para navegação por âncoras. Hidratação completa — não oferece islands. |
| **11ty (Eleventy)** | Excelente para sites estáticos, mas sem componentização nativa (usa templates includes). Sem type-safety integrada. |
| **Hugo** | Template language limitada (Go templates). Sem TypeScript. Sem componentização com escopo de estilo. |
| **HTML + CSS puro** | Sem componentização — duplicação de markup. Sem type-safety. Sem Content Collections. Manutenção frágil em 15 componentes. |
| **Astro + React** | Islands com React adicionam ~130KB apenas para 3 componentes interativos. Vanilla JS/TS nos islands é suficiente e não adiciona runtime. |

---

## Consequências

**Positivas:**
- Zero JavaScript enviado para 12 dos 15 componentes.
- Build estático — sem servidor, custo zero de hospedagem.
- Content Collections com Zod validam dados dos projetos em build time.
- CSS Modules e TypeScript são first-class no Astro.
- `astro check` verifica tipos em todo o projeto.

**Negativas:**
- Islands com vanilla JS/TS exigem implementação manual de
  hidratação/desidratação (sem React hooks, sem lifecycle).
- Componentes interativos não compartilham estado global (não
  necessário — cada island é independente).
- Ecossistema menor que Next.js para edge cases.

**Ações:**
- Todo componente não-interativo é `.astro` (sem `client:` directive).
- Islands são `.astro` com `<script>` vanilla TS ou Web Components.
- Navegação é via âncoras nativas (`/#projetos`) — sem router.

---

## Referências

- `docs/engineering/10-integration-contracts.md` — estrutura de páginas e dados.
- `docs/engineering/02-component-architecture.md` — catálogo de componentes e ilhas.
- `docs/design/01-principles.md` — Princípio 6 (redução, não minimalismo).
- ADR-002 (TypeScript), ADR-003 (CSS Modules), ADR-005 (Content Collections).
