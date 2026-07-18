# SPRINT-000 · Fundação

---

## Objetivo
Projeto inicializável com toda a infraestrutura de tooling, tokens CSS
nas 4 camadas, tipografia carregando, filtros SVG de textura funcionando,
e todos os pares de contraste verificados. Nenhum componente ainda.

---

## Escopo
- Inicializar repositório Astro com TypeScript strict, Stylelint, ESLint
- Criar estrutura de diretórios (`src/components/{primitives,compounds,sections,layout}`, `src/styles`, `src/content`, `src/data`, `src/utils`, `src/icons`, `src/scripts`, `public/fonts`, `public/textures`, `public/images`)
- Implementar `tokens.css` com 4 camadas (Foundation, Semantic, Mode, State)
- Implementar `tokens.ts` espelhando tokens Semantic
- Implementar `reset.css`, `fonts.css`, `noise.css`, `layout.css`
- Criar SVG de filtros inline (`#grain`, `#stamp-rough`, `#glitch-offset`)
- Verificar e ajustar contraste de todos os pares texto/fundo (WCAG AA)
- Configurar scripts de build (`check:contrast`, `check:tokens`, `lint`)
- Configurar CI (GitHub Actions)

---

## Fora do escopo
- Qualquer componente (primitivas, compostos, seções, layouts)
- Islands, interação, JavaScript de runtime
- Pipeline de assets reais (fontes, texturas WebP, imagens processadas)
- Conteúdo real do portfólio (projetos, manifesto, about)

---

## Tasks contempladas
1. `tasks/000-project-bootstrap.md` — Scaffold Astro + tooling
2. `tasks/001-foundation.md` — Tokens, reset, fontes, filtros SVG
3. `tasks/002-design-tokens.md` — Verificação de contraste + modo noturno

---

## Reading Order

Leia antes de iniciar qualquer task deste sprint:

1. `AGENTS.md`
2. `WORKFLOW.md`
3. `planning/ROADMAP.md`
4. `planning/CURRENT.md`
5. `planning/SPRINT-000.md` (este arquivo)
6. `docs/adr/001-astro.md`
7. `docs/adr/002-typescript.md`
8. `docs/adr/003-css-modules.md`
9. `docs/adr/004-design-tokens.md`
10. `docs/adr/007-svg-noise.md`
11. `docs/adr/011-font-loading.md`
12. `docs/adr/012-type-system.md`
13. `docs/engineering/00-overview.md`
14. `docs/engineering/01-design-tokens.md`
15. `docs/engineering/04-css-architecture.md`
16. `docs/engineering/11-enforcement.md`

A Reading Order específica de cada task complementa esta lista.

---

## Ordem de execução

```
TASK-000 (bootstrap)
    ↓
TASK-001 (foundation)
    ↓
TASK-002 (design tokens)
```

Estritamente sequencial. Uma task só inicia após a anterior ser concluída
e ter todos os checklists de revisão aprovados.

---

## Critérios de aceite do sprint

- [ ] `npm run build` completa sem erros
- [ ] `npm run lint` passa (Stylelint + ESLint)
- [ ] `npm run check:contrast` passa (todos os pares WCAG AA)
- [ ] `npm run check:tokens` passa (nenhum Foundation referenciado fora de `tokens.css`)
- [ ] `npx astro check` passa (type-checking)
- [ ] Modo noturno funcional e distinto do diurno (não é inversão simples)
- [ ] `prefers-reduced-motion: reduce` zera todas as durações de motion
- [ ] `prefers-reduced-data: reduce` zera nível de textura
- [ ] Estrutura de diretórios corresponde ao especificado em `docs/engineering/02-component-architecture.md`
- [ ] Nenhum componente implementado ainda (apenas arquivos de estilo, tokens e config)
- [ ] Nenhuma dependência proibida instalada

---

## Checklist de validação

- [ ] Todos os checklists de revisão das 3 tasks passam
- [ ] Tokens Foundation nunca referenciados fora de `tokens.css`
- [ ] Nenhum hex color em arquivos de componente (não há componentes ainda — verificar styles)
- [ ] Fontes declaradas como `@font-face` com `font-display: swap`
- [ ] SVG de filtros contém `#grain`, `#stamp-rough`, `#glitch-offset`
- [ ] `.stylelintrc.json` bloqueia as propriedades banidas (`border-radius`, `box-shadow`, `linear-gradient`, `ease`, etc.)
- [ ] `.eslint.config.js` bloqueia imports de bibliotecas proibidas (framer-motion, GSAP, Radix, etc.)
- [ ] CI configurado (`.github/workflows/check.yml`)

---

## Definition of Done

- Todas as tasks do sprint têm seus checklists de revisão integralmente aprovados.
- `npm run build` produz output limpo, sem warnings.
- `planning/CURRENT.md` foi atualizado (sprint concluído, próximo sprint ativado).
- `planning/HISTORY.md` foi atualizado com a entrada deste sprint.
- Sprint Review abaixo foi preenchida.

---

## Próxima Sprint
`planning/SPRINT-001.md` · Componentes (TASK-003, 004, 005)

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
