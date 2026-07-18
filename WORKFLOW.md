# WORKFLOW.md

---

## Ciclo de vida de uma funcionalidade

```
IDEIA → VALIDAÇÃO → CLASSIFICAÇÃO → DOCUMENTAÇÃO → IMPLEMENTAÇÃO → REVISÃO → PR → MERGE
```

Cada etapa é obrigatória. Nenhuma é pulada.

---

## Passo 1 · Ideia

Toda mudança começa com uma ideia. Classifique-a:

| Tipo | Exemplo |
|---|---|
| **Nova feature** | "Quero adicionar uma seção de Essays" |
| **Melhoria** | "O grid de projetos deveria ter filtro por tecnologia" |
| **Bug** | "O glitch não está funcionando no Firefox" |
| **Refactor** | "Extrair lógica de scroll spy para um hook reutilizável" |
| **Documentação** | "A ADR de fontes não cobre fallback para caracteres especiais" |

---

## Passo 2 · Validação

Antes de qualquer outra ação, verifique se a ideia já está coberta
pela documentação existente.

```bash
# Procure por palavras-chave nos docs
grep -r "filtro" docs/
grep -r "scroll" docs/engineering/
grep -r "fonte" docs/adr/
```

Se a resposta já existe na documentação:

- **Feature/refactor:** implemente seguindo a especificação existente.
  Crie uma Task.
- **Bug:** verifique se o código viola a especificação. Se sim,
  corrija o código. Se não, a especificação pode estar errada —
  proponha ADR.

Se a resposta NÃO existe:

- Continue para o passo 3.

---

## Passo 3 · Classificação

Use esta árvore de decisão:

```
A mudança afeta múltiplos componentes ou camadas?
  ├── Sim → Afeta contratos, dependências ou restrições?
  │         ├── Sim → Crie uma ADR
  │         └── Não → Crie uma Task
  └── Não → É uma implementação de algo já especificado?
            ├── Sim → Crie uma Task
            └── Não → Provavelmente é decisão de design. Pare.
                       Design é normativo. Não se implementa
                       design por conta própria.
```

### Exemplos

| Situação | Ação |
|---|---|
| "Vou implementar o componente HeroSection" | Task — já especificado em `docs/engineering/03-component-contracts.md` |
| "Vou usar GSAP para animações" | ADR necessária — nova dependência, altera arquitetura de motion |
| "Vou mudar a cor do azul cobalto" | Pare — design é normativo. Discuta antes de alterar. |
| "Vou adicionar uma seção de Blog" | ADR — nova seção, afeta narrativa, pode exigir nova rota |
| "Vou corrigir o glitch que não funciona no Firefox" | Task — bug, implementação não segue especificação |

---

## Passo 4 · Documentação

### Se for ADR

1. Crie arquivo `docs/adr/NNN-slug.md` usando o próximo número disponível.
2. Siga o template `docs/adr/000-template.md`.
3. Preencha: Contexto, Decisão, Alternativas rejeitadas, Consequências.
4. Referencie os documentos de design e engineering relevantes.
5. Submeta para revisão (PR com apenas a ADR).
6. Após aprovação, crie a(s) Task(s) de implementação.

### Se for Task

1. Crie arquivo `tasks/NNN-slug.md` usando o próximo número disponível.
2. Siga o template definido em `AGENTS.md` (seção "Template de Task").
3. Preencha todos os campos, especialmente **Reading Order**.
4. A Reading Order deve listar, em ordem, os documentos que precisam
   ser lidos antes da implementação. Use paths relativos à raiz:
   ```
   docs/design/05-chromatic-atmosphere.md
   docs/engineering/01-design-tokens.md
   docs/adr/003-css-modules.md
   ```
5. Não duplique conteúdo dos docs — referencie.

---

## Passo 5 · Implementação

### Ordem de construção (primeira vez)

```
Tokens → Primitivas → Compostos → Seções → Layouts → Página
```

### Ordem de construção (feature nova)

```
Dados → Contratos → Primitivas (se novas) → Compostos (se novos) → Seção → Layout (se novo) → Página
```

### Regras durante a implementação

1. **Siga a Reading Order.** Leia cada documento listado antes de
   escrever código.
2. **Use tokens, nunca valores literais.** `var(--color-text-primary)`,
   nunca `#1A1817`.
3. **Respeite os contratos.** Toda prop documentada em
   `docs/engineering/03-component-contracts.md` deve ser implementada.
4. **Respeite as camadas.** Uma primitiva não importa outra primitiva.
   Um composto não importa outro composto. Ver
   `docs/engineering/02-component-architecture.md`.
5. **Commits atômicos.** Um commit por mudança coesa. Siga
   Conventional Commits (ver seção abaixo).
6. **Nunca introduza dependências não aprovadas.** Ver `docs/adr/`
   para a lista de dependências permitidas.

---

## Passo 6 · Auto-revisão

Antes de abrir um PR, execute:

```bash
npm run lint            # Stylelint + ESLint
npm run check:contrast  # Verifica pares de cor (se alterou cores)
npm run check:tokens    # Verifica uso correto de tokens
npx astro check         # TypeScript type-checking
npm run build           # Build de produção
```

Depois, aplique os checklists de `AGENTS.md`:

- Checklist de 11 perguntas (design)
- Checklist visual de 14 itens
- Checklist de acessibilidade
- Checklist de rastreabilidade

Se qualquer verificação falhar, corrija antes de abrir o PR.

---

## Passo 7 · Pull Request

### Template de PR

