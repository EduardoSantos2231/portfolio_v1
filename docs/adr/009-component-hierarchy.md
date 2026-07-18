# ADR-009 · Arquitetura de componentes por composição

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

A arquitetura de componentes precisa refletir os princípios de design:
exposição estrutural (Princípio 1), redução (Princípio 6), disciplina
como clareza (Princípio 7). Componentes não podem herdar comportamento
de outros componentes — o acoplamento por herança esconde estrutura.

Precisamos de uma organização que:
- Elimine dependências circulares.
- Permita testar componentes isoladamente.
- Impedir que componentes de alto nível conheçam detalhes de baixo nível.
- Reflita a metáfora arquitetônica do projeto (vigas, pilares, lajes).

---

## Decisão

**Cinco camadas com regras de dependência estritas. Composição sobre
herança em todas as camadas.**

```
CAMADA E · PÁGINAS     → Orquestram layouts + seções
CAMADA D · LAYOUTS     → Definem grid, margens, espaçamento
CAMADA C · SEÇÕES      → Compõem primitivas + compostos
CAMADA B · COMPOSTOS   → Compõem primitivas em padrões
CAMADA A · PRIMITIVAS  → Elementos atômicos puros
```

**Regras de dependência:**

```
Páginas → Layouts → Seções → Compostos → Primitivas
   │         │         │          │            │
   │         │         │          │            └── importam: nada
   │         │         │          └── importam: apenas primitivas
   │         │         └── importam: primitivas + compostos
   │         └── importam: apenas seções (via slots)
   └── importam: layouts + seções

Nenhuma seta aponta para cima. Nenhuma seta salta camadas.
```

**Composição via slots:** Layouts não conhecem seções — recebem
conteúdo via slots nomeados. Seções não conhecem layouts — são
injetadas em slots.

---

## Justificativa

**Brutalismo:** Cada camada é uma viga que suporta a camada acima,
sem conhecer seus detalhes internos. As dependências são expostas
(visíveis nos imports), não escondidas em herança ou contextos
implícitos.

**Estoicismo:** A disciplina das dependências gera clareza. Um
novo desenvolvedor sabe exatamente o que cada arquivo pode importar
baseado apenas no diretório em que está.

**Engenharia:** Contratos explícitos (interfaces TypeScript) entre
camadas. Nenhum vazamento de implementação. Props tipadas, nunca
objetos de configuração opacos.

---

## Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **Herança de classes (extends)** | Viola composição sobre herança. Acopla componentes por implementação, não por contrato. JavaScript/TypeScript não favorece herança clássica. |
| **Componentes aninhados livremente (sem restrição de camadas)** | Gera dependências circulares. Dificulta tree-shaking. Torna impossível prever o impacto de mudar uma primitiva. |
| **Atomic Design (átomos, moléculas, organismos)** | Semelhante em espírito, mas não captura a especificidade do projeto. Atomic Design não distingue Layouts de Seções — aqui são camadas separadas porque têm responsabilidades fundamentalmente diferentes (estrutura vs. conteúdo). |
| **Single File Components sem diretórios (tudo junto)** | 15 componentes em um diretório plano sem organização. Difícil navegação, sem indicação visual de hierarquia. |

---

## Consequências

**Positivas:**
- Primitivas são funções puras — fáceis de testar, impossíveis
  de acoplar a outras primitivas.
- Compostos não conhecem layout — reutilizáveis em qualquer contexto.
- Seções não conhecem outras seções — independentes, paralelizáveis
  no desenvolvimento.
- Layouts são pura estrutura — sem lógica de negócio.
- Páginas são finas — apenas orquestração de layout + dados.
- Ferramentas de verificação podem validar a direção dos imports
  (script `check-components.ts`).

**Negativas:**
- 5 camadas parecem excessivas para 15 componentes.
  Mitigação: a maioria dos componentes são primitivas (7) e
  compostos (8). Seções são apenas 7, layouts são 4, página é 1.
  A estrutura de diretórios cresce, mas a complexidade é contida
  pelas regras de dependência.

**Ações:**
- Estrutura de diretórios mapeia as camadas:
  `src/components/primitives/`, `compounds/`, `sections/`, `layout/`.
- Script de verificação proíbe imports ascendentes ou saltos de camada.
- Cada componente exporta sua interface de props.

---

## Referências

- `docs/engineering/02-component-architecture.md` — catálogo completo e árvore de dependências.
- `docs/engineering/03-component-contracts.md` — interfaces TypeScript por componente.
- `docs/design/01-principles.md` — Princípios 1, 6 e 7.
- ADR-001 (Astro), ADR-002 (TypeScript).
