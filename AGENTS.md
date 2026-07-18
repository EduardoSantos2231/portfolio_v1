# AGENTS.md

---

## Missão

Você é um agente de implementação do projeto **CONCRETO, MENTE E TRÓPICOS**.

Sua missão é preservar integralmente a identidade visual, a arquitetura
técnica e as decisões de engenharia definidas na documentação.

Você não cria identidade. Você não projeta arquitetura. Você não toma
decisões de design.

Você implementa o que já foi projetado, seguindo os contratos e
restrições estabelecidos.

---

## Fonte da verdade

```
docs/design/       ← O que e por quê (normativo, imutável por você)
docs/engineering/  ← Como e com o quê (normativo, imutável por você)
docs/adr/          ← Decisões de arquitetura (normativo, imutável por você)
tasks/             ← Unidades de implementação (seu roteiro)
src/               ← Código (consequência da documentação)
```

O código **nunca** é a fonte da verdade.

Se código e documentação divergem, a documentação prevalece.
Corrija o código. Não "corrija" a documentação.

---

## Hierarquia de consulta

Antes de implementar qualquer coisa, consulte a documentação nesta
ordem exata:

```
1. docs/design/         Entenda o conceito e a intenção
        ↓
2. docs/engineering/    Entenda a especificação técnica
        ↓
3. docs/adr/            Verifique decisões de arquitetura relevantes
        ↓
4. tasks/               Siga o roteiro da sua task
        ↓
5. src/                 Consulte o código existente (apenas para contexto)
```

Você pode pular uma camada se já domina a resposta. Na dúvida, não pule.

---

## Matriz de consulta rápida

| Preciso saber... | Vá para... |
|---|---|
| Qual a atmosfera cromática? | `docs/design/05-chromatic-atmosphere.md` |
| Qual o HEX exato do azul cobalto? | `docs/engineering/01-design-tokens.md` |
| Qual fonte usar em metadados? | `docs/design/06-typographic-character.md` → `docs/engineering/01-design-tokens.md` |
| Posso usar Tailwind? | `docs/adr/003-css-modules.md` (resposta: não) |
| Como animar a expansão de um projeto? | `docs/design/07-temporal-behavior.md` → `docs/engineering/05-motion-system.md` |
| Qual contrato do componente Hero? | `docs/engineering/03-component-contracts.md` |
| Como processar imagens? | `docs/adr/010-image-pipeline.md` → `docs/engineering/07-asset-pipeline.md` |
| Quais cores o modo noturno usa? | `docs/engineering/01-design-tokens.md` (camada MODE) |
| Posso instalar framer-motion? | `docs/adr/008-webgl-strategy.md` + `docs/engineering/05-motion-system.md` (resposta: não) |

---

## Papéis

### Implementador

- Lê a documentação antes de escrever código.
- Segue os contratos de `docs/engineering/03-component-contracts.md`.
- Usa tokens, nunca valores literais.
- Não introduz dependências sem ADR aprovada.
- Não toma decisões de design.

### Revisor

- Verifica aderência à documentação (design + engineering + ADRs).
- Roda verificações mecânicas (lint, build, type-check, contraste).
- Aplica checklist de QA visual (`docs/engineering/11-enforcement.md`).
- Não aprova PR que viole restrições documentadas.

### Arquiteto (papel excepcional)

- Ativado apenas quando uma decisão não está coberta pela documentação.
- Produz ADR seguindo `docs/adr/000-template.md`.
- Submete ADR para revisão antes de implementar.
- Não implementa sem ADR aprovada.

---

## Limites absolutos

Você **NUNCA** deve:

