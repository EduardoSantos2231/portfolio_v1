# TASK-005 · Layouts and Sections

## Objetivo
Implementar 4 layouts, 7 seções e a página `index.astro` que compõem
o portfólio completo.

## Contexto
Esta task constrói o portfólio como uma página única, compondo
seções dentro de layouts. É a task que transforma o sistema de
componentes em uma experiência navegável.

## Reading Order
1. `docs/design/03-layout-rules.md`
2. `docs/design/04-proportion-and-rhythm.md`
3. `docs/design/12-composition.md`
4. `docs/design/22-storytelling.md`
5. `docs/design/13-components/hero.md`
6. `docs/design/13-components/manifesto.md`
7. `docs/design/13-components/about.md`
8. `docs/design/13-components/projects.md`
9. `docs/design/13-components/project-preview.md`
10. `docs/design/13-components/contact.md`
11. `docs/design/13-components/footer.md`
12. `docs/engineering/02-component-architecture.md` (camadas C, D, E)
13. `docs/engineering/03-component-contracts.md` (seções e layouts)
14. `docs/engineering/06-responsive-strategy.md`
15. `docs/adr/009-component-hierarchy.md`

## Dependências
- [x] TASK-004 (compounds)

## Critérios de aceite
- [x] `PortfolioLayout.astro` dispõe seções verticalmente com ResidualSpace entre elas
- [x] `EditorialLayout.astro` aplica margens editoriais + coluna de texto
- [x] `TechnicalLayout.astro` aplica grid de colunas com GridLine visíveis
- [x] `MonumentalLayout.astro` aplica 100dvh + margens monumentais
- [x] `HeroSection.astro` renderiza nome + descritor em espaço monumental
- [x] `ManifestoSection.astro` renderiza texto editorial com anotações marginais
- [x] `AboutSection.astro` renderiza ficha técnica com campos
- [x] `ProjectsSection.astro` renderiza grid de projetos com filtro
- [x] `ContactSection.astro` renderiza coordenadas de contato
- [x] `ResidualSpace.astro` renderiza superfície de concreto sem conteúdo
- [x] `Footer` renderiza navegação + metadados do portfólio (inline no PortfolioLayout)
- [x] `index.astro` compõe todas as seções na ordem narrativa correta
- [x] Layouts usam slots para receber seções
- [x] Layouts nunca importam primitivas ou compostos
- [x] Seções nunca importam outras seções

## Restrições
- Nenhuma seção define seu próprio grid (grid é injetado pelo layout)
- Nenhuma seção conhece a ordem narrativa (ordem é definida em `index.astro`)
- `HeroSection` NUNCA tem botão, CTA, foto do autor, ou imagem de fundo
- `ContactSection` NUNCA tem formulário de contato
- `Footer` NUNCA é sticky (fixo)
- `Footer` NUNCA tem "© 2024", "Made with ❤️", ou links de política
- Navegação NUNCA é hambúrguer — sempre visível
- Imagens em `ProjectImage` são placeholders (pipeline na TASK-007)
- Conteúdo textual usa dados mock (Content Collections na TASK-007)

## Estratégia de dados mock

Enquanto o conteúdo real não existe (será provido em TASK-007), use
placeholders que respeitem a identidade visual. NUNCA use "lorem ipsum"
genérico, "John Doe" ou "My Awesome Project".

### Placeholders por seção

| Seção | Placeholder |
|---|---|
| HeroSection.name | `CONCRETO, MENTE E TRÓPICOS` (nome real do portfolio) |
| HeroSection.descriptor | `engenharia de software` |
| ManifestoSection.paragraphs | 3 parágrafos seguindo `docs/design/14-copywriting.md`, Registro Técnico-Poético. Ex: "Engenharia é a consequência material da filosofia." |
| AboutSection.fields | Labels reais (`NOME`, `FORMAÇÃO`, `ÁREA`), valores placeholder (`[aguardando dados]`) |
| ContactSection.contacts | Labels reais, valores placeholder (`email@exemplo.com`) |
| ProjectsSection.projects | 3 projetos placeholder com nomes no padrão `PROJETO 01 · SISTEMA XYZ · 2024` |
| ProjectImage | Retângulo cinza com textura de concreto + crop marks + legenda placeholder `FIG. 01 — [aguardando imagem] — 2024 — [aguardando]` |

### Transição para TASK-007

Todos os placeholders serão substituídos por conteúdo real em TASK-007.
A estrutura de componentes não muda — apenas os dados de entrada.

## Fora do escopo
- Ilhas/interação com JS (TASK-006 — aqui componentes são estáticos)
- Pipeline de imagens (TASK-007)
- Conteúdo real (TASK-007)

## Entregáveis
- [x] `src/components/layout/PortfolioLayout.astro`
- [x] `src/components/layout/EditorialLayout.astro`
- [x] `src/components/layout/TechnicalLayout.astro`
- [x] `src/components/layout/MonumentalLayout.astro`
- [x] `src/components/sections/HeroSection.astro`
- [x] `src/components/sections/ManifestoSection.astro`
- [x] `src/components/sections/AboutSection.astro`
- [x] `src/components/sections/ProjectsSection.astro`
- [x] `src/components/sections/ContactSection.astro`
- [x] `src/components/sections/ResidualSpace.astro`
- [x] `src/components/sections/Footer` (renderizado inline no PortfolioLayout)
- [x] `src/pages/index.astro`

## Checklist de implementação
- [x] 1. Verificar dados e usar placeholders
- [x] 2. Implementar `PortfolioLayout`
- [x] 3. Implementar `EditorialLayout`
- [x] 4. Implementar `TechnicalLayout`
- [x] 5. Implementar `MonumentalLayout`
- [x] 6. Implementar `HeroSection`
- [x] 7. Implementar `ResidualSpace`
- [x] 8. Implementar `ManifestoSection`
- [x] 9. Implementar `AboutSection`
- [x] 10. Implementar `ProjectsSection`
- [x] 11. Implementar `ContactSection`
- [x] 12. Footer implementado inline no PortfolioLayout
- [x] 13. Implementar `index.astro`
- [x] 14. Verificar ordem narrativa

## Checklist de revisão
- [x] `npm run lint` passa
- [x] `npx astro check` passa
- [x] `npm run check:tokens` passa
- [x] `npm run build` completa
- [x] Página renderiza em 3 breakpoints (480px, 900px, 1200px)
- [x] Navegação é visível (nunca hambúrguer)
- [x] Hero ocupa 100dvh, nome alinhado à esquerda
- [x] ResidualSpace tem textura de concreto, sem conteúdo
- [x] Manifesto tem margens editoriais, texto em serif
- [x] About tem formato de ficha técnica
- [x] Projetos renderizam em grid (3 colunas wide, 2 medium, 1 compact)
- [x] Grid de projetos tem linhas visíveis entre células
- [x] Contato tem formato de coordenadas
- [x] Footer não é sticky
- [x] Nenhum emoji, nenhum gradiente, nenhum border-radius > 0
