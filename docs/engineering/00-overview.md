# 00 · VISÃO GERAL

---

## Propósito

`docs/engineering/` é o projeto executivo de `CONCRETO, MENTE E TRÓPICOS`.

Ele traduz cada princípio da documentação de design em decisões técnicas
concretas — design tokens, contratos de componente, arquitetura de estilos,
especificações de movimento, pipeline de assets, requisitos de acessibilidade
e regras de enforcement.

Esta documentação não implementa nada. Ela especifica o que deve ser
implementado, com que restrições, usando quais valores e seguindo quais
contratos.

---

## Relação com a documentação de design

```
docs/design/        docs/engineering/        src/
   (o que, por que)     (como, com o que)        (implementação)
        │                      │                      │
        │          ┌───────────┘                      │
        │          │                                  │
        ▼          ▼                                  ▼
   Identidade     Especificação                 Código
   conceitual     técnica                       Astro + TS
```

A documentação de design (`docs/design/`) define a identidade visual, a
atmosfera, os princípios e a narrativa. Ela é normativa — não pode ser
modificada pela engenharia.

A documentação de engenharia (`docs/engineering/`) traduz esses princípios
em especificações verificáveis. Cada decisão técnica referencia explicitamente
o documento de design que a originou.

O código (`src/`) implementa as especificações. Nenhuma decisão de design
é tomada no código — ela já foi tomada nos documentos acima.

---

## Convenções

### Referências

Todo documento de engenharia lista suas origens de design no cabeçalho:

```
> Origem: `docs/design/05-chromatic-atmosphere.md`
> Origem: `docs/design/07-temporal-behavior.md`
```

### Linguagem prescritiva

Esta documentação usa o imperativo. `deve`, `nunca`, `sempre`, `é proibido`.
Não há espaço para interpretação — o objetivo é eliminar ambiguidade.

### Valores

Todo valor concreto (hex, rem, ms, nome de fonte) é acompanhado de justificativa.
A justificativa referencia o princípio de design que o valor preserva.

### Componentes

Componentes são descritos por seu contrato (interface TypeScript), não por
sua implementação. A implementação pertence ao código.

### Glossário

| Termo de design | Significado na engenharia |
|---|---|
| Espaço Monumental | Seção Hero. Ocupa 100dvh. |
| Espaço Editorial | Seções Manifesto e About. Fundo papel. |
| Espaço Técnico | Seção Projetos. Grid de 3 colunas. |
| Espaço Arquivístico | Seções Contato e Footer. |
| Espaço Residual | `<ResidualSpace />` entre seções. |
| Registro Técnico-Poético | Voz do Manifesto e Hero. |
| Registro Arquivístico | Voz de metadados, legendas, contato. |
| Registro Funcional | Voz de navegação, labels. |
| Grotesk | Classe tipográfica industrial. Fonte: Space Grotesk. |
| Serif | Classe tipográfica editorial. Fonte: Source Serif 4. |
| Monospace | Classe tipográfica técnica. Fonte: IBM Plex Mono. |
| Duotone Blueprint | Tratamento de imagem: azul cobalto + preto tinta. |
| Duotone Calor | Tratamento de imagem: laranja ferrugem + cinza concreto. |
| Marca técnica | Símbolo iconográfico derivado de engenharia/arquitetura. |

---

## Ordem de leitura recomendada

1. `00-overview.md` — este documento.
2. `12-architecture-decisions.md` — decisões que afetam todo o projeto.
3. `01-design-tokens.md` — a linguagem comum entre design e código.
4. `02-component-architecture.md` — camadas, regras de dependência.
5. `03-component-contracts.md` — interfaces de cada componente.
6. `04-css-architecture.md` — organização de estilos e regras banidas.
7. `05-motion-system.md` — implementação das 5 metáforas de movimento.
8. `06-responsive-strategy.md` — breakpoints e adaptação.
9. `07-asset-pipeline.md` — imagens, texturas, fontes, ícones.
10. `08-shader-architecture.md` — arquitetura futura de WebGL.
11. `09-accessibility-implementation.md` — ARIA, foco, contraste.
12. `10-integration-contracts.md` — fluxo de dados, páginas, coleções.
13. `11-enforcement.md` — linting, verificação de build, checklist QA.
