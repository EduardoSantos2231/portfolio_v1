# SPRINT-002 · Acabamento

---

## Objetivo
Portfólio completo e interativo: ilhas Astro com sistema de motion,
pipeline de assets reais (fontes, texturas WebP, imagens com duotone),
conteúdo real do portfólio, e auditoria final de qualidade.

---

## Escopo
- Implementar 3 ilhas Astro (NavigationItem, ProjectPreview, FilterBar)
- Implementar sistema de motion completo (5 metáforas)
- Pipeline de fontes: download + subsetting para woff2
- Pipeline de texturas: gerar `concrete.webp` e `paper.webp`
- Pipeline de imagens: duotone (Blueprint/Calor) + crop marks + AVIF/WebP/PNG
- Criar conteúdo real: manifesto, about, projetos (mínimo 3)
- Auditoria completa: acessibilidade, performance, cross-browser, QA visual

---

## Fora do escopo
- Shaders WebGL (fase futura)
- Página individual de projeto
- Blog, Laboratório, i18n
- Testes automatizados (E2E, unitários)
- Testes de regressão visual (Percy/Chromatic)

---

## Tasks contempladas
1. `tasks/006-motion-and-interaction.md` — Islands + motion system
2. `tasks/007-assets-and-images.md` — Pipeline + conteúdo real
3. `tasks/008-polish-and-qa.md` — Auditoria final

---

## Reading Order

Leia antes de iniciar qualquer task deste sprint:

1. `AGENTS.md`
2. `planning/CURRENT.md`
3. `planning/SPRINT-002.md` (este arquivo)
4. `docs/design/07-temporal-behavior.md`
5. `docs/design/08-material-atmosphere.md`
6. `docs/design/11-photography.md`
7. `docs/design/14-copywriting.md`
8. `docs/design/15-accessibility.md`
9. `docs/design/24-ai-directives.md`
10. `docs/engineering/05-motion-system.md`
11. `docs/engineering/07-asset-pipeline.md`
12. `docs/engineering/09-accessibility-implementation.md`
13. `docs/engineering/10-integration-contracts.md`
14. `docs/engineering/11-enforcement.md`
15. `docs/adr/005-content-collections.md`
16. `docs/adr/006-mdx.md`
17. `docs/adr/010-image-pipeline.md`
18. `docs/adr/011-font-loading.md`

A Reading Order específica de cada task complementa esta lista.

---

## Ordem de execução

```
TASK-006 (motion and interaction)
    ↓
TASK-007 (assets and images)
    ↓
TASK-008 (polish and QA)
```

TASK-007 (pipeline de assets) pode ser parcialmente paralelizada em relação
à TASK-006 (não há dependência técnica entre motion e assets). No entanto,
recomenda-se execução sequencial para evitar conflitos de merge em
`package.json` e configuração de build.

---

## Critérios de aceite do sprint

- [ ] `npm run build` completa sem erros
- [ ] `npm run lint` passa
- [ ] `npm run check:contrast` passa
- [ ] `npm run check:tokens` passa
- [ ] `npm run check:images` passa
- [ ] `npx astro check` passa
- [ ] Checklist de 11 perguntas (`docs/design/24-ai-directives.md`) integralmente aprovado
- [ ] Checklist visual de 14 itens (`docs/engineering/11-enforcement.md`) aprovado
- [ ] Lighthouse: Performance >= 90, Accessibility >= 95, Best Practices >= 90
- [ ] Navegação completa por teclado (Tab, Shift+Tab, Enter, Escape)
- [ ] Leitor de tela funcional (landmarks, headings, alt text)
- [ ] `prefers-reduced-motion: reduce` remove todas as animações
- [ ] `prefers-contrast: high` mantém legibilidade
- [ ] `prefers-reduced-data: reduce` remove texturas
- [ ] Cross-browser: Chrome, Firefox, Safari sem quebras
- [ ] 3 breakpoints (480px, 900px, 1200px) sem quebras de layout
- [ ] Modo noturno funcional e distinto
- [ ] Zoom 200% sem quebra de layout

---

## Checklist de validação

- [ ] Todos os checklists de revisão das 3 tasks passam
- [ ] Fontes carregam de `public/fonts/` (não de CDN externo)
- [ ] `font-display: swap` em todas as @font-face
- [ ] `<link rel="preload">` para Space Grotesk Bold
- [ ] Texturas de concreto e papel geradas e visíveis
- [ ] Todas as imagens em duotone (Blueprint ou Calor)
- [ ] Crop marks visíveis nos cantos de todas as imagens
- [ ] Legendas no formato `FIG. NN — descrição — data — contexto`
- [ ] Conteúdo do manifesto segue `docs/design/14-copywriting.md`
- [ ] Projetos carregam via Content Collections com schema Zod
- [ ] Sem "Olá", sem "apaixonado", sem "transformar o mundo" no texto
- [ ] Islands (NavigationItem, ProjectPreview, FilterBar) funcionais
- [ ] Motion system funcional e restrito às 5 metáforas
- [ ] Zero JS em componentes não-interativos

---

## Definition of Done

- Todas as tasks do sprint têm seus checklists de revisão integralmente aprovados.
- `npm run build` produz output limpo, sem warnings.
- `planning/CURRENT.md` foi atualizado (MVP concluído).
- `planning/HISTORY.md` foi atualizado com a entrada deste sprint.
- Sprint Review abaixo foi preenchida.
- MVP está pronto para deploy.

---

## Próxima Sprint
Nenhuma. MVP concluído. Próximas funcionalidades conforme backlog em `ROADMAP.md`.

---

## Sprint Review

*(Preencher apenas na conclusão do sprint.)*

### O objetivo foi atingido?
—

### Houve desvios em relação ao planejamento?
—

### Alguma ADR foi criada ou alterada?
—

### Alguma Task futura precisa ser ajustada?
—

### Aprendizados que impactam o futuro do projeto:
—

### Data de conclusão:
AAAA-MM-DD
