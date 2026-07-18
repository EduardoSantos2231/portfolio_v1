# TASK-000 · Project Bootstrap

## Objetivo
Inicializar o projeto Astro com todas as configurações de tooling
necessárias para o desenvolvimento.

## Contexto
Antes de qualquer implementação, o projeto precisa de um scaffold
mínimo com Astro, TypeScript strict, Stylelint, ESLint e scripts
de build. Esta task estabelece a fundação sobre a qual todas as
outras tasks serão construídas.

## Reading Order
1. `docs/adr/001-astro.md`
2. `docs/adr/002-typescript.md`
3. `docs/adr/003-css-modules.md`
4. `docs/engineering/00-overview.md`
5. `docs/engineering/10-integration-contracts.md` (seção de scripts de build)

## Dependências
- Nenhuma (task inicial)

## Critérios de aceite
- [x] `npm create astro@latest` executado com template minimal
- [x] TypeScript configurado com `strict: true`
- [x] Stylelint configurado com regras de `docs/engineering/11-enforcement.md`
- [x] ESLint configurado com regras de `docs/engineering/11-enforcement.md`
- [x] Scripts de build configurados: `check:contrast`, `check:tokens`, `lint`, `build`
- [x] `npx astro check` passa (sem componentes ainda)
- [x] `npm run build` completa (página vazia com tokens.css carregado)
- [x] Estrutura de diretórios criada: `src/components/{primitives,compounds,sections,layout}`, `src/styles`, `src/content`, `src/data`, `src/utils`, `src/icons`, `src/scripts`, `public/fonts`, `public/textures`, `public/images`

## Restrições
- Não instalar React, Vue, Svelte ou qualquer framework UI adicional
- Não instalar Tailwind CSS ou qualquer biblioteca de CSS utility-first
- Não instalar bibliotecas de componentes (Radix, shadcn, Headless UI)
- Não instalar bibliotecas de animação (framer-motion, GSAP, anime.js)
- Não criar nenhum componente ainda

## Fora do escopo
- Templates, componentes, páginas (serão criados nas tasks seguintes)
- Pipeline de assets (TASK-007)
- Fontes (TASK-001 cobre @font-face)

## Entregáveis
- [x] `package.json` com scripts e dependências
- [x] `tsconfig.json` com `strict: true`
- [x] `astro.config.ts` com integração MDX
- [x] `.stylelintrc.json` com regras de proibição
- [x] `eslint.config.js` com regras de imports proibidos
- [x] Estrutura de diretórios `src/` e `public/`
- [x] `.gitignore` configurado
- [x] CI configurado (`.github/workflows/check.yml`)

## Checklist de implementação
- [x] 1. Inicializar projeto Astro (`npm create astro@latest`)
- [x] 2. Configurar TypeScript (`tsconfig.json` com strict)
- [x] 3. Configurar Stylelint (`.stylelintrc.json`)
- [x] 4. Configurar ESLint (`eslint.config.js`)
- [x] 5. Criar estrutura de diretórios
- [x] 6. Configurar scripts no `package.json`
- [x] 7. Configurar CI (GitHub Actions)
- [x] 8. Verificar que `npx astro check` passa
- [x] 9. Verificar que `npm run lint` passa (sem código ainda)
- [x] 10. Verificar que `npm run build` completa

## Checklist de revisão
- [x] `npm run lint` passa
- [x] `npx astro check` passa
- [x] `npm run build` completa
- [x] Estrutura de diretórios corresponde ao especificado em `docs/engineering/02-component-architecture.md`
- [x] Nenhuma dependência proibida instalada
