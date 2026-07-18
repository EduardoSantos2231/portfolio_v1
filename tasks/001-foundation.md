# TASK-001 · Foundation

## Objetivo
Implementar todos os arquivos de fundação estática: reset CSS, fontes,
filtros SVG de textura, e tokens de design (CSS custom properties).

## Contexto
Antes que qualquer componente possa ser implementado, os fundamentos
visuais precisam existir. Esta task cria a camada de estilos globais
e os tokens que todos os componentes consumirão.

## Reading Order
1. `docs/design/05-chromatic-atmosphere.md`
2. `docs/design/06-typographic-character.md`
3. `docs/design/08-material-atmosphere.md`
4. `docs/engineering/01-design-tokens.md`
5. `docs/engineering/04-css-architecture.md`
6. `docs/adr/003-css-modules.md`
7. `docs/adr/004-design-tokens.md`
8. `docs/adr/007-svg-noise.md`
9. `docs/adr/011-font-loading.md`
10. `docs/adr/012-type-system.md`

## Dependências
- [x] TASK-000 (project bootstrap)

## Critérios de aceite
- [x] `tokens.css` define todas as 4 camadas (Foundation, Semantic, Mode, State)
- [x] `tokens.ts` espelha tokens Semantic como constantes TypeScript
- [x] `reset.css` aplica reset mínimo sem opiniões externas
- [x] `fonts.css` declara @font-face para as 3 famílias (7 arquivos)
- [x] `noise.css` declara classes de textura (`.surface-grain`, `.image-scanlines`, `.stamp-border`)
- [x] SVG de filtros inline contém `#grain`, `#stamp-rough`, `#glitch-offset`
- [x] Modo noturno funcional via `[data-theme="dark"]`
- [x] Tokens de motion respondem a `prefers-reduced-motion`
- [x] Tokens de textura respondem a `prefers-reduced-data`

## Restrições
- Não criar componentes (apenas arquivos de estilo e tokens)
- Não usar hex colors ou fontes de sistema em lugar nenhum
- Fontes devem ser placeholder (arquivos reais virão do pipeline de build)
- Tokens Foundation nunca são referenciados fora de `tokens.css`

## Fora do escopo
- Componentes (TASK-003 em diante)
- Pipeline de fontes (TASK-007)
- Texturas WebP (TASK-007)

## Entregáveis
- [x] `src/styles/tokens.css`
- [x] `src/styles/tokens.ts`
- [x] `src/styles/reset.css`
- [x] `src/styles/fonts.css`
- [x] `src/styles/noise.css`
- [x] `src/styles/layout.css` (apenas variáveis compartilhadas)
- [x] SVG de filtros (noise.svg) importado pelo layout raiz

## Checklist de implementação
- [x] 1. Criar `tokens.css` com camada FOUNDATION
- [x] 2. Adicionar camada SEMANTIC
- [x] 3. Adicionar camada MODE
- [x] 4. Adicionar camada STATE
- [x] 5. Criar `tokens.ts`
- [x] 6. Criar `reset.css`
- [x] 7. Criar `fonts.css`
- [x] 8. Criar SVG de filtros
- [x] 9. Criar `noise.css`
- [x] 10. Criar `layout.css`
- [x] 11. Verificar custom properties no dev tools
- [x] 12. Verificar modo noturno

## Checklist de revisão
- [x] `npm run check:contrast` passa (ajustado em TASK-002)
- [x] `npm run check:tokens` passa
- [x] `npm run lint` passa
- [x] Modo noturno é distinto do diurno
- [x] `prefers-reduced-motion: reduce` zera todas as durações
- [x] Nenhuma cor hex em arquivos fora de `tokens.css`
