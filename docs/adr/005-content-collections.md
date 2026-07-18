# ADR-005 · Content Collections + Zod

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

Os dados do portfólio — projetos, texto do manifesto e informações
do About — precisam ser editáveis sem tocar código. O conteúdo deve
ser versionado (git), validado (schema enforcement) e tipado
(type-safe no código).

Opções consideradas:
- CMS headless (Contentful, Strapi, Sanity).
- Arquivos JSON estáticos.
- Markdown com frontmatter.
- API externa.

O portfólio é mantido por um engenheiro de software. A edição de
conteúdo deve ser tão simples quanto editar texto em um editor de
código, sem dependência de serviços externos ou interfaces de admin.

---

## Decisão

**Astro Content Collections** com schemas **Zod** para todos os
dados estruturados.

- `src/content/projects/` — cada projeto é um arquivo `.md` ou `.mdx`
  com frontmatter validado por schema Zod.
- `src/content/manifesto.md` — texto do manifesto em markdown puro.
- `src/data/about.ts` — dados estruturados do About (não é markdown —
  são campos rotulados; um objeto TS é mais adequado que frontmatter).

Ordenação dos projetos via campo `order: number` (cronologia inversa
ou prioridade definida pelo autor).

---

## Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **CMS headless** | Overkill para página única com <20 projetos. Introduz dependência de serviço externo, latência de API, custo de hospedagem, interface de admin desnecessária. |
| **JSON estático** | Sem validação de schema. Erro de digitação em campo `date` só seria detectado visualmente. Sem tipagem automática. |
| **API externa (GraphQL/REST)** | Runtime overhead. Latência. Dependência de serviço. O conteúdo é estático — não justifica busca em runtime. |
| **TypeScript puro com constantes** | Conteúdo (texto do manifesto) misturado com código. Editar um parágrafo exigiria navegar código TypeScript. |
| **Zod sem Content Collections** | Content Collections oferecem integração nativa com Astro: tipagem automática via `getCollection()`, hot reload em dev, schemas Zod como first-class citizen. |

---

## Consequências

**Positivas:**
- Adicionar um projeto = criar um arquivo `.md` na pasta `content/projects/`.
- Erro de schema (campo obrigatório ausente, tipo errado) quebra o
  build — impossível publicar com dados inválidos.
- Tipos inferidos automaticamente: `getCollection('projects')` retorna
  dados tipados com base no schema Zod.
- Conteúdo versionado em git — histórico de alterações, revert, diff.

**Negativas:**
- Sem interface gráfica para edição — editar arquivos `.md` requer
  conhecimento mínimo de markdown e frontmatter.
  Mitigação: o autor é um engenheiro de software — editar markdown
  é natural.
- Frontmatter duplicado entre projetos (campos como `category` se
  repetem). Aceitável para <20 projetos.

**Ações:**
- `src/content/config.ts` define `projectSchema` com Zod.
- Cada projeto em `src/content/projects/NNN-slug.md`.
- `astro build` falha se validação de schema falhar.
- `astro dev` mostra erros de schema em tempo real.

---

## Referências

- `docs/engineering/10-integration-contracts.md` — schemas e estrutura de dados.
- `docs/engineering/03-component-contracts.md` — interface `ProjectData`.
- ADR-001 (Astro), ADR-002 (TypeScript), ADR-006 (MDX).