```markdown
## O que foi feito

[Resumo em 1–3 frases]

## Task relacionada

TASK-NNN

## ADR relacionada (se aplicável)

ADR-NNN

---

## Checklist

### Design
- [ ] Nenhum `border-radius > 0`
- [ ] Nenhum `box-shadow`
- [ ] Nenhum gradiente (`linear-gradient`, `radial-gradient`)
- [ ] Nenhuma animação com `ease` / `cubic-bezier`
- [ ] Nenhum emoji
- [ ] Cores via `var(--color-*)`, nunca hex literal
- [ ] Fontes via `var(--type-voice-*)`, nunca sistema

### Arquitetura
- [ ] Imports respeitam direção das camadas
- [ ] Primitivas não importam outras primitivas
- [ ] Compostos não importam outros compostos
- [ ] Nenhuma dependência nova sem ADR aprovada

### Acessibilidade
- [ ] HTML semântico (landmarks, headings)
- [ ] Foco visível em todos os elementos interativos
- [ ] Navegação por teclado funciona
- [ ] Imagens com `alt` descritivo
- [ ] `prefers-reduced-motion` remove animações

### Performance
- [ ] Zero JavaScript em componentes estáticos
- [ ] Imagens em formatos modernos (AVIF/WebP)
- [ ] Fontes com `font-display: swap`

### Rastreabilidade
- [ ] Task vinculada no PR
- [ ] ADR referenciada (se aplicável)
- [ ] Nenhuma decisão de design tomada no código
```

### Regras de PR

- **Squash merge.** Todos os commits do PR são compactados em um.
- **Mensagem de merge** no formato Conventional Commits.
- **Branch deletada** após merge.
- **PRs pequenos.** Ideal: <400 linhas. Máximo: <800 linhas.
  Se for maior, quebre em Tasks menores.
- **Um PR = uma Task.** Não misture implementações não relacionadas.

---

## Passo 8 · Merge

Após aprovação:

1. Squash merge com mensagem no padrão Conventional Commits.
2. Branch é deletada.
3. Task é marcada como concluída.

---

## Convenção de Commits

Baseada em [Conventional Commits](https://www.conventionalcommits.org/).

### Formato

```
<tipo>(<escopo>): <descrição>
```

### Tipos

| Tipo | Uso | Exemplo |
|---|---|---|
| `feat` | Nova funcionalidade (componente, seção, comportamento) | `feat(hero): implement monumental hero section` |
| `fix` | Correção de bug | `fix(glitch): correct keyframe timing on firefox` |
| `refactor` | Alteração de estrutura sem mudar comportamento | `refactor(layout): simplify grid composition` |
| `style` | Ajustes visuais que não alteram lógica | `style(tokens): adjust spacing scale for mobile` |
| `perf` | Melhoria de performance | `perf(images): optimize blueprint asset compression` |
| `docs` | Documentação. Escopo = camada. | `docs(design): update composition principles` |
| `chore` | Configuração, scripts, tooling, CI | `chore(tooling): configure astro integrations` |
| `test` | Testes | `test(primitives): add unit tests for Text component` |

### Escopos comuns

| Escopo | Uso |
|---|---|
| `hero`, `manifesto`, `about`, `projects`, `contact`, `footer`, `nav` | Componentes/seções |
| `primitives`, `compounds`, `sections`, `layout` | Camadas de componente |
| `tokens`, `motion`, `noise`, `images`, `fonts` | Sistemas transversais |
| `design`, `engineering`, `adr` | Camadas de documentação |
| `tooling`, `ci` | Infraestrutura |

---

## Backlog futuro

Funcionalidades planejadas para após o MVP. Estas funcionalidades
**não possuem Tasks ainda** — apenas estão previstas no processo.

Quando uma delas for iniciada, siga o fluxo normal:
Ideia → Validação → Classificação → ADR (se necessário) → Task.

### Funcionalidades previstas

| Funcionalidade | Escopo | Complexidade |
|---|---|---|
| **WebGL Shaders** | Nível 3 de textura: `concrete-light`, `scanner-overlay`, `paper-fiber` | Alta |
| **Página individual de projeto** | Ao expandir um projeto, rota dedicada com detalhes completos | Média |
| **Blog / Essays** | Seção de textos longos, estilo publicação | Alta |
| **Laboratório / Playground** | Área interativa para experimentos visuais com a identidade | Média |
| **Modo de alto contraste** | Tema adicional além de diurno/noturno | Baixa |
| **Testes de regressão visual** | Percy/Chromatic ou script Playwright | Média |
| **Internacionalização (i18n)** | Conteúdo em inglês além do português | Alta |

---

## Orientações para contribuidores humanos

Se você é um humano (não um agente de IA) contribuindo para este
projeto, as mesmas regras se aplicam. Adicionalmente:

- **Leia `AGENTS.md` primeiro.** Ele define as regras do projeto.
- **Leia `docs/design/00-manifesto.md`.** Entenda a identidade
  antes de implementar qualquer coisa.
- **Não pule a Reading Order.** Ela existe para que você não
  precise conhecer o projeto inteiro — apenas o necessário
  para sua Task.
- **Dúvida? Abra uma issue.** Não implemente na dúvida.
- **PRs pequenos.** Facilita a revisão e reduz o risco de
  conflitos.
- **Seja conservador com dependências.** Cada nova dependência
  exige uma ADR aprovada. Sim, mesmo `lodash`. Sim, mesmo
  `date-fns`. A plataforma (Astro + TypeScript + CSS) já
  resolve a maioria dos problemas.
