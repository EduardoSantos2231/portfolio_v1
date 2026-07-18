# ADR-002 · TypeScript strict

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

O projeto define contratos de componente com interfaces TypeScript
(`docs/engineering/03-component-contracts.md`). Schemas de dados
(projetos, manifesto, about) precisam de validação. O design é
prescritivo — ~80 regras "nunca" e "sempre" que não podem ser
violadas acidentalmente.

Precisamos de type-safety que:
- Garanta que componentes recebem as props corretas.
- Valide dados externos (markdown frontmatter) em build time.
- Detecte imports circulares ou quebra de camadas de dependência.
- Rode em CI e bloqueie o build se houver erros.

---

## Decisão

**TypeScript com `strict: true`** em todo o projeto. Nenhum arquivo
`.js` ou `.jsx` — apenas `.ts` e `.astro`.

Schemas de dados definidos com **Zod** e integrados às Astro Content
Collections.

Verificação de tipos como etapa obrigatória do build: `astro check`.

---

## Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **JavaScript puro** | Sem type-safety para contratos de componente. Props erradas só seriam detectadas em runtime (visualmente). |
| **JSDoc + TypeScript checking** | Verboso. Duplica informação (JSDoc + código). Menos enforcement que `strict: true`. |
| **PropTypes (React-style)** | Runtime apenas. Não detecta erros em build. Não se aplica a Astro. |
| **Yup / Joi em vez de Zod** | Zod tem inferência de tipos automática (`z.infer`) — elimina dupla declaração (schema + tipo). Melhor integração com Content Collections. |

---

## Consequências

**Positivas:**
- Erro de compilação se um componente receber props com tipo errado.
- Schemas Zod validam frontmatter em build — um projeto com campo
  `date` ausente quebra o build.
- Tipos inferidos automaticamente: `const projects = await getCollection('projects')`
  retorna `CollectionEntry<'projects'>[]` tipado.
- `astro check` no CI bloqueia merge se houver erro de tipo.

**Negativas:**
- Curva de aprendizado para contributors sem experiência em TypeScript.
- Overhead de declaração de tipos para componentes pequenos.
  Mitigação: tipos simples (primitivas têm interfaces de 5–8 linhas).

**Ações:**
- `tsconfig.json` com `strict: true`, `noUncheckedIndexedAccess: true`.
- Todo componente exporta sua interface de props.
- `src/content/config.ts` define schemas Zod para todas as coleções.
- `astro check` adicionado ao script `lint` e ao CI.

---

## Referências

- `docs/engineering/03-component-contracts.md` — interfaces de cada componente.
- `docs/engineering/10-integration-contracts.md` — schemas de Content Collections.
- ADR-001 (Astro), ADR-005 (Content Collections).
