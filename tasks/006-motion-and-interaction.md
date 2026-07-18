# TASK-006 · Motion and Interaction

## Objetivo
Implementar as 3 ilhas Astro com o sistema de motion completo:
NavigationItem (scroll spy + glitch), ProjectPreview (glitch +
scanner overlay + trilho expand), FilterBar (disjuntor snap).

## Contexto
Até agora, todos os componentes são estáticos — zero JavaScript.
Esta task adiciona interatividade apenas onde o design exige,
usando ilhas Astro com hidratação seletiva e vanilla TypeScript
(sem React, Vue ou bibliotecas de animação).

## Reading Order
1. `docs/design/07-temporal-behavior.md`
2. `docs/design/13-components/navigation.md`
3. `docs/design/13-components/project-preview.md`
4. `docs/design/13-components/projects.md`
5. `docs/engineering/05-motion-system.md`
6. `docs/engineering/03-component-contracts.md` (NavigationItem, ProjectPreview, FilterBar)
7. `docs/engineering/06-responsive-strategy.md`
8. `docs/adr/001-astro.md` (islands)

## Dependências
- [x] TASK-005 (layouts and sections)

## Critérios de aceite
- [x] `NavigationItem` tem scroll spy: item ativo atualiza conforme scroll
- [x] `NavigationItem` hover causa glitch (150ms, steps(3))
- [x] `NavigationItem` click navega via âncora nativa
- [x] `ProjectPreview` hover: grid lines glitcham + scanner overlay (banda 800ms)
- [x] `ProjectPreview` focus: bracket de cota visível na lateral
- [x] `ProjectPreview` expand: trilho vertical (300ms linear) revela detalhes
- [x] `ProjectPreview` expand: vizinhos mantêm posição
- [x] `ProjectPreview` load inicial: scanner overlay via IntersectionObserver
- [x] `FilterBar` click: disjuntor snap — troca imediata de estado
- [x] Todos os movimentos respeitam `prefers-reduced-motion: reduce`
- [x] Glitch completamente removido com `prefers-reduced-motion: reduce`

## Restrições
- NUNCA usar `ease`, `ease-in-out`, `cubic-bezier()`
- NUNCA usar bibliotecas de animação (framer-motion, GSAP, anime.js)
- NUNCA usar `Math.random()` (glitch usa keyframes fixas, não aleatoriedade JS)
- NUNCA animar `opacity` para fade-in/out
- NUNCA animar `transform: scale()`
- NUNCA fazer stagger animation em lista de projetos
- NUNCA scroll hijacking (`scroll-behavior: smooth`, `overflow: hidden`)
- NUNCA animação infinita (exceto cursor blink da datilográfica)
- Typewriter só dispara na primeira visita (sessionStorage)

## Fora do escopo
- Datilográfica em headlines (pode ser implementada como bônus, não obrigatória)
- Scanner na transição entre seções (ResidualSpace → próxima seção — bônus)
- Shaders WebGL (fase futura)

## Entregáveis
- [x] `src/components/compounds/NavigationItem.astro` (atualizado)
- [x] `src/components/compounds/FilterBar.astro` (atualizado com script)
- [x] `src/components/compounds/ProjectPreview.astro` (criado com script completo)
- [x] `src/utils/motion.ts` (isMotionEnabled, getMotionDuration)
- [x] `src/utils/scroll-spy.ts` (IntersectionObserver)
- [x] `src/utils/scanner-observer.ts` (IntersectionObserver)

## Checklist de implementação
- [x] 1. Criar `motion.ts`
- [x] 2. Criar `scroll-spy.ts`
- [x] 3. Scroll spy + glitch no PortfolioLayout
- [x] 4. Criar `scanner-observer.ts`
- [x] 5. Criar `ProjectPreview.astro` com glitch + scanner + trilho
- [x] 6. Atualizar `FilterBar.astro` com disjuntor snap
- [x] 7. Verificar `prefers-reduced-motion`
- [x] 8. Verificar glitch removido com reduced-motion
- [x] 9. Verificar build: JS leve (~1.7kB)

## Checklist de revisão
- [x] `npm run lint` passa
- [x] `npx astro check` passa
- [x] `npm run build` completa
- [x] Scroll spy atualiza item ativo corretamente
- [x] Glitch no hover de NavigationItem (CSS steps via classe `.glitching`)
- [x] Scanner overlay no hover de ProjectPreview
- [x] Expansão de projeto: toggle click
- [x] Filtro: troca imediata (transition: none)
- [x] `prefers-reduced-motion: reduce` remove todas as animações
- [x] JS leve (~1.7kB total)
- [x] Nenhuma dependência de animação no bundle
