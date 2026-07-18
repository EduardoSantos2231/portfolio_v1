# SPRINT-001 · Componentes

---

## Objetivo
Sistema de componentes completo — primitivas, compostos, seções e layouts —
com a página `index.astro` renderizando o portfólio estático completo.

---

## Escopo
- Implementar 7 primitivas (Text, Rule, Surface, Image, TechnicalMark, CropMark, GridLine)
- Criar SVGs de marcas técnicas em `src/icons/`
- Implementar 8 compostos (SectionTitle, MetadataLine, ProjectMetadata, Quotation, ContactLine, NavigationItem, FilterBar, ProjectImage)
- Implementar 4 layouts (PortfolioLayout, EditorialLayout, TechnicalLayout, MonumentalLayout)
- Implementar 7 seções (HeroSection, ManifestoSection, AboutSection, ProjectsSection, ContactSection, ResidualSpace, Footer)
- Compor `index.astro` com a ordem narrativa correta

---

## Fora do escopo
- Islands, interação com JavaScript (componentes são 100% estáticos)
- Pipeline de assets reais (imagens são placeholders)
- Conteúdo real do portfólio (dados mock ou Content Collections vazias)
- Motion, animações, glitch, scanner

---

## Tasks contempladas
1. `tasks/003-primitives.md` — 7 primitivas + ícones SVG
2. `tasks/004-compounds.md` — 8 compostos
3. `tasks/005-layouts-and-sections.md` — 4 layouts + 7 seções + index.astro

---

## Reading Order

Leia antes de iniciar qualquer task deste sprint:

1. `AGENTS.md`
2. `planning/CURRENT.md`
3. `planning/SPRINT-001.md` (este arquivo)
4. `docs/design/03-layout-rules.md`
5. `docs/design/04-proportion-and-rhythm.md`
6. `docs/design/06-typographic-character.md`
7. `docs/design/10-iconography.md`
8. `docs/design/11-photography.md`
9. `docs/design/12-composition.md`
10. `docs/design/13-components/hero.md`
11. `docs/design/13-components/manifesto.md`
12. `docs/design/13-components/about.md`
13. `docs/design/13-components/projects.md`
14. `docs/design/13-components/project-preview.md`
15. `docs/design/13-components/contact.md`
16. `docs/design/13-components/footer.md`
17. `docs/design/13-components/navigation.md`
18. `docs/design/22-storytelling.md`
19. `docs/engineering/02-component-architecture.md`
20. `docs/engineering/03-component-contracts.md`
21. `docs/engineering/06-responsive-strategy.md`
22. `docs/adr/009-component-hierarchy.md`

A Reading Order específica de cada task complementa esta lista.

---

## Ordem de execução

```
TASK-003 (primitives)
    ↓
TASK-004 (compounds)
    ↓
TASK-005 (layouts and sections)
```

Estritamente sequencial. Compostos dependem de primitivas. Seções dependem
de compostos. Layouts são implementados junto com as seções.

---

## Critérios de aceite do sprint

- [ ] `npm run build` completa sem erros
- [ ] `npm run lint` passa
- [ ] `npm run check:tokens` passa
- [ ] `npx astro check` passa
- [ ] Todos os componentes usam tokens, nunca valores literais
- [ ] Nenhuma primitiva importa outra primitiva
- [ ] Nenhum composto importa outro composto
- [ ] Nenhuma seção importa outra seção
- [ ] Layouts usam slots nomeados, nunca importam primitivas ou compostos
- [ ] `index.astro` compõe seções na ordem: Hero → Manifesto → About → Projetos → Contato → Footer
- [ ] `ResidualSpace` entre cada par de seções
- [ ] Página renderiza corretamente em 3 breakpoints (480px, 900px, 1200px)
- [ ] Navegação é sempre visível (nunca hambúrguer)
- [ ] Zero JavaScript em todos os componentes (estáticos)
- [ ] Nenhum border-radius > 0, box-shadow, gradiente, emoji

---

## Checklist de validação

- [ ] Todos os checklists de revisão das 3 tasks passam
- [ ] Contratos de componente (`docs/engineering/03-component-contracts.md`) integralmente implementados
- [ ] Grid de projetos tem linhas visíveis entre células
- [ ] Hero ocupa 100dvh, nome alinhado à esquerda, sem botão/CTA
- [ ] Manifesto tem margens editoriais, texto em serif
- [ ] About tem formato de ficha técnica (label: valor)
- [ ] Contato tem formato de coordenadas (sem formulário)
- [ ] Footer não é sticky, não tem "©" nem "Made with ❤️"
- [ ] Texturas de concreto no Hero e ResidualSpace
- [ ] Textura de papel no Manifesto e About

---

## Definition of Done

- Todas as tasks do sprint têm seus checklists de revisão integralmente aprovados.
- `npm run build` produz output limpo, sem warnings.
- `planning/CURRENT.md` foi atualizado (sprint concluído, próximo sprint ativado).
- `planning/HISTORY.md` foi atualizado com a entrada deste sprint.
- Sprint Review abaixo foi preenchida.

---

## Próxima Sprint
`planning/SPRINT-002.md` · Acabamento (TASK-006, 007, 008)

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

### Aprendizados que impactam as próximas sprints:
—

### Data de conclusão:
AAAA-MM-DD
