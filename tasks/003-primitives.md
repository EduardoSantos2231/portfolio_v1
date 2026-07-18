# TASK-003 · Primitives

## Objetivo
Implementar as 7 primitivas da camada A da arquitetura de componentes.

## Contexto
Primitivas são os átomos do design system. São funções puras de
props → markup, sem estado, sem dependências entre si. Elas são a
fundação sobre a qual todos os compostos e seções serão construídos.

## Reading Order
1. `docs/design/06-typographic-character.md`
2. `docs/design/10-iconography.md`
3. `docs/design/11-photography.md`
4. `docs/design/08-material-atmosphere.md`
5. `docs/engineering/02-component-architecture.md` (camada A)
6. `docs/engineering/03-component-contracts.md` (primitivas)
7. `docs/engineering/04-css-architecture.md`
8. `docs/adr/009-component-hierarchy.md`

## Dependências
- [x] TASK-001 (foundation)
- [x] TASK-002 (design tokens — recomendado, não estritamente obrigatório)

## Critérios de aceite
- [x] `Text.astro` renderiza texto na voz, tamanho e peso corretos
- [x] `Rule.astro` renderiza linha horizontal/vertical em aço ou tinta
- [x] `Surface.astro` aplica material de fundo (concreto bruto, concreto polido, papel, mármore)
- [x] `Image.astro` renderiza wrapper com duotone, margem, crop marks e legenda
- [x] `TechnicalMark.astro` renderiza SVG inline de marca técnica
- [x] `CropMark.astro` renderiza L de 8px nos cantos
- [x] `GridLine.astro` renderiza linha de grid visível entre células
- [x] Todas as primitivas são funções puras (sem estado, sem efeitos)
- [x] Nenhuma primitiva importa outra primitiva

## Restrições
- Primitivas nunca têm estado (sem `useState`, sem event handlers)
- Primitivas nunca definem margin/padding próprios (espaçamento é injetado pelo consumidor)
- Primitivas nunca emitem eventos
- `Text.astro` children é sempre string, nunca elementos aninhados
- `Surface.astro` com `material: 'marble'` é raro — apenas para Quotation
- `Image.astro` nunca renderiza imagem em cores naturais
- `Image.astro` nunca usa proporção 16:9
- `Image.astro` nunca usa border-radius ou box-shadow

## Fora do escopo
- Compostos (TASK-004)
- Seções (TASK-005)
- Islands/interação (TASK-006)
- Pipeline de imagens — usar placeholders (TASK-007)

## Entregáveis
- [x] `src/components/primitives/Text.astro`
- [x] `src/components/primitives/Rule.astro`
- [x] `src/components/primitives/Surface.astro`
- [x] `src/components/primitives/Image.astro`
- [x] `src/components/primitives/TechnicalMark.astro`
- [x] `src/components/primitives/CropMark.astro`
- [x] `src/components/primitives/GridLine.astro`
- [x] Arquivos SVG em `src/icons/`

## Checklist de implementação
- [x] 1. Criar SVGs de marcas técnicas em `src/icons/`
- [x] 2. Implementar `Text.astro`
- [x] 3. Implementar `Rule.astro`
- [x] 4. Implementar `Surface.astro`
- [x] 5. Implementar `Image.astro`
- [x] 6. Implementar `TechnicalMark.astro`
- [x] 7. Implementar `CropMark.astro`
- [x] 8. Implementar `GridLine.astro`
- [x] 9. Verificar que todas as primitivas usam tokens
- [x] 10. Verificar que nenhuma primitiva importa outra primitiva

## Checklist de revisão
- [x] `npm run lint` passa
- [x] `npx astro check` passa
- [x] `npm run check:tokens` passa
- [x] `npm run build` completa
- [x] `Text` com `voice: 'serif'` renderiza em Source Serif 4
- [x] `Text` com `voice: 'mono'` renderiza em IBM Plex Mono
- [x] `Text` com `voice: 'grotesk'` renderiza em Space Grotesk
- [x] `Surface` com `material: 'concrete-raw'` aplica cor e textura
- [x] `Image` com `treatment: 'blueprint'` aplica overlay de cor
- [x] `TechnicalMark` renderiza SVG inline com `currentColor`
- [x] `CropMark` renderiza nos 4 cantos
- [x] `GridLine` renderiza linha de 1px com cor de grid
- [x] Nenhuma primitiva define margin ou padding próprio
