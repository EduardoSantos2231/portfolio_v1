# TASK-004 · Compounds

## Objetivo
Implementar os 8 compostos da camada B da arquitetura de componentes.

## Contexto
Compostos combinam primitivas em padrões reutilizáveis. Eles conhecem
apenas primitivas — nunca outros compostos. Podem ter estado local
simples (hover, focus, active) mas nunca efeitos colaterais globais.

## Reading Order
1. `docs/design/13-components/hero.md` (estrutura de título de seção)
2. `docs/design/13-components/project-preview.md` (metadados)
3. `docs/design/11-photography.md` (legendas, crop marks)
4. `docs/design/07-temporal-behavior.md` (glitch hover)
5. `docs/engineering/02-component-architecture.md` (camada B)
6. `docs/engineering/03-component-contracts.md` (compostos)
7. `docs/engineering/05-motion-system.md` (implementação de glitch)
8. `docs/adr/009-component-hierarchy.md`

## Dependências
- [x] TASK-003 (primitives)

## Critérios de aceite
- [x] `SectionTitle.astro` renderiza `[LABEL]` ou `§ LABEL`
- [x] `MetadataLine.astro` renderiza `label · value` em monospace
- [x] `ProjectMetadata.astro` renderiza data, categoria, tecnologias, descrição
- [x] `Quotation.astro` renderiza citação estoica (rule + serif italic + atribuição)
- [x] `ContactLine.astro` renderiza linha de contato com marca de referência
- [x] `NavigationItem.astro` renderiza link de navegação com estados
- [x] `FilterBar.astro` renderiza filtros inline com estado ativo
- [x] `ProjectImage.astro` renderiza imagem com crop marks e legenda
- [x] Nenhum composto importa outro composto

## Restrições
- Compostos nunca importam outros compostos
- Compostos nunca definem layout (grid, position absolute em relação à página)
- Estados de interação (hover, focus, active) são permitidos no escopo do composto
- Nenhum composto emite efeitos colaterais globais
- `NavigationItem` NUNCA usa underline padrão de link
- `NavigationItem` NUNCA muda de cor no hover (apenas glitch)
- `FilterBar` NUNCA usa pills, chips ou badges
- `ProjectImage` SEMPRE usa tratamento Blueprint
- `ProjectImage` SEMPRE renderiza crop marks nos cantos

## Fora do escopo
- Ilhas/interação com JS (TASK-006 — aqui apenas CSS para hover/focus)
- Seções (TASK-005)

## Entregáveis
- [x] `src/components/compounds/SectionTitle.astro`
- [x] `src/components/compounds/MetadataLine.astro`
- [x] `src/components/compounds/ProjectMetadata.astro`
- [x] `src/components/compounds/Quotation.astro`
- [x] `src/components/compounds/ContactLine.astro`
- [x] `src/components/compounds/NavigationItem.astro`
- [x] `src/components/compounds/FilterBar.astro`
- [x] `src/components/compounds/ProjectImage.astro`

## Checklist de implementação
- [x] 1. Implementar `SectionTitle`
- [x] 2. Implementar `MetadataLine`
- [x] 3. Implementar `ProjectMetadata`
- [x] 4. Implementar `Quotation`
- [x] 5. Implementar `ContactLine`
- [x] 6. Implementar `NavigationItem`
- [x] 7. Implementar `FilterBar`
- [x] 8. Implementar `ProjectImage`
- [x] 9. Verificar que nenhum composto importa outro composto
- [x] 10. Verificar que todos usam tokens, nunca valores literais

## Checklist de revisão
- [x] `npm run lint` passa
- [x] `npx astro check` passa
- [x] `npm run check:tokens` passa
- [x] `npm run build` completa
- [x] `SectionTitle` renderiza brackets ou § antes/depois do label
- [x] `MetadataLine` renderiza label em cobalt-blue e value em ink-black
- [x] `Quotation` tem regra horizontal acima, serif italic, attribution em mono cobalt
- [x] `Quotation` com Sêneca/Marco Aurélio usa fundo marble (exceção)
- [x] `NavigationItem` ativo mostra linha horizontal (cota de nível)
- [x] `NavigationItem` hover causa glitch (CSS apenas — JS na TASK-006)
- [x] `FilterBar` item ativo é bold + linha horizontal
- [x] `ProjectImage` tem margem interna + crop marks + legenda
- [x] Nenhum composto define margin ou position absoluto