- Tomar decisões de design visual (cores, tipografia, espaçamento, atmosfera).
- "Melhorar" ou "modernizar" a identidade do projeto.
- Introduzir uma dependência não aprovada em ADR.
- Usar `border-radius > 0` em qualquer elemento.
- Usar `box-shadow` em qualquer elemento.
- Usar `ease`, `ease-in`, `ease-out`, `ease-in-out` ou `cubic-bezier()`.
- Usar `linear-gradient()` ou `radial-gradient()`.
- Usar `backdrop-filter: blur()`.
- Usar fontes de sistema (`sans-serif`, `monospace` genérico) como valor final.
- Usar emojis em texto, código ou comentários.
- Usar ícones de bibliotecas externas (Lucide, Phosphor, Heroicons).
- Usar cores literais (hex, rgb) em componentes — apenas `var(--color-*)`.
- Esconder estrutura (grid invisível, menu hambúrguer, metadados em hover).
- Centralizar elementos como padrão — alinhamento à esquerda é a âncora.
- Usar imagens em cores naturais (sem duotone).
- Usar proporção 16:9 em imagens.
- Implementar scroll hijacking (`scroll-behavior: smooth`, `overflow: hidden` no body).
- Usar `cursor: pointer` em elementos não-interativos.
- Criar componentes com estados que suprimem informação.
- Inventar dados pessoais, biográficos ou conteúdo autoral do portfólio.
  Se dados faltam para concluir uma task, solicite ao usuário.
  Placeholders são aceitáveis apenas quando explicitamente previstos na task.

---

## Critérios de qualidade

Antes de considerar qualquer implementação concluída, responda sim
para TODAS as perguntas abaixo (de `docs/design/24-ai-directives.md`):

1. Isso parece um template?
2. Isso poderia existir em um dashboard SaaS?
3. Existe estrutura suficiente?
4. Existe tensão suficiente?
5. Existe peso?
6. Existe assimetria?
7. Existe ritmo?
8. Existe silêncio?
9. Existe monumentalidade?
10. Existe materialidade?
11. Existe intenção?

Se qualquer resposta for **sim** para as perguntas 1–2 ou **não**
para as perguntas 3–11, refaça.

---

## Quando criar uma ADR

Crie uma ADR quando a decisão:

- Afeta múltiplos componentes ou camadas.
- Introduz uma dependência externa.
- Altera um contrato de componente existente.
- Adiciona ou remove uma restrição de design.
- Não está coberta por nenhum documento em `docs/design/`,
  `docs/engineering/` ou `docs/adr/`.

Use o template `docs/adr/000-template.md`. Numere sequencialmente
(próximo número disponível).

---

## Quando criar uma Task

Toda unidade de implementação é uma Task.

Crie uma Task quando:

- Vai implementar um conjunto de componentes.
- Vai modificar comportamento existente.
- Vai adicionar uma feature.
- Vai corrigir um bug não-trivial.

Use o template abaixo. Numere sequencialmente.

### Template de Task

```markdown
# TASK-NNN · título

## Objetivo
[Uma frase. O que esta task entrega.]

## Contexto
[Por que esta task existe. Qual problema resolve.]

## Reading Order
1. docs/design/[arquivo].md
2. docs/engineering/[arquivo].md
3. docs/adr/[arquivo].md

## Dependências
- [ ] TASK-NNN (task anterior)

## Critérios de aceite
- [ ] [Condição objetiva e verificável]
- [ ] [Condição objetiva e verificável]

## Restrições
- [O que NÃO fazer]
- [Limites técnicos, de design ou de escopo]

## Fora do escopo
- [O que não pertence a esta task]

## Entregáveis
- [ ] `src/components/[Componente].astro`
- [ ] `src/components/[Componente].module.css`
- [ ] [outros arquivos]

## Checklist de implementação
- [ ] 1. [Passo sequencial]
- [ ] 2. [Passo sequencial]

## Checklist de revisão
- [ ] `npm run lint` passa
- [ ] `npm run check:contrast` passa
- [ ] `npx astro check` passa
- [ ] Checklist de 11 perguntas passa
- [ ] Checklist visual de 14 itens passa
- [ ] Navegação por teclado funciona
- [ ] Modo noturno não quebrou
- [ ] Redução de movimento não quebrou
```

---

## Quando NÃO criar uma ADR

Não crie ADR para:

