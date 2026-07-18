# 11 · ENFORCEMENT

> Origem: `docs/design/24-ai-directives.md`
> Origem: `docs/design/15-accessibility.md`
> Origem: `docs/design/01-principles.md`

---

## Objetivo

Garantir que as regras de design não dependam de disciplina humana.
Elas devem ser verificadas mecanicamente — no editor, no build, no CI.

---

## Stylelint

### Configuração (`.stylelintrc.json`)

```json
{
  "extends": ["stylelint-config-standard"],
  "rules": {
    "declaration-property-value-disallowed-list": {
      "border-radius": ["/^[1-9]/"],
      "box-shadow": ["/./"],
      "backdrop-filter": ["/blur/"],
      "transition-timing-function": ["/ease/", "/cubic-bezier/"],
      "font-family": ["/^(sans-serif|monospace)$/"]
    },
    "function-disallowed-list": [
      "linear-gradient",
      "radial-gradient",
      "conic-gradient",
      "repeating-linear-gradient",
      "repeating-radial-gradient"
    ],
    "color-no-hex": true,
    "declaration-no-important": [true, {
      "severity": "warning"
    }],
    "selector-max-id": 0,
    "max-nesting-depth": 2,
    "declaration-property-value-no-unknown": true,
    "keyframes-name-pattern": "^(disjuntor|trilho|datilografica|scanner|glitch|cursor)",
    "annotation-no-unknown": true
  }
}
```

### Regras explicadas

| Regra | Justificativa |
|---|---|
| `border-radius` com valor > 0 | Design: cantos vivos. Identidade brutalista. |
| `box-shadow` qualquer | Design: nada flutua. Anti-Material Design. |
| `backdrop-filter: blur` | Design: desfoque é fotográfico, não arquitetônico. |
| `transition-timing-function` com ease/Bézier | Design: movimento orgânico proibido. |
| `font-family: sans-serif` ou `monospace` sem fallback | Design: tipografia é identidade — sempre usar tokens. |
| `linear-gradient` / `radial-gradient` | Design: gradientes suaves = SaaS. |
| `color-no-hex` | Cores devem referenciar tokens: `var(--color-*)`. |
| `selector-max-id: 0` | Sem IDs para estilo. Usar classes ou atributos. |
| `max-nesting-depth: 2` | Simplicidade — coerente com Estoicismo. |
| `keyframes-name-pattern` | Apenas keyframes das 5 metáforas + cursor blink. |
| `!important` (warning) | Exceções devem ser justificadas com comentário. |

### Exceções permitidas

```css
/* stylelint-disable-next-line declaration-property-value-disallowed-list */
/* ponytail: repeating-linear-gradient usado para scanlines — textura estática, não gradiente decorativo */
background-image: repeating-linear-gradient(
  transparent 0px,
  rgba(0,0,0,0.03) 1px,
  transparent 2px
);
```

O comentário `/* ponytail: ... */` explica a exceção. O CI verifica que
todo `stylelint-disable` possui justificativa.

---

## ESLint (para JS/TS)

### Regras relevantes

```json
{
  "rules": {
    "no-restricted-properties": [
      "error",
      {
        "object": "Math",
        "property": "random",
        "message": "Glitch usa keyframes fixas, não Math.random() no runtime."
      }
    ],
    "no-restricted-imports": [
      "error",
      {
        "patterns": [
          {
            "group": ["framer-motion", "gsap", "animejs", "motion", "@react-spring/*"],
            "message": "Bibliotecas de animação proibidas. Usar o sistema de motion (05-motion-system.md)."
          },
          {
            "group": ["@radix-ui/*", "@headlessui/*", "shadcn*", "lucide-*", "@phosphor-icons/*"],
            "message": "Bibliotecas de componentes e ícones proibidas. Ver ADR-003 (12-architecture-decisions.md)."
          }
        ]
      }
    ]
  }
}
```

---

## Verificação de build

### Script: `check-contrast.ts`

```ts
// scripts/check-contrast.ts
// 1. Lê tokens.css
// 2. Extrai pares de cor texto/fundo (via mapa declarado no script)
// 3. Calcula contraste WCAG 2.1
// 4. Reporta pares que falham AA
// 5. Exit code 1 se houver falhas
```

### Script: `check-tokens.ts`

