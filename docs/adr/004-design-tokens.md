# ADR-004 · Hierarquia de Design Tokens

**Data:** 2026-07-12  
**Status:** Aceito

---

## Contexto

A documentação de design define cores, tipografia, espaçamento e
movimento como conceitos e atmosferas — não como valores hexadecimais
ou pixels. A engenharia precisa traduzir esses conceitos em valores
concretos e reutilizáveis.

O design estabelece dois modos de luz (diurno/noturno) com paletas
distintas — os tokens precisam suportar essa alternância sem duplicação.
Também existem estados condicionais (reduced motion, high contrast,
reduced data) que afetam os valores dos tokens.

Tokens não devem ser acoplados a componentes — se dois componentes
precisam do mesmo valor, ele deve vir de uma camada compartilhada.

---

## Decisão

**Hierarquia de design tokens em 4 camadas:**

```
CAMADA 3 · STATE    ── Sobrescritas condicionais (motion, contraste, textura)
CAMADA 2 · MODE     ── Sobrescritas por esquema de cor (diurno / noturno)
CAMADA 1 · SEMANTIC ── Tokens com significado funcional (consumidos por componentes)
CAMADA 0 · FOUNDATION ── Valores atômicos brutos (fonte da verdade)
```

**Regras de governança:**

1. Componentes consomem exclusivamente tokens da camada SEMANTIC.
2. Tokens MODE sobrescrevem SEMANTIC. Nunca Foundation.
3. Tokens STATE sobrescrevem qualquer camada (última na cascata).
4. Foundation muda em um lugar. Toda a cascata se atualiza.
5. Não existem tokens de componente (`--hero-title-size`). Se dois
   componentes precisam do mesmo valor, ele pertence à SEMANTIC.

---

## Justificativa

**Separação Foundation/Semantic:** Permite ajustar valores brutos sem
alterar o contrato com componentes. Ex: mudar o hex do azul cobalto
de `#2A5C8A` para `#2E6396` não quebra nenhum componente — todos
referenciam `--color-text-secondary`, que aponta para o token Foundation.

**Separação Mode/Semantic:** Um modo de cor adicional (ex: high contrast)
é adicionado criando uma nova camada Mode, sem alterar os tokens Semantic
que os componentes consomem.

**Proibição de tokens de componente:** Evita duplicação. Se `HeroSection`
e `ManifestoSection` usam o mesmo tamanho de headline, ambas referenciam
`--type-size-headline`. Sem essa regra, cada uma criaria seu próprio
token, e alterar o tamanho de headline exigiria mudar N tokens.

---

## Alternativas rejeitadas

| Alternativa | Razão da rejeição |
|---|---|
| **Tokens planos (sem hierarquia)** | Modo diurno/noturno exigiria duplicar todos os tokens. Mudar um valor de concreto exigiria buscar e substituir em múltiplos lugares. Não escala. |
| **Tokens por componente (ex: `--hero-title-size`)** | Acoplamento. Duplicação. Viola o princípio de single source of truth. |
| **Tokens JavaScript (objeto TS exportado)** | Perde a capacidade de usar custom properties CSS (cascata, herança, media queries para Mode). Custom properties são a plataforma web — usar JS para tokens reintroduz runtime desnecessário. |
| **Design Token JSON (Style Dictionary / W3C DTCG)** | Especificação ainda em draft. Ferramentas imaturas para CSS custom properties. Overhead de build desnecessário para 10 cores + 3 fontes + 6 espaçamentos. |

---

## Consequências

**Positivas:**
- Mudar um hex de cor = mudar 1 linha em `tokens.css`.
- Adicionar um modo de cor = adicionar `[data-theme="high-contrast"]` com sobrescritas.
- Componentes são desacoplados dos valores brutos.
- Verificação automatizada: script `check-tokens.ts` garante que
  componentes nunca referenciam Foundation.

**Negativas:**
- 4 camadas introduzem indireção. Um desenvolvedor precisa entender
  a hierarquia para adicionar um token corretamente.
  Mitigação: documentado em `docs/engineering/01-design-tokens.md`
  com exemplos de uso para cada camada.

**Ações:**
- Implementar `src/styles/tokens.css` com as 4 camadas.
- Implementar `scripts/check-tokens.ts` para verificação.
- Adicionar `check:tokens` ao CI.

---

## Referências

- `docs/engineering/01-design-tokens.md` — especificação completa dos tokens.
- `docs/design/05-chromatic-atmosphere.md` — cores como materiais e atmosferas.
- `docs/design/06-typographic-character.md` — vozes tipográficas.
- `docs/design/07-temporal-behavior.md` — metáforas de movimento.
- ADR-003 (CSS Modules), ADR-012 (sistema tipográfico).