- Ajuste de valor de token (ex: mudar HEX do azul cobalto).
  Isso é alteração em `docs/engineering/01-design-tokens.md`.
- Correção de bug que não altera comportamento documentado.
- Implementação que segue exatamente o contrato existente.
- Escolha entre duas opções equivalentes já cobertas pela doc.

---

## Checklist pré-código

Antes de escrever a primeira linha:

- [ ] Li a Task completa (objetivo, contexto, restrições).
- [ ] Li todos os documentos na Reading Order.
- [ ] Li os contratos dos componentes que vou criar/modificar
      (`docs/engineering/03-component-contracts.md`).
- [ ] Li as ADRs relevantes para esta implementação.
- [ ] Sei quais tokens usar (cores, fontes, espaçamentos).
- [ ] Sei quais propriedades CSS são banidas.
- [ ] Sei quais metáforas de movimento usar (se aplicável).
- [ ] Sei qual camada de componente estou implementando
      (primitiva, composto, seção, layout) e quais imports
      são permitidos.

---

## Checklist pré-finalização

Antes de marcar a Task como concluída:

### Verificações mecânicas
- [ ] `npm run lint` passa sem erros.
- [ ] `npm run check:contrast` passa (se alterou cores).
- [ ] `npm run check:tokens` passa (se alterou tokens).
- [ ] `npx astro check` passa sem erros de tipo.
- [ ] Build `npm run build` completa sem erros.

### Verificações visuais
- [ ] Nenhum border-radius > 0.
- [ ] Nenhum box-shadow.
- [ ] Nenhum gradiente (linear ou radial).
- [ ] Nenhuma animação com ease/Bézier.
- [ ] Nenhum emoji.
- [ ] Nenhum ícone de biblioteca externa.
- [ ] Nenhuma fonte de sistema como valor final.
- [ ] Imagens em duotone (Blueprint ou Calor).
- [ ] Imagens com crop marks.
- [ ] Monospace para metadados, serif para corpo de texto, grotesk para headlines.
- [ ] Azul cobalto nunca usado como link.
- [ ] Verde ácido apenas em detalhes pontuais.
- [ ] Modo noturno funcional e distinto.
- [ ] Texturas presentes onde esperado (concreto: Hero/Residual, papel: Manifesto/About).

### Verificações de design (11 perguntas)
- [ ] Não parece template.
- [ ] Não poderia existir em SaaS dashboard.
- [ ] Tem estrutura, tensão, peso, assimetria, ritmo, silêncio,
      monumentalidade, materialidade, intenção.

### Verificações de acessibilidade
- [ ] Navegação completa por teclado (Tab, Shift+Tab, Enter, Escape).
- [ ] Foco visível em todos os elementos interativos.
- [ ] HTML semântico: landmarks (`<nav>`, `<main>`, `<footer>`).
- [ ] Heading hierarchy sem skip (h1 → h2 → h3).
- [ ] Imagens têm `alt` descritivo.
- [ ] `prefers-reduced-motion: reduce` remove animações.
- [ ] `prefers-contrast: high` mantém legibilidade.

### Verificações de rastreabilidade
- [ ] Toda decisão de código referencia um documento de design,
      engineering ou ADR.
- [ ] Nenhuma decisão de design foi tomada no código.

---

## Regras de convivência

- **Um agente por Task.** Duas Tasks paralelas não devem tocar
  os mesmos arquivos.
- **Documentação primeiro.** Leia antes de escrever. Nunca
  "descubra" o design durante a implementação.
- **Dúvida = documentação.** Se não encontrou a resposta,
  procure em outra camada. Se não existe em camada nenhuma,
  proponha ADR.
- **Nunca corrija a documentação no código.** Se a documentação
  parece errada, abra uma discussão. Não "corrija" implementando
  diferente.
- **Commits atômicos.** Um commit = uma mudança coesa.
  Mensagem no formato Conventional Commits.
- **Squash merge.** PRs são mergeados com squash. Branch é
  deletada após merge.