```ts
// scripts/check-tokens.ts
// 1. Lê tokens.css
// 2. Extrai todas as custom properties
// 3. Verifica que nenhum --foundation-* é usado fora de tokens.css
//    (grep nos arquivos de componente)
// 4. Verifica que todos os --color-* referenciam um --foundation-*
//    ou outro --color-*
// 5. Exit code 1 se houver violações
```

### Script: `check-images.ts`

```ts
// scripts/check-images.ts
// 1. Verifica que todas as imagens em public/images/ são duotone
//    (metadados embedados no pipeline de build)
// 2. Verifica que todas as imagens têm crop marks
// 3. Verifica que nenhuma imagem tem proporção 16:9
// 4. Exit code 1 se houver violações
```

---

## Verificação de runtime (dev apenas)

### Script: `check-components.ts`

Verificações que rodam no build do Astro:

```ts
// 1. Todo componente que usa <Image> tem prop treatment definida
// 2. Todo componente <SectionTitle> tem prefix definido
// 3. Nenhum componente importa tokens da camada Foundation
// 4. Nenhum componente importa outro componente de camada superior
//    (ex: primitiva importando composto)
```

---

## CI (GitHub Actions / equivalente)

```yaml
# .github/workflows/check.yml
name: Design Compliance

on: [push, pull_request]

jobs:
  design-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run check:contrast
      - run: npm run check:tokens
      - run: npm run check:images
      - run: npm run lint:css
      - run: npx astro check  # type-checking
```

---

## Checklist de QA visual

Para revisão manual humana ou por agente de IA após implementação.
Mapeamento direto de `24-ai-directives.md`:

| # | Pergunta | Verificação |
|---|---|---|
| 1 | Isso parece um template? | Procurar por padrões genéricos: hero section com CTA, cards com sombra, navegação centralizada, fotos de perfil redondas, gradientes. |
| 2 | Isso poderia existir em um dashboard SaaS? | Procurar por: barras laterais, badges, pills, data tables estilizados, KPI cards, widgets. |
| 3 | Existe estrutura suficiente? | Grid visível? Linhas de aço? Navegação exposta? |
| 4 | Existe tensão suficiente? | Assimetria? Espaço monumental comprimindo conteúdo? Contraste de escala? |
| 5 | Existe peso? | Tipografia com massa? Concreto como sensação? Nada flutuando? |
| 6 | Existe assimetria? | Nenhuma seção centralizada sem justificativa funcional? |
| 7 | Existe ritmo? | Densidade variável entre seções? Pausas (Residual) entre blocos densos? |
| 8 | Existe silêncio? | Espaço vazio com textura — não "em branco"? |
| 9 | Existe monumentalidade? | Hero em 100dvh? Nome massivo com tracking expandido? |
| 10 | Existe materialidade? | Textura de concreto perceptível? Papel onde há texto? Nada de superfícies lisas e plásticas? |
| 11 | Existe intenção? | Cada elemento tem razão de existir além de "ficar bonito"? |

### Checklist visual adicional

- [ ] Nenhuma borda arredondada em lugar nenhum.
- [ ] Nenhuma sombra projetada em lugar nenhum.
- [ ] Nenhum gradiente em lugar nenhum.
- [ ] Nenhum fade-in ou fade-out.
- [ ] Nenhuma animação suave (ease, Bézier).
- [ ] Nenhum emoji.
- [ ] Nenhum ícone de biblioteca externa.
- [ ] Nenhuma fonte de sistema.
- [ ] Imagens sempre em duotone (Blueprint ou Calor).
- [ ] Imagens sempre com crop marks.
- [ ] Tipografia: monospace para metadados, serif para texto, grotesk para headlines.
- [ ] Azul cobalto nunca usado como link.
- [ ] Verde ácido apenas em detalhes pontuais.
- [ ] Modo noturno funcional e distinto (não inversão simples).
- [ ] Textura de concreto no Hero e ResidualSpace.
- [ ] Textura de papel no Manifesto e About.

---

## Automação de screenshot (futuro)

Para detectar regressões visuais:

```yaml
# Ferramenta: Percy, Chromatic, ou script customizado com Playwright
# Captura screenshots de cada seção em 3 breakpoints × 2 temas
# Compara com baseline aprovada
# Reporta diffs visuais
```

**Não implementar na fase atual** — documentado como aspiração.
