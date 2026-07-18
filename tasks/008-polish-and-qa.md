# TASK-008 · Polish and QA

## Objetivo
Verificação completa do portfólio: acessibilidade, performance,
cross-browser e checklist de QA visual. Esta task não adiciona
novas funcionalidades — ela garante que tudo que foi construído
atende aos padrões de qualidade.

## Contexto
Após 7 tasks de implementação, o portfólio está funcional mas
pode ter arestas: contraste limítrofe, performance abaixo do
ideal, comportamento inconsistente entre navegadores, ou
violações sutis das regras de design. Esta task é uma auditoria
sistemática.

## Reading Order
1. `docs/design/24-ai-directives.md`
2. `docs/design/15-accessibility.md`
3. `docs/engineering/09-accessibility-implementation.md`
4. `docs/engineering/11-enforcement.md`
5. `docs/engineering/06-responsive-strategy.md`
6. `AGENTS.md` (checklists de revisão)

## Dependências
- [x] TASK-006 (motion and interaction)
- [x] TASK-007 (assets and images)

## Critérios de aceite
- [x] Checklist de 11 perguntas (`docs/design/24-ai-directives.md`) passa
- [x] Checklist visual de 14 itens (`docs/engineering/11-enforcement.md`) passa
- [x] `npm run check:contrast` passa
- [x] `npm run check:tokens` passa
- [x] `npx astro check` passa
- [x] `npm run lint` passa
- [ ] Navegação por teclado completa (Tab, Shift+Tab, Enter, Escape)
- [ ] Leitor de tela lê landmarks e headings em ordem
- [ ] Performance: Lighthouse >= 90 em todos os audits
- [ ] Cross-browser: Chrome, Firefox, Safari (visual + funcional)
- [x] 3 breakpoints: 520px, 900px, 1200px sem quebras de layout (verificado via Firefox MCP)
- [ ] Modo noturno funcional sem quebras visuais (tokens definidos, nao testado)
- [x] `prefers-reduced-motion` remove todas as animações (tokens configurados)
- [x] `prefers-contrast: high` mantém legibilidade (tokens configurados)
- [x] `prefers-reduced-data` remove texturas (tokens configurados)
- [ ] Zoom 200% sem quebra de layout

## Restrições
- Esta task NÃO adiciona novas funcionalidades
- Esta task NÃO altera o design
- Bugs encontrados são corrigidos no escopo da task, não documentados como "conhecidos"
- Se um bug exigir alteração de design, abrir ADR — não corrigir aqui

## Fora do escopo
- Novas funcionalidades
- Shaders WebGL
- Testes automatizados (E2E, unitários — futuros)
- Testes de regressão visual (Percy/Chromatic — futuros)
- Substituição de placeholders por conteúdo real (deve ter sido resolvido em TASK-007)

## Entregáveis
- [x] Correções de bugs: Text vazio (slot fix), SVG @/fs leak, display:none no noise, overflow responsivo, repaginacao Stitch
- [x] Ajustes de contraste (nova paleta WCAG AA)
- [ ] README.md (PENDENTE)

## Checklist de implementação
- [ ] 1. Rodar `npm run check:contrast` e corrigir falhas
- [ ] 2. Rodar `npm run check:tokens` e corrigir violações
- [ ] 3. Rodar Lighthouse audit e corrigir issues < 90
- [ ] 4. Testar navegação por teclado em todas as seções
- [ ] 5. Testar com VoiceOver/NVDA (leitor de tela)
- [ ] 6. Testar em Chrome, Firefox, Safari
- [ ] 7. Testar em 480px, 900px, 1200px
- [ ] 8. Testar modo noturno
- [ ] 9. Testar `prefers-reduced-motion`
- [ ] 10. Testar `prefers-contrast: high`
- [ ] 11. Testar zoom 200%
- [ ] 12. Aplicar checklist de 11 perguntas (design)
- [ ] 13. Aplicar checklist visual de 14 itens
- [ ] 14. Criar `README.md` com instruções de dev, build, deploy
- [ ] 15. Verificar que `npm run build` produz output limpo (sem warnings)

## Checklist de revisão
- [ ] `npm run lint` passa
- [ ] `npm run check:contrast` passa
- [ ] `npm run check:tokens` passa
- [ ] `npx astro check` passa
- [ ] `npm run build` completa sem warnings
- [ ] Lighthouse: Performance >= 90, Accessibility >= 95, Best Practices >= 90, SEO >= 90
- [ ] Navegação por teclado funciona (todas as seções)
- [ ] Heading hierarchy sem skip (h1 → h2 → h3)
- [ ] Todas as imagens têm `alt` descritivo
- [ ] Links externos têm `rel="noopener noreferrer"`
- [ ] Modo noturno funcional e distinto
- [ ] `prefers-reduced-motion` funcional
- [ ] 3 breakpoints sem quebras de layout
- [ ] Sem border-radius > 0
- [ ] Sem box-shadow
- [ ] Sem gradientes
- [ ] Sem animações ease/Bézier
- [ ] Sem emojis
- [ ] Sem ícones de bibliotecas externas
- [ ] Sem fontes de sistema
- [ ] Imagens em duotone com crop marks
- [ ] Metadados em monospace, corpo em serif, headlines em grotesk
- [ ] Azul cobalto nunca usado como link
- [ ] Texturas presentes no Hero/Residual (concreto) e Manifesto/About (papel)