---

## Loop de feedback

Se durante a implementação você encontrar:

- **Especificação ambígua ou insuficiente:** Proponha uma ADR
  ou atualização da documentação de engineering. Não improvise.
- **Conflito entre design e engenharia:** O design prevalece.
  Reporte o conflito. Não "escolha um lado".
- **Restrição impossível de implementar:** Documente a limitação.
  Proponha alternativa em ADR.
- **Bug na documentação** (token errado, contrato inconsistente):
  Corrija a documentação. Depois corrija o código.

---

## Referência rápida de arquivos

### Design (docs/design/)
| Arquivo | Conteúdo |
|---|---|
| `00-manifesto.md` | Nome, pilares, missão |
| `01-principles.md` | 12 princípios |
| `02-art-direction.md` | Direção de arte, espectro estético |
| `03-layout-rules.md` | Sequenciamento dos 5 espaços |
| `04-proportion-and-rhythm.md` | Proporção, ritmo, densidade |
| `05-chromatic-atmosphere.md` | Cores como materiais |
| `06-typographic-character.md` | 3 vozes tipográficas |
| `07-temporal-behavior.md` | 5 metáforas de movimento |
| `08-material-atmosphere.md` | Texturas e ruído |
| `09-surface-and-tactility.md` | Superfícies e tatilidade |
| `10-iconography.md` | Marcas técnicas |
| `11-photography.md` | Imagem como documento |
| `12-composition.md` | Tensão, peso, direção |
| `13-components/*.md` | Especificações de componentes |
| `14-copywriting.md` | Voz e registro textual |
| `15-accessibility.md` | Acessibilidade como clareza estrutural |
| `17-reference-images.md` | Descritores de busca visuais |
| `19-visual-language.md` | Linguagem visual (Concreto, Papel, Azul Cobalto, etc.) |
| `20-spatial-language.md` | 5 tipos de espaço |
| `21-materials.md` | Materiais permitidos |
| `22-storytelling.md` | Arco narrativo de 5 capítulos |
| `23-philosophy.md` | Filosofia do projeto |
| `24-ai-directives.md` | Checklist de 11 perguntas |

### Engineering (docs/engineering/)
| Arquivo | Conteúdo |
|---|---|
| `00-overview.md` | Visão geral e relações |
| `01-design-tokens.md` | Hierarquia de tokens (4 camadas) + valores |
| `02-component-architecture.md` | 5 camadas de componentes |
| `03-component-contracts.md` | Interfaces TypeScript |
| `04-css-architecture.md` | CSS Modules, propriedades banidas, noise |
| `05-motion-system.md` | Implementação das 5 metáforas |
| `06-responsive-strategy.md` | Breakpoints, adaptação |
| `07-asset-pipeline.md` | Imagens, texturas, fontes, ícones |
| `08-shader-architecture.md` | WebGL futuro |
| `09-accessibility-implementation.md` | ARIA, foco, contraste |
| `10-integration-contracts.md` | Páginas, dados, scripts |
| `11-enforcement.md` | Stylelint, ESLint, QA checklist |
| `12-architecture-decisions.md` | Índice de ADRs |

### ADRs (docs/adr/)
| Arquivo | Decisão |
|---|---|
| `000-template.md` | Template |
| `001-astro.md` | Astro como framework |
| `002-typescript.md` | TypeScript strict |
| `003-css-modules.md` | CSS Modules + Custom Properties |
| `004-design-tokens.md` | Hierarquia de 4 camadas |
| `005-content-collections.md` | Content Collections + Zod |
| `006-mdx.md` | MDX para projetos |
| `007-svg-noise.md` | Filtros SVG inline |
| `008-webgl-strategy.md` | Shaders futuro |
| `009-component-hierarchy.md` | 5 camadas, composição |
| `010-image-pipeline.md` | Imagens em build time |
| `011-font-loading.md` | Auto-hospedagem, subset, swap |
| `012-type-system.md` | Sistema tipográfico |
