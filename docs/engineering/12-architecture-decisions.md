# 12 · ÍNDICE DE ADRs

> As decisões de arquitetura estão documentadas em arquivos individuais
> em [`docs/adr/`](../adr/). Cada ADR segue o formato definido em
> [`000-template.md`](../adr/000-template.md).

---

| ADR | Arquivo | Decisão | Status |
|---|---|---|---|
| 000 | `000-template.md` | Template para novas ADRs | — |
| 001 | `001-astro.md` | Astro como framework | Aceito |
| 002 | `002-typescript.md` | TypeScript strict | Aceito |
| 003 | `003-css-modules.md` | CSS Modules + Custom Properties | Aceito |
| 004 | `004-design-tokens.md` | Hierarquia de tokens em 4 camadas | Aceito |
| 005 | `005-content-collections.md` | Content Collections + Zod | Aceito |
| 006 | `006-mdx.md` | MDX para projetos, Markdown para manifesto | Aceito |
| 007 | `007-svg-noise.md` | Filtros SVG inline para texturas | Aceito |
| 008 | `008-webgl-strategy.md` | Shaders WebGL como aprimoramento futuro | Aceito |
| 009 | `009-component-hierarchy.md` | Composição sobre herança, 5 camadas | Aceito |
| 010 | `010-image-pipeline.md` | Processamento de imagens em build time | Aceito |
| 011 | `011-font-loading.md` | Auto-hospedagem, subsetting, font-display | Aceito |
| 012 | `012-type-system.md` | Sistema tipográfico completo | Aceito |

---

## ADRs que anteriormente residiam neste arquivo

As decisões abaixo foram migradas para arquivos individuais. Este
arquivo agora serve apenas como índice navegável.

| ADR original | Migrada para |
|---|---|
| ADR-001: Seleção tipográfica | `012-type-system.md` (escopo ampliado) |
| ADR-002: Estratégia de CSS | `003-css-modules.md` |
| ADR-003: Nenhuma biblioteca de componentes | Incorporada em `003-css-modules.md` e `009-component-hierarchy.md` |
| ADR-004: Pipeline de assets em build time | `010-image-pipeline.md` |
| ADR-005: Shaders WebGL | `008-webgl-strategy.md` |
| ADR-006: Arquitetura de composição | `009-component-hierarchy.md` |
| ADR-007: Portfolio como página única | Incorporada em `001-astro.md` |
